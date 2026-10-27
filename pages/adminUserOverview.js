function adminUserOverview() {
   return `
   ${adminHeaderComponent()}
   ${filterUsers()}
   ${displayUsers()}
   ${getBottomBar()}
   `;
}

function filterUsers() {
   model.viewState.adminUserOverview.selectedFilter = "all"

   return `
   <div class="flex row gap">
      <div class="border padding">
         Alle
      </div>
      <div class="border padding">
         Gratis
      </div>
      <div class="border padding">
         Premium
      </div>
   </div>
   `
}

function displayUsers() {
   let users = ""
   users += `<div class="flex column container gap padding border bold">`
   for (let user of model.data.users) {
      users += `
      <div class="list-bar flex row justify-between align-center padding border">
         <div class="element50">
            ${user.username}
         </div>
         <div>
            ${user.code}
         </div>
         <div>
            <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>
         
         
         `
   }
   users += "</div>"
   return users
}