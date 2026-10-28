function adminViewUser() {
   return `
   <div class="modal-overlay" onclick="closeModal()"> 
      <div class="modal-content notification-modal" onclick="event.stopPropagation()"> 
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h1>Varsler</h1>
               <img onclick="closeModal()" class="icon-size close-btn" src="../../assets/icons/x.svg"/>
            </div>
            <div class="flex column invite-list">
               ${getUserData()}
            </div>
         </div>
      </div>
   </div>


   `;
}

function getUserData() {
   let user = adminSelectedUser();
   return /*html*/ `
      <div class="flex column gap container padding">
         <div class="flex row list-bar padding">
            id: ${user.id}
         </div>
         <div class="flex row list-bar padding">
            username: ${user.username}
         </div>
         <div class="flex row list-bar padding">
            password: ${user.password}
         </div>
         <div class="flex row list-bar padding">
            profilePicture: ${user.profilePicture}
         </div>
         <div class="flex row list-bar padding">
            code: ${user.code}
         </div>
         <div class="flex row justify-between gap list-bar padding">
            isPremium: ${user.isPremium}
            ${user.isPremium ? `<button onclick="adminToggleUserPremium('${user.id}')">Remove premium</button>` : `<button onclick="adminToggleUserPremium('${user.id}')">Activate premium</button>`}
         </div>
         <div class="flex row list-bar padding">
            role: ${user.role}
         </div>
         <div class="flex row list-bar padding">
            invitedTo: ${user.invitedTo}
         </div>
         <div class="flex row list-bar padding">
            sentInvites: ${user.sentInvites}
         </div>
      </div>
   `;
}

function adminSelectedUser() {
   return model.data.users.find((u) => u.id === model.viewState.adminUserOverview.selectedUser);
}

function adminToggleUserPremium(userId) {
   const targetUser = model.data.users.find((u) => u.id === userId);
   if (targetUser) {
      targetUser.isPremium = !targetUser.isPremium;
      setView();
   }
}
