
 
function loginPage(){
  const vs = model.viewState.loginPage;

  return /*html*/ `
    <div class="login-wrapper">
      <div class="login-page">

        <h1 class="logo">notenet</h1>

        <input
          type="text"
          class="login-input"
          placeholder="brukernavn"
          value="${vs.username}"
          onchange="setLoginUsername(this.value)" />

        <input
          type="password"
          class="login-input"
          placeholder="passord"
          value="${vs.password}"
          onchange="setLoginPassword(this.value)" />

        <button class="login-button" onclick="logIn()">Log inn</button>

        <p class="login-error">${vs.error}</p>

<<<<<<< Updated upstream
      <p class="login-bottom">Har du ikke bruker? <a>Lag en ny</a></p>
      ${getBottomBar()}
=======
        <p class="login-bottom">Har du ikke bruker? <a>Lag en ny</a></p>

      </div>
>>>>>>> Stashed changes
    </div>
  `;
}

