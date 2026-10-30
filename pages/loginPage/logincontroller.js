function setLoginUsername(value) {
  model.viewState.loginPage.username = value;
}

function setLoginPassword(value) {
  model.viewState.loginPage.password = value;
}

function logIn() {
  const vs = model.viewState.loginPage;

  vs.usernameError = vs.username === "" ? "Skriv inn brukernavn" : "";
  vs.passwordError = vs.password === "" ? "Skriv inn passord" : "";

  if (vs.usernameError || vs.passwordError) {
    vs.error = "";
    setView();
    document.getElementById(vs.usernameError ? "login-username" : "login-password").focus();
    return;
  }

  const user = findUserByLogin(vs.username, vs.password);

  if (user === undefined) {
    vs.error = "Feil brukernavn eller passord";
    setView();
    return;
  } else {
    model.app.currentUserId = user.id;
    vs.username = "";
    vs.password = "";
    vs.error = "";
    vs.usernameError = "";
    vs.passwordError = "";
    setView("userProfile");
  }
}

function findUserByLogin(username, password) {
  for (const user of model.data.users) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
  return undefined;
}
