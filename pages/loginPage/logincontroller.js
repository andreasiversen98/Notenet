function setLoginUsername(value) {
  model.viewState.loginPage.username = value;
}

function logIn() {
  const user = findUserByLogin(vs.username, vs.password);
  if (user === undefined) {
    vs.error = "Feil brukernavn eller passord";
  } else {
    model.app.currentUserId = user.id;
  }
  updateLoginView();
}