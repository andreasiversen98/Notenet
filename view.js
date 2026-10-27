const app = document.getElementById("app");

function updateView(page) {
   const modal = modals[model.app.openModal];
   document.body.classList.toggle("dark", model.app.darkMode);
   app.innerHTML = page() + (modal ? modal() : "");
}