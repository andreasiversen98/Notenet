const app = document.getElementById("app");
let lastModal = null;
let lastToast = "";

function updateView(page) {
   const modal = modals[model.app.openModal];
   document.body.classList.toggle("dark", model.app.darkMode);
   document.body.classList.toggle("retro", model.app.theme === "retro");
   app.innerHTML = page() + (modal ? modal() : "") + getToast();
   animateNewElements();
}

function animateNewElements() {
   if (model.app.openModal && model.app.openModal !== lastModal) {
      document.querySelector(".modal-overlay")?.classList.add("animate-in");
   }
   if (model.app.toast && model.app.toast !== lastToast) {
      document.querySelector(".toast")?.classList.add("animate-in");
   }
   lastModal = model.app.openModal;
   lastToast = model.app.toast;
}