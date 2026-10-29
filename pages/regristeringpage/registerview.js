function registerPage() {
  const vs = model.viewState.registerPage;

  return /*html*/ `
    <div class="theme-toggle">${getThemeToggle()}</div>
    <div class="login-wrapper">
      <div class="login-page">

        <input
          type="text"
          class="login-input"
          placeholder="brukernavn"
          value="${vs.username}"
          oninput="setRegisterUsername(this.value)"
          onkeydown="if(event.key === 'Enter') registerUser()" />

        <input
          type="password"
          class="login-input"
          placeholder="passord"
          value="${vs.password}"
          oninput="setRegisterPassword(this.value)"
          onkeydown="if(event.key === 'Enter') registerUser()" />

        <button class="login-button" onclick="registerUser()">Lag bruker</button>

        <p class="login-error">${vs.error}</p>

        <button class="register-button" onclick="setView('loginPage')">
          Tilbake til innlogging
        </button>

      </div>
    </div>
    ${getBottomBar()}
  `;
}