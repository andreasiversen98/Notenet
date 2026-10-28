function pushNewList() {
  const state = model.viewState.landingPage.createList;
  if (!state.title) return;

  const isShared = getLoggedInUser().isPremium && state.isShared === true;

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
    isShared: isShared,
    completedItems: 0,
    totalItems: 0,
    members: isShared ? [model.app.currentUserId] : [],
    items: [],
  });

  state.title = "";
  state.isShared = null;
  model.app.openModal = null;
  model.viewState.listPage.selectedListId = newId;
  setView("listPage");
}

function closeCreateListModal() {
   model.viewState.landingPage.createList.title = "";
   model.viewState.landingPage.createList.isShared = null;
   closeModal();
}

function setCreateListTitle(value) {
  model.viewState.landingPage.createList.title = value;
}

function setCreateListShared(isShared) {
  if (isShared && !getLoggedInUser().isPremium) return;
  model.viewState.landingPage.createList.isShared = isShared;
  setView();
}
