function userProfile() {
   if (getLoggedInUser().role === "admin") return adminProfile();
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
      <div class="flex column align-center">
         <img class="image-size border" src="${user.profilePicture}"/>
         <div class="flex row">
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
   const icon = model.viewState.userProfilePage.codeCopied ? "check" : "copy";
   return /*html*/ `<img onclick="copyFriendCode()" class="copy-icon" title="Kopier vennekode" src="${getIcon(icon)}"/>`;
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
   if (hour >= 5 && hour < 10) return "God morgen";
   if (hour >= 10 && hour < 17) return "God dag";
   if (hour >= 17 && hour < 23) return "God kveld";
   return "God natt";
}

function getPremiumInfo() {
   if (!getLoggedInUser().isPremium) return ``;
   else
      return /*html*/ `
   <img class="premium-badge" src="${getPremiumImage("premium-badge")}" alt="premium"/>`;
}

function userListCategories() {
   return /*html*/ `
   <div class="flex column container gap padding">
      <div onclick="setLandingFilterBeforeSwitchPage('all')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="${getIcon("layers")}"/>
         <span>Alle</span>
         </div>
         <div class="flex row align-center gap">
         <span>${getUserListCount("all")}</span>
         <img class="icon-size" src="${getIcon("chevron-right")}"/>
         </div>
      </div>
      <div onclick="setLandingFilterBeforeSwitchPage('private')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="${getIcon("lock")}"/>
         <span>Private</span>
         </div>
         <div class="flex row align-center gap">
         <span>${getUserListCount("private")}</span>
         <img class="icon-size" src="${getIcon("chevron-right")}"/>
         </div>
      </div>
      <div onclick="setLandingFilterBeforeSwitchPage('shared')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="${getIcon("users")}"/>
         <span>Delte</span>
         </div>
         <div class="flex row align-center gap">
         <span>${getUserListCount("shared")}</span>
         <img class="icon-size" src="${getIcon("chevron-right")}"/>
         </div>
      </div>
      <div onclick="setLandingFilterBeforeSwitchPage('favorites')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="${getIcon("star")}"/>
         <span>Favoritter</span>
         </div>
         <div class="flex row align-center gap">
         <span>${getUserListCount("favorites")}</span>
         <img class="icon-size" src="${getIcon("chevron-right")}"/>
         </div>
      </div>
   </div>`;
}

function getUserListCount(filter) {
   const userId = model.app.currentUserId;
   let count = 0;
   for (const list of model.data.lists) {
      if (list.ownerId !== userId && !list.members.includes(userId)) continue;
      if (filter === "private" && list.isShared) continue;
      if (filter === "shared" && !list.isShared) continue;
      if (filter === "favorites" && !isFavorite(list.id)) continue;
      count++;
   }
   return count;
}

function setLandingFilterBeforeSwitchPage(filter) {
   model.viewState.landingPage.selectedFilter = filter;
   setView("landingPage");
}

function userPremiumButton() {
   if (getLoggedInUser().isPremium) return ``;
   else
      return /*html*/ `
   <div class="premium-cta flex row justify-between align-center">
      <div class="flex column">
         <span class="premium-cta-title">Notenet Premium</span>
         <span class="premium-cta-text">Lag delte lister og inviter venner</span>
      </div>
      <button class="premium-btn" onclick="togglePremium()">
         <img src="${getPremiumImage("premium-icon-no-dot")}"/>
         Få premium
      </button>
   </div>`;
}
