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
            id="login-username"
            type="text"
            class="login-input ${vs.usernameError ? "input-error" : ""}"
            value="${vs.username}"
            oninput="setLoginUsername(this.value)"
            onkeydown="if(event.key === 'Enter') logIn()" />
          ${vs.usernameError ? `<span class="field-error">${vs.usernameError}</span>` : ""}
        </label>

        <label class="login-label">
          Passord
          <input
            id="login-password"
            type="password"
            class="login-input ${vs.passwordError ? "input-error" : ""}"
            value="${vs.password}"
            oninput="setLoginPassword(this.value)"
            onkeydown="if(event.key === 'Enter') logIn()" />
          ${vs.passwordError ? `<span class="field-error">${vs.passwordError}</span>` : ""}
        </label>

        <button class="login-button" onclick="logIn()">Logg inn</button>

        ${vs.error ? `<p class="login-error">${vs.error}</p>` : ""}

        <div class="login-divider">eller</div>

        <button class="register-button" onclick="goToRegister()">
          Lag en ny bruker
        </button>

      </div>
    </div>
    
  `;
}