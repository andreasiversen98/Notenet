let newUsername = model.viewState.userProfilePage.editProfile.username;
let canEditName = model.viewState.userProfilePage.editName;

let newImage = model.viewState.userProfilePage.editProfile.image;
let canEditImage = model.viewState.userProfilePage.editName;

function userSettings() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>innstillinger</h1>
         <div class="flex row align-center gap2">
            ${getThemeToggle()}
            <img onclick="exitUserSettings()" class="icon-size" src="../../src/icons/x.svg"/>
         </div>
      </div>
      <div class="flex column container gap padding">
         ${getNameField()}
         ${getImageField()}
         <div onclick="togglePremium()" class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               ${getLoggedInUser().isPremium ? `<span>Avslutt premium</span>` : `<span>Kjøp premium</span>`}
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
   getLoggedInUser().username = newUsername;
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

// Chrome viser store bilder litt hakkete når de krympes ned til små avatarer.
// Derfor lager vi en liten kopi (64x64) av bildet som brukes i listene.
let newImageSmall = "";

function getNewImage(event) {
   const file = event.target.files[0];
   newImage = URL.createObjectURL(file);
   makeSmallImage(newImage);
}

function makeSmallImage(imageUrl) {
   const img = new Image();
   img.src = imageUrl;
   img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      // klipper ut en firkant fra midten så bildet ikke blir strukket
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;
      canvas.getContext("2d").drawImage(img, x, y, size, size, 0, 0, 64, 64);
      newImageSmall = canvas.toDataURL();
   };
}

function submitNewImage() {
   if (newImage == "") return;
   getLoggedInUser().profilePicture = newImage;
   getLoggedInUser().profilePictureSmall = newImageSmall;
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
   const user = getLoggedInUser();
   user.isPremium = !user.isPremium;
   setView();
}

function exitUserSettings() {
   newUsername = "";
   canEditName = false;

   newImage = "";
   canEditImage = false;
   setView(model.app.previousPage);
}