function setView(selectedPage) {
   if (selectedPage) model.app.currentPage = selectedPage
   const currentView = router[model.app.currentPage]
   updateView(currentView)
}
setView()

function togglePremium() {
   userData.isPremium = !userData.isPremium;
   setView()
}