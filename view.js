const app = document.getElementById("app");

function updateView(page) {
   app.innerHTML = page() + createListModalComponent();
}