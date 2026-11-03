// lagrer bare det som skal huskes etter refresh: data, hvem som er logget inn, siden og tema.
// viewState lagres ikke, den starter alltid på nytt fra model.js, så nye felt i modellen virker med en gang
function saveModel() {
   const saved = {
      data: model.data,
      currentUserId: model.app.currentUserId,
      currentPage: model.app.currentPage,
      selectedListId: model.viewState.listPage.selectedListId,
      theme: model.app.theme,
      darkMode: model.app.darkMode,
   };
   try {
      localStorage.setItem("notenet", JSON.stringify(saved));
   } catch (error) {
      console.warn("Klarte ikke å lagre", error);
   }
}

// henter lagret data, gir false hvis det ikke finnes noe
function loadModel() {
   const saved = JSON.parse(localStorage.getItem("notenet"));
   if (!saved || !saved.data) return false;

   model.data = saved.data;
   model.app.currentUserId = saved.currentUserId || "";
   model.app.currentPage = saved.currentPage || "";
   model.app.theme = saved.theme || "modern";
   model.app.darkMode = saved.darkMode === true;
   model.viewState.listPage.selectedListId = saved.selectedListId || "";
   return true;
}
