function setLandingFilter(filter) {
   model.viewState.landingPage.selectedFilter = filter;
   setView();
}

function getVisibleLists() {
   const filter = model.viewState.landingPage.selectedFilter;
   const userId = model.app.currentUserId;
   const visibleLists = [];

   for (const list of model.data.lists) {
      if (filter === "mine" && list.ownerId !== userId) {
         continue;
      }
      if (filter === "shared" && list.isShared === false) {
         continue;
      }
      visibleLists.push(list);
   }

   return visibleLists;
}

function getOwnerName(list) {
   if (list.ownerId === model.app.currentUserId) {
      return "Deg";
   }
   for (const user of model.data.users) {
      if (user.id === list.ownerId) {
         return user.username;
      }
   }
   return "Ukjent";
}

