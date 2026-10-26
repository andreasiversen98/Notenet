function setLoginUsername(value) {
  model.viewState.loginPage.username = value;
}

function setLoginPassword(value) {
  model.viewState.loginPage.password = value;
}

function logIn() {
  const vs = model.viewState.loginPage;
  const user = findUserByLogin(vs.username, vs.password);

  if (user === undefined) {
    vs.error = "Feil brukernavn eller passord";
  } else {
    model.app.currentUserId = user.id;
    vs.username = "";
    vs.password = "";
    vs.error = "";
    setView("userProfile");
  }

  updateLoginView();
}

function findUserByLogin(username, password) {
  for (const user of model.data.users) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
  return undefined;
}
