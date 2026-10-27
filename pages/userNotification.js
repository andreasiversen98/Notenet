function userNotification() {
   return `
   <div class="modal-overlay" onclick="closeModal()"> 
      <div class="modal-content" onclick="event.stopPropagation()"> 
         <div class="flex column gap">
            <div class="flex row justify-between align-center padding">
               <h1>notifications</h1>
               <img onclick="closeModal()" class="icon-size" src="../../src/icons/x.svg"/>
            </div>
            <div class="flex column container gap padding">
               ${displayInvites()}
            </div>
         </div>
      </div>
   </div>`;
}

function displayInvites() {
   let lists = fetchInvites();
   let getComponents = modifyListDataIntoComponents(lists);
   return getComponents;
}

function modifyListDataIntoComponents(lists) {
   let temp = "";
   for (let list of lists) {
      temp += `
      <div onclick="" class="list-bar flex row justify-between padding border">
         <div class="flex column padding gap">
            <div class="bold">${fetchListOwnerName(list.ownerId)}</div>
            <div>${list.title}</div>
         </div>
         <div class="flex row align-center padding gap2">
            <img onclick="acceptInviteToList('${list.id}')" class="icon-size2" src="../../src/icons/check.svg"/>
            <img onclick="declineInviteToList('${list.id}')" class="icon-size2" src="../../src/icons/x.svg"/>
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
