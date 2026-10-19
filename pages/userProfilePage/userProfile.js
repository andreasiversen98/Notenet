const userApp = document.getElementById("user-profile");

const testData = { ...model.data.users };

console.log(testData[0]);

const userData = testData[4];

function userProfile() {
   userApp.innerHTML = userProfileLayout() + getBottomBar();
}
userSettings();

function userSettings() {
   userApp.innerHTML = `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>settings</h1>
         <img onclick="userProfile()" class="icon-size" src="../../src/icons/x.svg"/>
      </div>

      <div class="flex column container gap padding">
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <span>Endre navn</span>
         </div>
      </div>

      <div class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
            <span>Endre profilbilde</span>
         </div>
      </div>

      <div onclick="togglePremium('settings')" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
            ${userData.isPremium ? `<span>Avslutt premium</span>` : `<span>Kjøp premium</span>`}
         </div>
      </div>

   </div>
   `;
}

function userProfileLayout() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>notenet</h1>
         <img onclick="userSettings()" class="icon-size" src="../../src/icons/ellipsis-vertical.svg"/>
      </div>
      <div class="flex row padding gap justify-center">
         <div class="flex column gap">
            <img class="image-size border" src="${userData.profilePicture}"/>
            <div class="flex row justify-between gap">
               ${
                  userData.isPremium
                     ? `
                  <h4>premium</h4>
                  <img class="icon-size" src="../../src/icons/circle-star.svg"/>`
                     : ``
               }
            </div>
         </div>
         <div>
            <h2>hei ${userData.username}</h2>
            <h4 class="flex row justify-end">${userData.code}</h4>
         </div>
      </div>

      <div class="flex column container gap padding">
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
            <img class="icon-size" src="../../src/icons/infinity.svg"/>
            <span>Alle</span>
            </div>
            <div class="flex row align-center gap">
            <span>24</span>
            <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
            </div>
         </div>

         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
            <img class="icon-size" src="../../src/icons/globe.svg"/>
            <span>Delte</span>
            </div>
            <div class="flex row align-center gap">
            <span>12</span>
            <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
            </div>
         </div>

         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
            <img class="icon-size" src="../../src/icons/lock.svg"/>
            <span>Privat</span>
            </div>
            <div class="flex row align-center gap">
            <span>2</span>
            <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
            </div>
         </div>
      </div>

      ${
         userData.isPremium ? ``
         : `
         <div class="flex row justify-center align-center padding">
            <button onclick="togglePremium('profile')">kjøp premium</button>
         </div>
         `}
      
      
   </div>
   `;
}

function togglePremium(from) {
   userData.isPremium = !userData.isPremium;
   if (from === "profile") userProfile();
   if (from === "settings") userSettings();
}
