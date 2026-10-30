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

  if (vs.username === "" || vs.password === "" || vs.confirmPassword === "") {
    vs.error = "Fyll ut alle feltene";
    setView();
    return;
  }

  if (vs.password !== vs.confirmPassword) {
    vs.error = "Passordene er ikke like";
    setView();
    return;
  }

  if (findUserByUsername(vs.username) !== undefined) {
    vs.error = "Brukernavnet er opptatt";
    setView();
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
  vs.error = "";

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