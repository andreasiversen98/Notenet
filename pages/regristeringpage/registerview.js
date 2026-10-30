function registerPage() {
  const vs = model.viewState.registerPage;

  return /*html*/ `
    <div class="theme-toggle">${getThemeToggle()}</div>
    <div class="login-wrapper">
      <div class="login-page">

        <h1 class="logo"><img class="logo-img" src="../../assets/images/logo/notenet-logo.svg" alt="notenet"></h1>

        <h2 class="register-title">Lag ny bruker</h2>

        <label class="login-label">
          Brukernavn
          <input
            id="register-username"
            type="text"
            class="login-input ${vs.usernameError ? "input-error" : ""}"
            autocomplete="off"
            value="${vs.username}"
            oninput="setRegisterUsername(this.value)"
            onkeydown="if(event.key === 'Enter') registerUser()" />
          ${vs.usernameError ? `<span class="field-error">${vs.usernameError}</span>` : ""}
        </label>

        <label class="login-label">
          Passord
          <input
            id="register-password"
            type="password"
            class="login-input ${vs.passwordError ? "input-error" : ""}"
            autocomplete="new-password"
            value="${vs.password}"
            oninput="setRegisterPassword(this.value)"
            onkeydown="if(event.key === 'Enter') registerUser()" />
          ${vs.passwordError ? `<span class="field-error">${vs.passwordError}</span>` : ""}
        </label>

        <label class="login-label">
          Gjenta passord
          <input
            id="register-confirm-password"
            type="password"
            class="login-input ${vs.confirmPasswordError ? "input-error" : ""}"
            autocomplete="new-password"
            value="${vs.confirmPassword}"
            oninput="setRegisterConfirmPassword(this.value)"
            onkeydown="if(event.key === 'Enter') registerUser()" />
          ${vs.confirmPasswordError ? `<span class="field-error">${vs.confirmPasswordError}</span>` : ""}
        </label>

        <button class="login-button" onclick="registerUser()">Lag bruker</button>

        <div class="login-divider">Har du allerede en bruker?</div>

        <button class="register-button" onclick="setView('loginPage')">
          Logg inn
        </button>

      </div>
    </div>
  `;
}
