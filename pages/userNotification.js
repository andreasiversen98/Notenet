function userNotification() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>notifications</h1>
         <img onclick="setView(model.app.previousPage)" class="icon-size" src="../../src/icons/x.svg"/>
      </div>

      <div class="flex column container gap padding">

         <div onclick="togglePremium()" class="list-bar flex row justify-between padding border">
            <div class="flex column padding gap">
               <div class="bold">Ole</div>
               <div>Awesome list of fun</div>
            </div>
            <div class="flex row align-center padding gap2">
               <img onclick="acceptInviteToList()" class="icon-size2" src="../../src/icons/check.svg"/>
               <img onclick="declineInviteToList()" class="icon-size2" src="../../src/icons/x.svg"/>
            </div>
         </div>


      </div>
   </div>
   
   ${getBottomBar()}`
}

function acceptInviteToList() {

}

function declineInviteToList() {

}