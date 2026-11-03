// testdata lages bare hvis ingenting er lagret fra før
if (!loadModel()) {
   createTestUsers();
   createTestLists();
   createTestNotes();
}

function getLoggedInUser() {
   return model.data.users.find((u) => u.id === model.app.currentUserId);
}
console.log("controller.js - loggedInUser", getLoggedInUser());

function setView(selectedPage) {
   if (selectedPage && selectedPage !== model.app.currentPage) {
      model.app.previousPage = model.app.currentPage;
      model.app.currentPage = selectedPage;
   }
   const currentView = router[model.app.currentPage];
   updateView(currentView);
   saveModel();
}

function toggleDarkMode() {
   model.app.darkMode = !model.app.darkMode;
   setView();
}

function setTheme(theme) {
   model.app.theme = theme;
   getLoggedInUser().theme = theme;
   setView();
}

function getPremiumImage(name) {
   const ending = model.app.theme === "retro" ? "-retro" : "";
   return `assets/images/premium/${name}${ending}.svg`;
}

function getIllustration(name) {
   const ending = model.app.theme === "retro" ? "-retro" : "";
   return `assets/images/illustrations/${name}${ending}.svg`;
}

function isFavorite(listId) {
   return getLoggedInUser().favorites.includes(listId);
}

function toggleFavorite(listId) {
   const user = getLoggedInUser();
   if (isFavorite(listId)) user.favorites = user.favorites.filter((id) => id !== listId);
   else user.favorites.push(listId);
   setView();
}

function getFavoriteButton(listId) {
   const favorite = isFavorite(listId);
   return /*html*/ `
      <img
         class="favorite-btn ${favorite ? "favorite-on" : ""}"
         src="${getIcon(favorite ? "star-filled" : "star")}"
         title="${favorite ? "Fjern fra favoritter" : "Legg til i favoritter"}"
         onclick="event.stopPropagation(); toggleFavorite('${listId}')"
      />`;
}

// "2026-10-29" -> "29. oktober 2026"
function formatDate(dateString) {
   const date = new Date(dateString + "T00:00");
   return date.toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
}

function getLogo() {
   const ending = model.app.theme === "retro" ? "-retro" : "";
   return `assets/images/logo/notenet-logo${ending}.svg`;
}

function getIcon(name) {
   const folder = model.app.theme === "retro" ? "icons/pixel" : "icons";
   return `assets/${folder}/${name}.svg`;
}

function isUserLoggedIn() {
   if (model.app.currentUserId == "") setView("loginPage");
   else setView(model.app.currentPage);
}
isUserLoggedIn();
