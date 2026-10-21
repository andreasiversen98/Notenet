let currentUsername = model.data.users[4].username;
let newUsername = model.viewState.userProfilePage.editProfile.username;
let canEditName = model.viewState.userProfilePage.editName;

function userSettings() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>settings</h1>
         <img onclick="setView('userProfile')" class="icon-size" src="../../src/icons/x.svg"/>
      </div>
      <div class="flex column container gap padding">
         ${getNameField()}
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <span>Endre profilbilde</span>
            </div>
         </div>
         <div onclick="togglePremium()" class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               ${loggedInUser.isPremium ? `<span>Avslutt premium</span>` : `<span>Kjøp premium</span>`}
            </div>
         </div>
      </div>
   </div>
   `;
}

function switchNameField() {
   if (canEditName) return;
   canEditName = !canEditName;
   setView();
}

function getNameField() {
   if (canEditName == false)
      return `
         <div onclick="switchNameField()" class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <span>Endre navn</span>
            </div>
         </div>`;
   else
      return `
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <input onchange="newUsername = this.value" type="text"><button onclick="changeUsername()">endre</button>
            </div>
         </div>`;
}

function changeUsername() {
   if (newUsername == "") return;
   currentUsername = newUsername;
   canEditName = false;
   setView();
}
