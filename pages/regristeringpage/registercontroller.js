
function setLoginUsername(value) {
    model.viewState.registerPage.username = value;
}

function setLoginPassword(value) {
    model.viewState.registerPage.password = value;
}

function registeruser() {
    const vs = model.viewState.registerPage;
}

function getTodaysDate() {
  return new Date().toISOString().slice(0, 10);
}

registeruser();