function setLandingFilter(filter) {
   model.viewState.landingPage.selectedFilter = filter;
   setView();
}

function setLandingSearch(value) {
   model.viewState.landingPage.search = value;
   setView();

   const input = document.getElementById("landing-search");
   input.focus();
   input.selectionStart = input.value.length;
   input.selectionEnd = input.value.length;
}


function getVisibleLists() {
   const filter = model.viewState.landingPage.selectedFilter;
   const search = model.viewState.landingPage.search;
   const userId = model.app.currentUserId;
   const visibleLists = [];

   for (const list of model.data.lists) {
      if (list.ownerId !== userId && !list.members.includes(userId)) {
         continue;
      }
      if (filter === "private" && list.ownerId !== userId) {
         continue;
      }
      if (filter === "private" && list.isShared && getLoggedInUser().role !== "admin") {
         continue;
      }
      if (filter === "shared" && list.isShared === false) {
         continue;
      }
      if (filter === "favorites" && !isFavorite(list.id)) {
         continue;
      }
      if (list.title.toLowerCase().includes(search.toLowerCase()) === false) {
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

function hasAnyLists() {
   const userId = model.app.currentUserId;
   return model.data.lists.some((list) => list.ownerId === userId || list.members.includes(userId));
}
