let filterPath = model.viewState.adminUserOverview.selectedFilter;

function adminUserOverview() {
   return /*html*/ `
      ${adminHeaderComponent()}
      <div class="admin-container flex column gap">
         <div class="flex row justify-between align-center">
            <h2 class="admin-title">Brukere</h2>
            ${filterUsers()}
         </div>
         ${displayUsers()}
      </div>
      ${getBottomBar()}`;
}

function filterUsers() {
   return /*html*/ `
      <div class="modal-toggle-container admin-filter">
         <button class="modal-toggle-btn ${filterPath == "all" ? "active" : ""}" onclick="setFilter('all')">Alle</button>
         <button class="modal-toggle-btn ${filterPath == "free" ? "active" : ""}" onclick="setFilter('free')">Gratis</button>
         <button class="modal-toggle-btn ${filterPath == "premium" ? "active" : ""}" onclick="setFilter('premium')">Premium</button>
      </div>`;
}

function setFilter(newFilter) {
   filterPath = newFilter;
   setView("adminUserOverview");
}

function displayUsers() {
   let users = /*html*/ `<div class="admin-users">`;
   for (let user of model.data.users) {
      if (filterPath === "free" && user.isPremium) continue;
      if (filterPath === "premium" && !user.isPremium) continue;
      users += /*html*/ `
      <div 
         class="admin-user-row flex row align-center gap"
         onclick="model.viewState.adminUserOverview.selectedUser = '${user.id}'; openModal('adminViewUser')">
         <span class="admin-avatar-wrap">
            <img class="admin-avatar" src="${user.profilePictureSmall || user.profilePicture}" alt=""/>
            ${user.isPremium ? `<img class="admin-premium-icon" title="Premium" src="../../assets/images/premium/premium-ikon.svg"/>` : ""}
         </span>
         <span class="admin-user-name">${user.username}</span>
         <span class="admin-user-code">${user.code}</span>
         <img class="admin-chevron" src="../../assets/icons/chevron-right.svg"/>
      </div>`;
   }
   users += "</div>";
   return users;
}
