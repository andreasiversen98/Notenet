function setRegisterUsername(value) {
  model.viewState.registerPage.username = value;
}

function setRegisterPassword(value) {
  model.viewState.registerPage.password = value;
}

function registerUser() {
  const vs = model.viewState.registerPage;

  if (vs.username === "" || vs.password === "") {
    vs.error = "Fyll ut både brukernavn og passord";
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
    invitedTo: [],
  };

  model.data.users.push(newUser);

  model.app.currentUserId = newUser.id;
  vs.username = "";
  vs.password = "";
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