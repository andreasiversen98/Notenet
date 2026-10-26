function headerComponent() {
   return `
      <div class="header flex row justify-between align-center padding">
         <h1>notenet</h1>
         <img onclick="setView('userSettings')" class="icon-size" src="../../src/icons/ellipsis-vertical.svg"/>
      </div>
   `
}