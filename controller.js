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

setView("loginPage");
// setView("userProfile")
// setView("adminProfile")
//setView("adminUserOverview")
// openModal("notifications");
// setView("userNotification");

function createTestUsers() {
   for (let i = 0; i < 100; i++) {
      model.data.users.push({
         id: `test${i}`,
         username: `test${i}`,
         password: "123",
         profilePicture: "../../src/images/default-avatar.svg",
         code: `test${i}`,
         isPremium: true,
         role: "user",
         invitedTo: ["l2", "l3"],
         sentInvites: ["l1"],
      });
   }
}
createTestUsers();
