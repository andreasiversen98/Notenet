function userProfile() {
   if (getLoggedInUser().role === "admin") return adminProfile()
   return `
   ${headerComponent()}
   ${userProfileLayout()}
   ${getBottomBar()}
   `;
   
}

function userProfileLayout() {
   return `
   <div class="flex column gap profile-container">
      ${userInfoElements()}
      ${userListCategories()}
      ${userPremiumButton()}   
   </div>`;
}

function userInfoElements() {
   const user = getLoggedInUser();
   return `
   <div class="flex row padding gap justify-evenly">
      <div class="flex column gap">
         <img class="image-size border" src="${user.profilePicture}"/>
         <div class="flex row justify-between gap">
            ${getPremiumInfo()}
         </div>
      </div>
      <div>
         <h2 class="greeting">hei ${user.username}</h2>
         <h4 class="flex row justify-end">${user.code}</h4>
      </div>
   </div>`;
}

function getPremiumInfo() {
   if (!getLoggedInUser().isPremium) return `` 
   else return `
   <h4>premium</h4>
   <img class="icon-size" src="../../src/icons/circle-star.svg"/>`
}

function userListCategories() {
   return `
   <div class="flex column container gap padding">
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/infinity.svg"/>
         <span>Alle</span>
         </div>
         <div class="flex row align-center gap">
         <span>24</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/globe.svg"/>
         <span>Delte</span>
         </div>
         <div class="flex row align-center gap">
         <span>12</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>
      <div onclick="setView('listPage')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/lock.svg"/>
         <span>Privat</span>
         </div>
         <div class="flex row align-center gap">
         <span>2</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>
   </div>`;
}

function userPremiumButton() {
   if (getLoggedInUser().isPremium) return ``
   else return `
   <div class="flex row justify-center align-center padding">
      <button onclick="togglePremium()">kjøp premium</button>
   </div>`
}