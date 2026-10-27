function adminHeaderComponent() {
   return `
   <div class="header flex row justify-between align-center padding">
      <h2>admin panel</h2>
      <img onclick="setView('userSettings')" class="icon-size" src="../../src/icons/ellipsis-vertical.svg"/>
   </div>
   `
}