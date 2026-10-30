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
    code: "NEW-" + (model.data.users.length + 1),
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

function findUserByUsername(username) {
  for (const user of model.data.users) {
    if (user.username === username) {
      return user;
    }
  }
  return undefined;
}

function getTodaysDate() {
  return new Date().toISOString().slice(0, 10);
}