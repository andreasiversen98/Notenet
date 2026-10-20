function userSettings() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>settings</h1>
         <img onclick="setView('userProfile')" class="icon-size" src="../../src/icons/x.svg"/>
      </div>

      <div class="flex column container gap padding">
         <div class="list-bar flex row justify-between padding">
            <div class="flex row align-center gap">
               <span>Endre navn</span>
         </div>
      </div>

      <div class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
            <span>Endre profilbilde</span>
         </div>
      </div>

      <div onclick="togglePremium()" class="list-bar flex row justify-between padding">
         <div class="flex row align-center gap">
            ${userData.isPremium ? `<span>Avslutt premium</span>` : `<span>Kjøp premium</span>`}
         </div>
      </div>

   </div>
   `;
}