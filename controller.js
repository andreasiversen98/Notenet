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

  console.table({
    Source: "controller.js",
    Function: "setView(selectedPage)",
    "Previous Page": model.app.previousPage,
    "Current Page": model.app.currentPage,
  });
}
setView("loginPage");
// setView("userProfile")
openModal("notifications");
// setView("userNotification");
