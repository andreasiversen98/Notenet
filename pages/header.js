function headerComponent() {
   return /*html*/ `
      <div class="header flex row justify-between align-center padding">
         <h1><img class="logo-img" src="../../assets/images/logo/notenet-logo.svg" alt="notenet"></h1>
         <div class="flex row align-center gap2">
            ${getThemeToggle()}
            <img onclick="setView('userSettings')" class="icon-size" src="../../assets/icons/ellipsis-vertical.svg"/>
         </div>
      </div>
   `
}