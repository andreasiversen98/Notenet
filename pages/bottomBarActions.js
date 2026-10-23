function getBottomBar() {
   return `
      <div class="flex column justify-self-end bottom-bar">
         <div class="flex row justify-evenly align-end padding">

            <span onclick="setView('userProfile')">
               <img class="icon-bottom icon-home" src="../../src/icons/house.svg"></img>
            </span>

            <span>
               <img class="icon-add" src="../../src/icons/square-plus.svg"></img>
            </span>

            <span onclick="setView('userNotification')">
               <img class="icon-bottom icon-notification" src="../../src/icons/bell.svg"></img>
            </span>
         </div>
      </div>
   `
}