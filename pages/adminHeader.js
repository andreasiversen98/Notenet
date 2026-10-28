function adminHeaderComponent() {
   return /*html*/ `
   <div class="header flex row justify-between align-center padding">
      <div class="flex row align-center gap">
         <img class="logo-img" src="../../assets/images/logo/notenet-logo.svg" alt="notenet">
         <span class="admin-tag">Admin</span>
      </div>
      <div class="flex row align-center gap2">
         ${getThemeToggle()}
         <img onclick="setView('userSettings')" class="icon-size" src="../../assets/icons/ellipsis-vertical.svg"/>
      </div>
   </div>
   `
}