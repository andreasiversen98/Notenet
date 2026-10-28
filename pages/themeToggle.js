function getThemeToggle() {
   return /*html*/ `
      <img onclick="toggleDarkMode()" class="icon-size" src="../../src/icons/${model.app.darkMode ? "sun.svg" : "moon.svg"}"/>
   `
}