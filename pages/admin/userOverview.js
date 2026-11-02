function adminUserOverview() {
   return /*html*/ `
      ${adminHeaderComponent()}
      <div class="admin-container flex column gap">
         <div class="flex row justify-between align-center">
            <h2 class="admin-title">Brukere</h2>
            ${filterUsers()}
         </div>
         ${drawUserSearch()}
         <span class="admin-count">${filteredUserCount()} brukere</span>
         ${displayUsers()}
         ${displayPagination()}
      </div>
      ${getBottomBar()}`;
}

function displayUsers() {
   let users = /*html*/ `<div class="admin-users">`;
   for (let user of getPageUsers()) {
      users += /*html*/ `
      <div
         class="admin-user-row flex row align-center gap"
         onclick="model.viewState.adminUserOverview.selectedUser = '${user.id}'; openModal('adminViewUser')">
         <span class="admin-avatar-wrap">
            <img class="admin-avatar" src="${user.profilePictureSmall || user.profilePicture}" alt=""/>
            ${user.isPremium ? `<img class="admin-premium-icon" title="Premium" src="${getPremiumImage("premium-icon")}"/>` : ""}
         </span>
         <span class="admin-user-name">${user.username}</span>
         <span class="admin-user-code">${user.code}</span>
         <img class="admin-chevron" src="${getIcon("chevron-right")}"/>
      </div>`;
   }
   users += "</div>";
   return users;
}
