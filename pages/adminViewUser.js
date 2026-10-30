function adminViewUser() {
   return /*html*/ `
   <div class="modal-overlay" onclick="closeModal()"> 
      <div class="modal-content admin-user-modal" onclick="event.stopPropagation()"> 
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h2>Brukerinfo</h2>
               <img onclick="closeModal()" class="icon-size" src="../../assets/icons/x.svg"/>
            </div>
            ${getUserData()}
         </div>
      </div>
   </div>
   `;
}

function getUserData() {
   let user = adminSelectedUser();
   return /*html*/ `
      <div class="settings-group">
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>id</span><span>${user.id}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>username</span><span>${user.username}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>password</span><span>${user.password}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>profilePicture</span><span>${user.profilePicture}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>code</span><span>${user.code}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between align-center gap">
            <span>isPremium</span>
            <div class="flex row align-center gap">
               <span>${user.isPremium}</span>
               ${user.isPremium
                  ? `<button class="edit-btn" onclick="adminToggleUserPremium('${user.id}')">Remove premium</button>`
                  : `<button class="edit-btn edit-btn-save" onclick="adminToggleUserPremium('${user.id}')">Activate premium</button>`}
            </div>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>role</span><span>${user.role}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>createdAt</span><span>${user.createdAt}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>invitedTo</span><span>${user.invitedTo}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>sentInvites</span><span>${user.sentInvites}</span>
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
