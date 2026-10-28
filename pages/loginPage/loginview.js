function loginPage(){
  const vs = model.viewState.loginPage;

  return /*html*/ `
    <div class="theme-toggle">${getThemeToggle()}</div>
    <div class="login-wrapper">
      <div class="login-page">

        <h1 class="logo"><img class="logo-img" src="../../assets/images/logo/notenet-logo.svg" alt="notenet"></h1>

        <label class="login-label">
          Brukernavn
          <input
            type="text"
            class="login-input"
            value="${vs.username}"
            oninput="setLoginUsername(this.value)"
            onkeydown="if(event.key === 'Enter') logIn()" />
        </label>

        <label class="login-label">
          Passord
          <input
            type="password"
            class="login-input"
            value="${vs.password}"
            oninput="setLoginPassword(this.value)"
            onkeydown="if(event.key === 'Enter') logIn()" />
        </label>

        <button class="login-button" onclick="logIn()">Logg inn</button>

        ${vs.error ? `<p class="login-error">${vs.error}</p>` : ""}

        <div class="login-divider">eller</div>

        <button class="register-button" onclick="setView('registerPage')">
          Lag en ny bruker
        </button>

      </div>
    </div>
    ${getBottomBar()}
  `;
}