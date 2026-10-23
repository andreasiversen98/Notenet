function pushNewItem() {
  const listId = model.viewState.listPage.selectedListId;
  const itemTitle = model.viewState.listPage.newItemTitle;

  if (!itemTitle) return;

  let currentList = null;
  for (let i = 0; i < model.data.lists.length; i++) {
    if (model.data.lists[i].id === listId) {
      currentList = model.data.lists[i];
      break;
    }
  }

  if (!currentList) return;

  let highestIdNumber = 0;
  for (const item of currentList.items) {
    if (item.id && item.id.startsWith("i")) {
      const number = Number(item.id.slice(1));
      if (number > highestIdNumber) highestIdNumber = number;
    }
  }
  const newItemId = "i" + (highestIdNumber + 1);

  currentList.items.push({
    id: newItemId,
    text: itemTitle,
    isCompleted: false,
  });

  currentList.totalItems += 1;

  model.viewState.listPage.newItemTitle = "";
  setView();
}
