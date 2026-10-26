const app = document.getElementById("app");

function updateView(page) {
   const modal = modals[model.app.openModal];
   app.innerHTML = page() + (modal ? modal() : "");
}