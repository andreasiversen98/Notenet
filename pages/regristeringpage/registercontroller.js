function setRegisterUsername(value) {
  model.viewState.registerPage.username = value;
}

function setRegisterPassword(value) {
  model.viewState.registerPage.password = value;
}

function setRegisterConfirmPassword(value) {
  model.viewState.registerPage.confirmPassword = value;
}

function registerUser() {
  const vs = model.viewState.registerPage;

  vs.usernameError = vs.username === "" ? "Skriv inn brukernavn" : "";
  vs.passwordError = vs.password === "" ? "Skriv inn passord" : "";
  vs.confirmPasswordError = vs.confirmPassword === "" ? "Gjenta passordet" : "";

  if (!vs.usernameError && findUserByUsername(vs.username) !== undefined) {
    vs.usernameError = "Brukernavnet er opptatt";
  }

  if (!vs.passwordError && !vs.confirmPasswordError && vs.password !== vs.confirmPassword) {
    vs.confirmPasswordError = "Passordene er ikke like";
  }

  if (vs.usernameError || vs.passwordError || vs.confirmPasswordError) {
    setView();
    if (vs.usernameError) document.getElementById("register-username").focus();
    else if (vs.passwordError) document.getElementById("register-password").focus();
    else document.getElementById("register-confirm-password").focus();
    return;
  }

  const newUser = {
    id: "u" + (model.data.users.length + 1),
    username: vs.username,
    password: vs.password,
    profilePicture: "../../assets/images/profile-pictures/default-avatar.svg",
    code: makeUniqueFriendCode(),
    isPremium: false,
    role: "user",
    createdAt: getTodaysDate(),
    invitedTo: [],
    sentInvites: [],
  };

  model.data.users.push(newUser);

  model.app.currentUserId = newUser.id;
  vs.username = "";
  vs.password = "";
  vs.confirmPassword = "";
  vs.usernameError = "";
  vs.passwordError = "";
  vs.confirmPasswordError = "";

  showToast(`Brukeren er opprettet. Velkommen, ${newUser.username}!`);
  setView("userProfile");
}

function goToLogin() {
  const vs = model.viewState.registerPage;
  vs.username = "";
  vs.password = "";
  vs.confirmPassword = "";
  vs.usernameError = "";
  vs.passwordError = "";
  vs.confirmPasswordError = "";
  setView("loginPage");
}

function findUserByUsername(username) {
  for (const user of model.data.users) {
    if (user.username === username) {
      return user;
    }
  }
  return undefined;
}

function makeFriendCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }

  code += "-" + (100 + Math.floor(Math.random() * 900));

  return code;
}

function makeUniqueFriendCode() {
  let code = makeFriendCode();
  while (findUserByCode(code) !== undefined) {
    code = makeFriendCode();
  }
  return code;
}

function findUserByCode(code) {
  return model.data.users.find((user) => user.code === code);
}

function getTodaysDate() {
  return new Date().toISOString().slice(0, 10);
}