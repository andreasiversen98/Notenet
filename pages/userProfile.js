function userProfile() {
   if (getLoggedInUser().role === "admin") return adminProfile()
   return /*html*/ `
   ${headerComponent()}
   ${userProfileLayout()}
   ${getBottomBar()}
   `;
   
}

function userProfileLayout() {
   return /*html*/ `
   <div class="flex column gap profile-container">
      ${userInfoElements()}
      ${userListCategories()}
      ${userPremiumButton()}   
   </div>`;
}

function userInfoElements() {
   const user = getLoggedInUser();
   return /*html*/ `
   <div class="flex row padding gap justify-evenly">
      <div class="flex column gap">
         <img class="image-size border" src="${user.profilePicture}"/>
         <div class="flex row justify-between gap">
            ${getPremiumInfo()}
         </div>
      </div>
      <div>
         <h2 class="greeting">${getGreeting()}, ${user.username}</h2>
         <h4 class="flex row justify-end"><span class="code-label">Vennekode:</span>${user.code}${getCopyButton()}</h4>
      </div>
   </div>`;
}

function getCopyButton() {
   const icon = model.viewState.userProfilePage.codeCopied ? "check.svg" : "copy.svg";
   return /*html*/ `<img onclick="copyFriendCode()" class="copy-icon" title="Kopier vennekode" src="../../assets/icons/${icon}"/>`
}

function copyFriendCode() {
   navigator.clipboard.writeText(getLoggedInUser().code);
   model.viewState.userProfilePage.codeCopied = true;
   setView();
   setTimeout(() => {
      model.viewState.userProfilePage.codeCopied = false;
      setView();
   }, 2000);
}

function getGreeting() {
   const hour = new Date().getHours();
   if (hour >= 5 && hour < 10) return "God morgen"
   if (hour >= 10 && hour < 17) return "God dag"
   if (hour >= 17 && hour < 23) return "God kveld"
   return "God natt"
}

function getPremiumInfo() {
   if (!getLoggedInUser().isPremium) return `` 
   else return /*html*/ `
   <img class="premium-badge" src="../../assets/images/premium/premium-badge.svg" alt="premium" style="height: 24px"/>`
}

function userListCategories() {
   return /*html*/ `
   <div class="flex column container gap padding">
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../assets/icons/layers.svg"/>
         <span>Alle</span>
         </div>
         <div class="flex row align-center gap">
         <span>24</span>
         <img class="icon-size" src="../../assets/icons/chevron-right.svg"/>
         </div>
      </div>
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../assets/icons/users.svg"/>
         <span>Delte</span>
         </div>
         <div class="flex row align-center gap">
         <span>12</span>
         <img class="icon-size" src="../../assets/icons/chevron-right.svg"/>
         </div>
      </div>
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../assets/icons/lock.svg"/>
         <span>Privat</span>
         </div>
         <div class="flex row align-center gap">
         <span>2</span>
         <img class="icon-size" src="../../assets/icons/chevron-right.svg"/>
         </div>
      </div>
   </div>`;
}

function userPremiumButton() {
   if (getLoggedInUser().isPremium) return ``
   else return /*html*/ `
   <div class="premium-cta flex row justify-between align-center">
      <div class="flex column">
         <span class="premium-cta-title">Notenet Premium</span>
         <span class="premium-cta-text">Lag delte lister og inviter venner</span>
      </div>
      <button class="premium-btn" onclick="togglePremium()">
         <img src="../../assets/images/premium/premium-icon-no-dot.svg"/>
         Få premium
      </button>
   </div>`
}