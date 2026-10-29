let newUsername = model.viewState.userProfilePage.editProfile.username;
let canEditName = model.viewState.userProfilePage.editName;

let newImage = model.viewState.userProfilePage.editProfile.image;
let canEditImage = model.viewState.userProfilePage.editImage;

function userSettings() {
   const user = getLoggedInUser();

   return /*html*/ `
   <div class="settings-page flex column">
      <div class="flex row justify-between align-center">
         <h1>Innstillinger</h1>
         <div class="flex row align-center gap2">
            ${getThemeToggle()}
            <img onclick="exitUserSettings()" class="icon-size" src="../../assets/icons/x.svg"/>
         </div>
      </div>

      <div class="settings-user flex row align-center gap">
         <img class="settings-avatar" src="${newImage || user.profilePictureSmall || user.profilePicture}" alt="${user.username}"/>
         <div class="flex column">
            <span class="settings-name">${user.username}</span>
            <span class="settings-meta">${user.isPremium ? "Premium" : "Gratis"} · ${user.code}</span>
         </div>
      </div>

      <h3 class="settings-label">Profil</h3>
      <div class="settings-group">
         ${getNameField()}
         ${getImageField()}
      </div>

      <h3 class="settings-label">Abonnement</h3>
      <div class="settings-group">
         ${getPremiumRow()}
      </div>
   </div>
   `;
}

function getPremiumRow() {
   const isPremium = getLoggedInUser().isPremium;
   const icon = isPremium ? "star-red.svg" : "circle-star.svg";
   const text = isPremium ? "Avslutt premium" : "Kjøp premium";

   return /*html*/ `
      <div onclick="togglePremium()" class="settings-row ${isPremium ? "settings-danger" : ""} flex row align-center gap">
         <img class="icon-size ${isPremium ? "icon-star-red" : ""}" src="../../assets/icons/${icon}"/>
         <span>${text}</span>
         ${isPremium ? "" : `<img class="settings-chevron" src="../../assets/icons/chevron-right.svg"/>`}
      </div>`;
}

function getNameField() {
   if (canEditName == false)
      return /*html*/ `
         <div onclick="switchNameField()" class="settings-row flex row align-center gap">
            <img class="icon-size" src="../../assets/icons/pencil.svg"/>
            <span>Endre navn</span>
            <img class="settings-chevron" src="../../assets/icons/chevron-right.svg"/>
         </div>`;
   else
      return /*html*/ `
         <div class="settings-row flex row align-center gap">
            <input class="settings-input" onchange="newUsername = this.value" type="text" placeholder="Nytt navn">
            <button class="edit-btn edit-btn-save" onclick="changeUsername()">Endre</button>
            <button class="edit-btn edit-btn-cancel" onclick="cancelNameField()">Avbryt</button>
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
      return /*html*/ `
         <div onclick="switchImageField()" class="settings-row flex row align-center gap">
            <img class="icon-size" src="../../assets/icons/user-round.svg"/>
            <span>Endre profilbilde</span>
            <img class="settings-chevron" src="../../assets/icons/chevron-right.svg"/>
         </div>`;
   else
      return /*html*/ `
         <div class="settings-row flex column gap">
            <div class="avatar-grid">${getAvatarOptions()}</div>
            <div class="flex row align-center gap">
               <input class="settings-file" type="file" id="imageInput" accept="image/*" onchange="getNewImage(event)"/>
               <button class="edit-btn edit-btn-save" onclick="submitNewImage()">Lagre</button>
               <button class="edit-btn edit-btn-cancel" onclick="cancelImageField()">Avbryt</button>
            </div>
         </div>`;
}

const pictureNames = [
   "default-avatar",
   "avatar-red", "avatar-blue", "avatar-green", "avatar-purple", "avatar-yellow",
   "avatar-pink", "avatar-orange", "avatar-teal", "avatar-gray",
   "shape-check", "shape-ring", "shape-split", "shape-dots",
   "shape-stack", "shape-sun", "shape-wave", "shape-quarter",
];

function getAvatarOptions() {
   const current = newImage || getLoggedInUser().profilePicture;
   let options = "";
   for (const name of pictureNames) {
      const path = `../../assets/images/profile-pictures/${name}.svg`;
      options += /*html*/ `
         <img class="avatar-option ${path === current ? "selected" : ""}" src="${path}" alt="${name}" onclick="choosePicture('${path}')"/>`;
   }
   return options;
}

function choosePicture(path) {
   newImage = path;
   newImageSmall = "";
   setView();
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
   setView();
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
   if (newImage == "") {
      cancelImageField();
      return;
   }
   const user = getLoggedInUser();
   user.profilePicture = newImage;
   user.profilePictureSmall = newImageSmall;
   canEditImage = false;
   newImage = "";
   setView();
}

function cancelImageField() {
   canEditImage = false;
   newImage = "";
   newImageSmall = "";
   setView();
}

function togglePremium() {
   const user = getLoggedInUser();
   if (user.isPremium && getSharedListsOwnedBy(user).length > 0) {
      openModal("cancelPremium");
      return;
   }
   user.isPremium = !user.isPremium;
   setView();
}

function confirmCancelPremium() {
   const user = getLoggedInUser();
   user.isPremium = false;
   makeSharedListsPrivate(user);
   closeModal();
}

function getSharedListsOwnedBy(user) {
   return model.data.lists.filter((list) => list.ownerId === user.id && list.isShared);
}

function makeSharedListsPrivate(user) {
   for (const list of getSharedListsOwnedBy(user)) {
      list.isShared = false;
      list.members = [user.id];

      for (const otherUser of model.data.users) {
         otherUser.invitedTo = otherUser.invitedTo.filter((listId) => listId !== list.id);
      }
   }
}

function exitUserSettings() {
   newUsername = "";
   canEditName = false;

   newImage = "";
   canEditImage = false;
   setView(model.app.previousPage);
}