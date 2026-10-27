function getCurrentList() {
  const listId = model.viewState.listPage.selectedListId || "l3";
  return model.data.lists.find(list => list.id === listId);
}

function openList(listId) {
  const lp = model.viewState.listPage;
  lp.selectedListId = listId;
  lp.editingItemId = null;
  lp.editingItemTitle = "";
  lp.newItemTitle = "";
  lp.showMembers = false;
  setView("listPage");
}

function toggleMembers() {
  const lp = model.viewState.listPage;
  lp.showMembers = !lp.showMembers;
  setView();
}

function getListMembers(list) {
  const members = [];
  for (const memberId of list.members || []) {
    const user = model.data.users.find((u) => u.id === memberId);
    if (user) members.push(user);
  }
  return members;
}

function getUserById(userId) {
  return model.data.users.find((u) => u.id === userId);
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
    addedBy: model.app.currentUserId,
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

function editItem(itemId) {
  const currentList = getCurrentList();
  if (!currentList) return;

  for (let i = 0; i < currentList.items.length; i++) {
    if (currentList.items[i].id === itemId) {
      model.viewState.listPage.editingItemId = itemId;
      model.viewState.listPage.editingItemTitle = currentList.items[i].text;
      break;
    }
  }

  setView();
  document.querySelector(".edit-input").focus();
}

function saveEditItem() {
  const currentList = getCurrentList();
  if (!currentList) return;

  const newText = model.viewState.listPage.editingItemTitle;

  for (let i = 0; i < currentList.items.length; i++) {
    if (currentList.items[i].id === model.viewState.listPage.editingItemId) {
      if (newText) currentList.items[i].text = newText;
      break;
    }
  }

  model.viewState.listPage.editingItemId = null;
  model.viewState.listPage.editingItemTitle = "";
  setView();
}

function cancelEditItem() {
  model.viewState.listPage.editingItemId = null;
  setView();
}

function canChangeVisibility(list) {
  const user = getLoggedInUser();
  return user.isPremium && list.ownerId === user.id;
}

function toggleListVisibility() {
  const list = getCurrentList();
  if (!list || !canChangeVisibility(list)) return;

  list.isShared = !list.isShared;

  if (list.isShared) {
    if (!list.members) list.members = [];
    if (!list.members.includes(list.ownerId)) list.members.push(list.ownerId);
  } else {
    list.members = [list.ownerId];
    model.viewState.listPage.showMembers = false;
  }

  setView();
}

function setListVisibility(isShared) {
  const list = getCurrentList();
  if (!list || list.isShared === isShared) return;
  toggleListVisibility();
}