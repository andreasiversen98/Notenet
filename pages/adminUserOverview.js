let filterPath = model.viewState.adminUserOverview.selectedFilter

function adminUserOverview() {
   return /*html*/ `
   ${adminHeaderComponent()}
   ${filterUsers()}
   ${displayUsers()}
   ${getBottomBar()}
   `;
}

function filterUsers() {
   return /*html*/ `
   <div class="flex row gap">
      <div class="border padding ${filterPath == "all" ? "container" : ""}"
      onclick="setFilter('all')">
         Alle
      </div>
      <div class="border padding ${filterPath == "free" ? "container" : ""}"
      onclick="setFilter('free')">
         Gratis
      </div>
      <div class="border padding  ${filterPath == "premium" ? "container" : ""}"
      onclick="setFilter('premium')">
         Premium
      </div>
   </div>
   `
}

function setFilter(newFilter) {
   filterPath = newFilter
   setView("adminUserOverview")
}

function displayUsers() {
   let users = ""
   users += /*html*/ `<div class="flex column container gap padding border bold">`
   for (let user of model.data.users) {
      if (filterPath === "free" && user.isPremium) continue
      if (filterPath === "premium" && !user.isPremium) continue
      users += /*html*/ `
      <div class="list-bar flex row justify-between align-center padding border">
         <div class="element50">
            ${user.username}
         </div>
         <div>
            ${user.code}
         </div>
         <div>
            <img class="icon-size" src="../../assets/icons/chevron-right.svg"/>
         </div>
      </div>`
   }
   users += "</div>"
   return users
}