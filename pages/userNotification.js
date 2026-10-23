function userNotification() {
   return `
   <div class="flex column gap">
      <div class="flex row justify-between align-center padding">
         <h1>notifications</h1>
         <img onclick="setView(model.app.previousPage)" class="icon-size" src="../../src/icons/x.svg"/>
      </div>

      <div class="flex column container gap padding">
         ${displayInvites()}
      </div>
   </div>
   
   ${getBottomBar()}`;
}

function displayInvites() {
   let lists = fetchInvites()
   let getComponents = modifyListDataIntoComponents(lists)
   return getComponents
}

function modifyListDataIntoComponents(lists) {
   let temp = ""
   for (let list of lists) {
      temp += `
      <div onclick="togglePremium()" class="list-bar flex row justify-between padding border">
      <div class="flex column padding gap">
         <div class="bold">${fetchListOwnerName(list.ownerId)}</div>
         <div>${list.title}</div>
      </div>
      <div class="flex row align-center padding gap2">
         <img onclick="acceptInviteToList()" class="icon-size2" src="../../src/icons/check.svg"/>
         <img onclick="declineInviteToList()" class="icon-size2" src="../../src/icons/x.svg"/>
      </div>
   </div>`
   }

   return temp
}

function fetchListOwnerName(id) {
   const owner = model.data.users.find(user => user.id === id);
   return owner.username
}

function fetchInvites() {
   const invitedListIds = loggedInUser.invitedTo;
   const invitedLists = model.data.lists.filter((list) => invitedListIds.includes(list.id));

   console.log(invitedLists);
   return invitedLists;
}

function acceptInviteToList() {}

function declineInviteToList() {}
