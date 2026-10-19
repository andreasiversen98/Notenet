function loginPage() {
  const vs = model.viewState.loginPage;

  return /*html*/ `
    <input value="${vs.username}" onchange="setLoginUsername(this.value)" />
    <button onclick="logIn()">Log inn</button>
    ${loginError()}
  `;
}