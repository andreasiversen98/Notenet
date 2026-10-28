createTestUsers();

function getLoggedInUser() {
   return model.data.users.find((u) => u.id === model.app.currentUserId);
}
console.log("controller.js - loggedInUser", getLoggedInUser());

function setView(selectedPage) {
   if (selectedPage && selectedPage !== model.app.currentPage) {
      model.app.previousPage = model.app.currentPage;
      model.app.currentPage = selectedPage;
   }
   const currentView = router[model.app.currentPage];
   updateView(currentView);

   // pagination check
   //   console.table({
   //     Source: "controller.js",
   //     Function: "setView(selectedPage)",
   //     "Previous Page": model.app.previousPage,
   //     "Current Page": model.app.currentPage,
   //   });
}

function toggleDarkMode() {
   model.app.darkMode = !model.app.darkMode;
   setView();
}

// model.viewState.adminUserOverview.selectedUser = 'test55'
setView("loginPage");
// setView("userProfile")
// setView("adminProfile")
// setView("adminUserOverview")
// setView("adminViewUser")
// openModal("notifications");
// setView("userNotification");

function createTestUsers() {
   let testUserAmount = 100;
   for (let i = 0; i < testUserAmount; i++) {
      model.data.users.push({
         id: `test${i}`,
         username: `test${i}`,
         password: "123",
         profilePicture: "../../assets/images/default-avatar.svg",
         code: `test${i}`,
         isPremium: i > testUserAmount / 2 ? true : false,
         role: "user",
         invitedTo: ["l2", "l3"],
         sentInvites: ["l1"],
      });
   }
}

