function togglePremium() {
   const user = getLoggedInUser();
   if (user.isPremium && getSharedListsOwnedBy(user).length > 0) {
      openModal("cancelPremium");
      return;
   }
   user.isPremium = !user.isPremium;
   setView();
}

function confirmCancelPremium() {
   const user = getLoggedInUser();
   user.isPremium = false;
   makeSharedListsPrivate(user);
   closeModal();
}

function getSharedListsOwnedBy(user) {
   return model.data.lists.filter((list) => list.ownerId === user.id && list.isShared);
}

function makeSharedListsPrivate(user) {
   for (const list of getSharedListsOwnedBy(user)) {
      list.isShared = false;
      list.members = [user.id];

      for (const otherUser of model.data.users) {
         otherUser.invitedTo = otherUser.invitedTo.filter((listId) => listId !== list.id);
      }
   }
}
