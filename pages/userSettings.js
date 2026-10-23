let newUsername = model.viewState.userProfilePage.editProfile.username;
let canEditName = model.viewState.userProfilePage.editName;

let newImage = model.viewState.userProfilePage.editProfile.image;
let canEditImage = model.viewState.userProfilePage.editName;

function userSettings() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>settings</h1>
         <img onclick="exitUserSettings()" class="icon-size" src="../../src/icons/x.svg"/>
      </div>
      <div class="flex column container gap padding">
         ${getNameField()}
         ${getImageField()}
         <div onclick="togglePremium()" class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               ${loggedInUser.isPremium ? `<span>Avslutt premium</span>` : `<span>Kjøp premium</span>`}
            </div>
         </div>
      </div>
   </div>
   `;
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
               <input onchange="newUsername = this.value" type="text">
               <button onclick="changeUsername()">endre</button>
               <button onclick="cancelNameField()">avbryt</button>
            </div>
         </div>`;
}

function changeUsername() {
   if (newUsername == "") return;
   loggedInUser.username = newUsername;
   canEditName = false;
   setView();
}

function switchNameField() {
   if (canEditName) return;
   canEditName = !canEditName;
   setView();
}

function cancelNameField() {
   canEditName = false;
   newUsername = "";
   setView();
}

function getImageField() {
   if (canEditImage == false)
      return `
         <div onclick="switchImageField()" class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <span>Endre profilbilde</span>
            </div>
         </div>`;
   else
      return `
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <input type="file" id="imageInput" accept="image/*" onchange="getNewImage(event)"/>
               <button onclick="submitNewImage()">lagre</button>
               <button onclick="cancelImageField()">avbryt</button>
            </div>
         </div>`;
}

function switchImageField() {
   if (canEditImage) return;
   canEditImage = !canEditImage;
   setView();
}

function getNewImage(event) {
   const file = event.target.files[0];
   newImage = URL.createObjectURL(file);
}

function submitNewImage() {
   if (newImage == "") return;
   loggedInUser.profilePicture = newImage;
   canEditImage = false;
   newImage = "";
   setView();
}

function cancelImageField() {
   canEditImage = false;
   newImage = "";
   setView();
}

function togglePremium() {
   loggedInUser.isPremium = !loggedInUser.isPremium;
   setView();
}

function exitUserSettings() {
   newUsername = "";
   canEditName = false;

   newImage = "";
   canEditImage = false;
   setView(model.app.previousPage);
}
