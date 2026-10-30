function getToast() {
   if (!model.app.toast) return "";
   return /*html*/ `
   <div class="toast flex row align-center gap">
      <img class="toast-icon" src="../../assets/icons/check-white.svg"/>
      <span>${model.app.toast}</span>
      <img class="toast-close" onclick="closeToast()" src="../../assets/icons/x.svg" alt="Lukk"/>
   </div>`;
}

function showToast(message) {
   model.app.toast = message;
   setTimeout(() => {
      model.app.toast = "";
      setView();
   }, 4000);
}

function closeToast() {
   model.app.toast = "";
   setView();
}
