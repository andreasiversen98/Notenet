function loginPage(){
  const vs = model.viewState.loginPage;

  return /*html*/ `
    <div class="theme-toggle">${getThemeToggle()}</div>
    <div class="login-wrapper">
      <div class="login-page">

        <h1 class="logo"><img class="logo-img" src="../../src/images/logo/notenet-logo.svg" alt="notenet"></h1>

        <input
          type="text"
          class="login-input"
          placeholder="brukernavn"
          value="${vs.username}"
          oninput="setLoginUsername(this.value)"
          onkeydown="if(event.key === 'Enter') logIn()" />

        <input
          type="password"
          class="login-input"
          placeholder="passord"
          value="${vs.password}"
          oninput="setLoginPassword(this.value)"
          onkeydown="if(event.key === 'Enter') logIn()" />

        <button class="login-button" onclick="logIn()">Logg inn</button>

        <p class="login-error">${vs.error}</p>

        <button class="register-button" onclick="setView('registerPage')">
          Lag en ny bruker
        </button>

      </div>
    </div>
    ${getBottomBar()}
  `;
}