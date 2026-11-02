function adminViewUser() {
   return /*html*/ `
   <div class="modal-overlay" onclick="closeModal()"> 
      <div class="modal-content admin-user-modal" onclick="event.stopPropagation()"> 
         <div class="flex column gap">
            <div class="flex row justify-end align-center">
               <img onclick="closeModal()" class="icon-size" src="${getIcon("x")}"/>
            </div>
            ${getUserData()}
         </div>
      </div>
   </div>
   `;
}

function getUserData() {
   let user = adminSelectedUser();
   const createdLists = model.data.lists
      .filter((list) => list.ownerId === user.id)
      .map((list) => list.id);
   const memberOf = model.data.lists
      .filter((list) => list.ownerId !== user.id && list.members.includes(user.id))
      .map((list) => list.id);
   return /*html*/ `
      <div class="settings-group">
         <div class="flex row gap align-center padding">
            <span class="admin-avatar-wrap">
               <img class="admin-avatar" src="${user.profilePictureSmall || user.profilePicture}" alt=""/>
               ${user.isPremium ? `<img class="admin-premium-icon" title="Premium" src="${getPremiumImage("premium-icon")}"/>` : ""}
            </span>
            <h1>${user.username}</h1>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Bruker ID</span><span>${user.id}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Delings kode</span><span>${user.code}</span>
         </div>
         <div class="flex column settings-row admin-data-row gap">
            <div class="flex row justify-between align-center gap">
               <span>Premium medlem</span>
               <span>${user.isPremium ? "Premium aktiv" : "Ikke premium"}</span>
            </div>
            <div class="flex justify-end">
               ${
                  user.isPremium
                     ? `<button class="edit-btn" onclick="adminToggleUserPremium('${user.id}')">Fjern premium</button>`
                     : `<button class="edit-btn edit-btn-save" onclick="adminToggleUserPremium('${user.id}')">Aktiver premium</button>`
               }
            </div>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Rolle</span><span>${user.role}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Dato opprettet</span><span>${user.createdAt}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Mottatte invitasjoner</span><span>${user.invitedTo.length}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Sendte invitasjoner</span><span>${user.sentInvites.length}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Opprettede lister</span><span>${createdLists.length}</span>
         </div>
         <div class="settings-row admin-data-row flex row justify-between gap">
            <span>Medlem av antall lister</span><span>${memberOf.length}</span>
         </div>
      </div>
      <button class="delete-user-btn" onclick="adminDeleteUser('${user.id}')">Slett bruker</button>
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

function adminDeleteUser(userId) {
   const ownedListIds = model.data.lists
      .filter((list) => list.ownerId === userId)
      .map((list) => list.id);
   model.data.lists = model.data.lists.filter((list) => list.ownerId !== userId);
   for (const list of model.data.lists) {
      removeUserFromList(list, userId);
   }
   model.data.users = model.data.users.filter((u) => u.id !== userId);
   for (const user of model.data.users) {
      user.invitedTo = user.invitedTo.filter((listId) => !ownedListIds.includes(listId));
      user.sentInvites = user.sentInvites.filter((listId) => !ownedListIds.includes(listId));
   }
   closeModal();
}
