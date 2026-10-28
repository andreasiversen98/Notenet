function adminProfile() {
   return /*html*/ `
   ${adminHeaderComponent()}
   ${adminProfileLayout()}
   ${getBottomBar()}
   `;
}

function adminProfileLayout() {
   return /*html*/ `
   <div class="admin-container flex column gap">
      <h2 class="admin-title">Oversikt</h2>
      <div class="admin-stats">
         <div onclick="setView('adminUserOverview')" class="admin-stat admin-stat-link">
            <span class="admin-stat-label">Brukere</span>
            <span class="admin-stat-number">${userCount()}</span>
            <span class="admin-stat-sub">Se alle <img src="../../assets/icons/chevron-right.svg"/></span>
         </div>
         <div class="admin-stat">
            <span class="admin-stat-label">Lister</span>
            <span class="admin-stat-number">${listCount()}</span>
         </div>
         <div class="admin-stat">
            <span class="admin-stat-label">Premium</span>
            <span class="admin-stat-number">${premiumCount()}</span>
         </div>
      </div>
   </div>`;
}

function userCount() {
   return model.data.users.length;
}

function listCount() {
   return model.data.lists.length;
}

function premiumCount() {
   let premiumCount = 0;

   for (const user of model.data.users) {
      if (user.isPremium) {
         premiumCount++;
      }
   }
   return premiumCount
}
