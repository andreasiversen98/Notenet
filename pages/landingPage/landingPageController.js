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
  setView();
}
