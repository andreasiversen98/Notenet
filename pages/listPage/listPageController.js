function getCurrentList() {
  const listId = model.viewState.listPage.selectedListId || "l1";
  return model.data.lists.find(list => list.id === listId);
}

function pushNewItem() {
  const itemTitle = model.viewState.listPage.newItemTitle;
  if (!itemTitle) return;

  const currentList = getCurrentList();
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

function toggleItemCompletion(itemId) {
  const currentList = getCurrentList();
  if (!currentList) return;

  for (let i = 0; i < currentList.items.length; i++) {
    if (currentList.items[i].id === itemId) {
      currentList.items[i].isCompleted = !currentList.items[i].isCompleted;
      
      if (currentList.items[i].isCompleted) {
        currentList.completedItems += 1;
      } else {
        currentList.completedItems -= 1;
      }
      break;
    }
  }
  setView();
}

function deleteItem(itemId) {
  const currentList = getCurrentList();
  if (!currentList) return;

  for (let i = 0; i < currentList.items.length; i++) {
    if (currentList.items[i].id === itemId) {
      if (currentList.items[i].isCompleted) {
        currentList.completedItems -= 1;
      }
      
      currentList.totalItems -= 1;
      currentList.items.splice(i, 1);
      break;
    }
  }

  setView();
}