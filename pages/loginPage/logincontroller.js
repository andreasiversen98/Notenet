function setLoginUsername(value) {
  model.viewState.loginPage.username = value;
}

function setLoginPassword() {
  model.viewState.loginPage.password = value;
}

function login() {
  const vs = model.viewState.loginPage;
  const user = findUserByLogin(vs.username, vs.password);

  if (user === undefined) {
    vs. console.error = "feil brukernavn eller passord";
    
  } else {
    model.app.currentUserId = user.id;
    vs.username = "";
    vs.password = "";
    vs.error = "";
  }
}

function findUserByLogin(username, passord) {
  for (const user of model.data.users) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
  return undefined;
}
