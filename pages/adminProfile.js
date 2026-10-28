function adminProfile() {
   return /*html*/ `
   ${adminHeaderComponent()}
   ${adminProfileLayout()}
   ${getBottomBar()}
   `;
}

function adminProfileLayout() {
   return /*html*/ `
   <div class="flex row gap justify-between">
      <div onclick="setView('adminUserOverview')" class="flex column gap border padding border-round">
         <h3>brukere</h3>
         ${userCount()}
      </div>
      <div class="flex column gap border padding border-round">
         <h3>lister</h3>
         ${listCount()}
      </div>
      <div class="flex column gap border padding border-round">
         <h3>premium</h3>
         ${premiumCount()}
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
