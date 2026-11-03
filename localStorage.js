// lagrer brukere, lister og notater i nettleseren
function saveModel() {
   try {
      localStorage.setItem("notenet", JSON.stringify(model));
   } catch (error) {
      console.warn("Klarte ikke å lagre", error);
   }
}

// henter lagret data, gir false hvis det ikke finnes noe
function loadModel() {
   const saved = localStorage.getItem("notenet");
   if (!saved) return false;
   model = JSON.parse(saved);
   resetTemporaryState();
   return true;
}

// ting som bare gjelder mens siden er åpen skal ikke henge igjen etter refresh,
// ellers kan for eksempel en oppgave som holdt på å bli huket av blokkere alle nye avhukinger
function resetTemporaryState() {
   model.app.openModal = null;
   model.app.toast = "";

   const lp = model.viewState.listPage;
   lp.completingItemId = null;
   lp.animatedItemId = null;
   lp.editingItemId = null;
   lp.editingItemTitle = "";
}
