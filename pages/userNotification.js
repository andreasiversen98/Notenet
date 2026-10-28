function userNotification() {
   return `
   <div class="modal-overlay" onclick="closeModal()"> 
      <div class="modal-content notification-modal" onclick="event.stopPropagation()"> 
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h1>Varsler</h1>
               <img onclick="closeModal()" class="icon-size close-btn" src="../../src/icons/x.svg"/>
            </div>
            <div class="flex column invite-list">
               ${displayInvites()}
            </div>
         </div>
      </div>
   </div>`;
}

function displayInvites() {
   let lists = fetchInvites();
   let getComponents = modifyListDataIntoComponents(lists);
   return getComponents || `<p class="empty-text">Ingen nye varsler</p>`;
}

function modifyListDataIntoComponents(lists) {
   let temp = "";
   for (let list of lists) {
      temp += `
      <div class="invite-row flex row justify-between align-center">
         <div class="flex column">
            <div class="invite-owner">${fetchListOwnerName(list.ownerId)}</div>
            <div class="invite-title">${list.title}</div>
         </div>
         <div class="flex row align-center invite-actions">
            <img onclick="acceptInviteToList('${list.id}')" class="accept-btn" title="Godta" src="../../src/icons/check-white.svg"/>
            <img onclick="declineInviteToList('${list.id}')" class="decline-btn" title="Avslå" src="../../src/icons/x.svg"/>
         </div>
      </div>`;
   }
   return temp;
}

function fetchListOwnerName(id) {
   const owner = model.data.users.find((user) => user.id === id);
   return owner.username;
}

function fetchInvites() {
   const invitedListIds = getLoggedInUser().invitedTo;
   const invitedLists = model.data.lists.filter((list) => invitedListIds.includes(list.id));
   return invitedLists;
}

function acceptInviteToList(listID) {
   console.log(listID);
   let getList = model.data.lists.find((list) => (list.id === listID));
   getList.members.push(model.app.currentUserId);
   getLoggedInUser().invitedTo = getLoggedInUser().invitedTo.filter((item) => item !== listID);
   openModal("notifications");
}

function declineInviteToList(listID) {
   console.log(listID);
   getLoggedInUser().invitedTo = getLoggedInUser().invitedTo.filter((item) => item !== listID);
   openModal("notifications");
}
