function getThemeToggle() {
   return /*html*/ `
      <img onclick="toggleDarkMode()" class="icon-size" src="${getIcon(model.app.darkMode ? "sun" : "moon")}"/>
   `
}