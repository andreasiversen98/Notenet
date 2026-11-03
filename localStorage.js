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
   // model er const, så vi bytter ut data og ikke hele model
   model = JSON.parse(saved);
   return true;
}
