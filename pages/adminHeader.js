function adminHeaderComponent() {
   return /*html*/ `
   <div class="header flex row justify-between align-center padding">
      <h2>adminpanel</h2>
      <div class="flex row align-center gap2">
         ${getThemeToggle()}
         <img onclick="setView('userSettings')" class="icon-size" src="../../src/icons/ellipsis-vertical.svg"/>
      </div>
   </div>
   `
}