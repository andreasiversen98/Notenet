function pushNewList() {
  const state = model.viewState.landingPage.createList;
  if (!state.title) return;

  let highestIdNumber = 0;
  for (const list of model.data.lists) {
    if (list.id && list.id.startsWith("l")) {
      const number = Number(list.id.slice(1));
      if (number > highestIdNumber) highestIdNumber = number;
    }
  }

  const newId = "l" + (highestIdNumber + 1);

  model.data.lists.push({
    id: newId,
    title: state.title,
    ownerId: model.app.currentUserId,
    isShared: state.isShared ?? false,
    completedItems: 0,
    totalItems: 0,
    members: state.isShared ? [model.app.currentUserId] : [],
    items: [],
  });

  state.title = "";
  state.isShared = null;
  state.isOpen = false;       
  setView('userProfile');     
}

function openCreateListModal() {
  model.viewState.landingPage.createList.isOpen = true;
  setView('userProfile');     
}

function closeCreateListModal() {
  model.viewState.landingPage.createList.isOpen = false;
  model.viewState.landingPage.createList.title = "";
  model.viewState.landingPage.createList.isShared = null;
  setView('userProfile');
}

function setCreateListTitle(value) {
  model.viewState.landingPage.createList.title = value;
}

function setCreateListShared(isShared) {
  model.viewState.landingPage.createList.isShared = isShared;
  setView(); 
}