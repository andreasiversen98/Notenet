function headerComponent() {
   return /*html*/ `
      <div class="header flex row justify-between align-center padding">
         <h1><img class="logo-img" src="${getLogo()}" alt="notenet"></h1>
         <div class="flex row align-center gap2">
            ${getThemeToggle()}
            <img onclick="setView('userSettings')" class="icon-size" title="Innstillinger" src="${getIcon("ellipsis-vertical")}"/>
            <img onclick="setView('userProfile')" class="header-avatar" src="${getLoggedInUser().profilePictureSmall || getLoggedInUser().profilePicture}" alt="Profil"/>
         </div>
      </div>
   `
}
