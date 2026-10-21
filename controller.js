const loggedInUser = model.data.users.find(user => user.id === model.app.currentUserId);
console.log("controller.js - loggedInUser",loggedInUser)

function setView(selectedPage) {
   if (selectedPage) model.app.currentPage = selectedPage
   const currentView = router[model.app.currentPage]
   updateView(currentView)
}
setView()

