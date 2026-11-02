function getCurrentList() {
  const listId = model.viewState.listPage.selectedListId || "l1";
  return model.data.lists.find(list => list.id === listId);
}

function openList(listId) {
  const lp = model.viewState.listPage;
  lp.selectedListId = listId;
  lp.editingItemId = null;
  lp.editingItemTitle = "";
  lp.newItemTitle = "";
  lp.showMembers = false;
  lp.inviteCode = "";
  lp.inviteMessage = "";
  setView("listPage");
}

function toggleMembers() {
  const lp = model.viewState.listPage;
  lp.showMembers = !lp.showMembers;
  setView();
}

function toggleTodo() {
  const lp = model.viewState.listPage;
  lp.showTodo = !lp.showTodo;
  setView();
}

function toggleCompleted() {
  const lp = model.viewState.listPage;
  lp.showCompleted = !lp.showCompleted;
  setView();
}

function showCompletedTasks() {
  model.viewState.listPage.showCompleted = true;
  setView();
  document.getElementById("completed-tasks").scrollIntoView({ behavior: "smooth" });
}

function canRemoveMember(list, user) {
  const me = getLoggedInUser();
  const isOwner = list.ownerId === me.id;
  const isAdmin = me.role === "admin";
  return (isOwner || isAdmin) && user.id !== list.ownerId;
}

function canAddMember(list) {
  const me = getLoggedInUser();
  return list.ownerId === me.id || me.role === "admin";
}

function openInviteModal() {
  const lp = model.viewState.listPage;
  lp.inviteCode = "";
  lp.inviteMessage = "";
  openModal("invite");
  document.querySelector(".invite-input").focus();
}

function closeInviteModal() {
  const lp = model.viewState.listPage;
  lp.inviteCode = "";
  lp.inviteMessage = "";
  closeModal();
}

function inviteMember() {
  const lp = model.viewState.listPage;
  const list = getCurrentList();
  if (!list || !canAddMember(list)) return;

  const code = lp.inviteCode.trim().toUpperCase();
  if (code === "") return;
  const user = model.data.users.find((u) => u.code === code);

  if (!user) {
    lp.inviteMessage = "Fant ingen bruker med den vennekoden";
  } else if (list.members.includes(user.id)) {
    lp.inviteMessage = `${user.username} er allerede medlem`;
  } else if (user.invitedTo.includes(list.id)) {
    lp.inviteMessage = `${user.username} er allerede invitert`;
  } else {
    user.invitedTo.push(list.id);
    lp.inviteMessage = `Invitasjon sendt til ${user.username}`;
    lp.inviteCode = "";
  }
  setView();
  document.querySelector(".invite-input").focus();
}

function removeMember(userId) {
  const list = getCurrentList();
  if (!list || !canRemoveMember(list, getUserById(userId))) return;
  removeUserFromList(list, userId);
  setView();
}

function removeUserFromList(list, userId) {
  list.members = list.members.filter((memberId) => memberId !== userId);
  for (const item of list.items) {
    if (item.addedBy === userId) item.addedBy = list.ownerId;
  }
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
  model.viewState.listPage.animatedItemId = newItemId;
  setView();
  model.viewState.listPage.animatedItemId = null;
}

function toggleItemCompletion(itemId) {
  const lp = model.viewState.listPage;
  if (lp.completingItemId) return;

  const item = getCurrentList()?.items.find((item) => item.id === itemId);
  if (!item) return;

  if (!item.isCompleted && shouldAnimate()) {
    lp.completingItemId = itemId;
    setView();
    setTimeout(() => {
      lp.completingItemId = null;
      changeItemCompletion(itemId);
    }, 500);
    return;
  }

  changeItemCompletion(itemId);
}

function shouldAnimate() {
  return model.app.theme !== "retro" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function changeItemCompletion(itemId) {
  const currentList = getCurrentList();
  if (!currentList) return;

  for (let i = 0; i < currentList.items.length; i++) {
    if (currentList.items[i].id === itemId) {
      currentList.items[i].isCompleted = !currentList.items[i].isCompleted;
      currentList.items[i].completedBy = currentList.items[i].isCompleted ? model.app.currentUserId : null;
      
      if (currentList.items[i].isCompleted) {
        currentList.completedItems += 1;
      } else {
        currentList.completedItems -= 1;
      }
      break;
    }
  }

  model.viewState.listPage.animatedItemId = itemId;
  setView();
  model.viewState.listPage.animatedItemId = null;
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
  if (!isShared && list.members.length > 1) {
    openModal("makePrivate");
    return;
  }
  toggleListVisibility();
}

function confirmMakePrivate() {
  model.app.openModal = null;
  toggleListVisibility();
}

// notatet lagres mens man skriver uten setView, ellers mister man markøren
function updateNoteContent(editor) {
  if (editor.textContent.replace(/\u200b/g, "").trim() === "" && !editor.querySelector("img")) editor.innerHTML = "";
  getCurrentList().content = editor.innerHTML.replace(/\u200b|<mark><\/mark>/g, "");
  updateNoteToolbar();
}

function saveNoteFromEditor() {
  const editor = document.querySelector(".note-editor");
  if (editor) updateNoteContent(editor);
}

function formatNote(command) {
  document.execCommand(command);
  saveNoteFromEditor();
}

function toggleNoteHeading() {
  const isHeading = document.queryCommandValue("formatBlock") === "h3";
  document.execCommand("formatBlock", false, isHeading ? "p" : "h3");
  saveNoteFromEditor();
}

function toggleNoteMark() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  const mark = getNoteMark(selection.anchorNode);

  if (mark && !selection.isCollapsed) {
    mark.replaceWith(...mark.childNodes);
  } else if (mark) {
    // slutter å markere, så det man skriver videre blir vanlig tekst
    const after = document.createTextNode("\u200b");
    mark.after(after);
    selection.collapse(after, 1);
  } else if (selection.isCollapsed) {
    // starter å markere fra markøren
    const newMark = document.createElement("mark");
    newMark.textContent = "\u200b";
    range.insertNode(newMark);
    selection.collapse(newMark.firstChild, 1);
  } else {
    const newMark = document.createElement("mark");
    newMark.appendChild(range.extractContents());
    range.insertNode(newMark);
    selection.selectAllChildren(newMark);
  }
  saveNoteFromEditor();
}

function getNoteMark(node) {
  const element = node && node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  return element && element.closest ? element.closest(".note-editor mark") : null;
}

// viser hvilke knapper som er aktive der markøren står
function updateNoteToolbar() {
  const selection = window.getSelection();
  const states = {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    underline: document.queryCommandState("underline"),
    heading: document.queryCommandValue("formatBlock") === "h3",
    insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    mark: !!getNoteMark(selection.anchorNode),
  };
  for (const button of document.querySelectorAll(".note-tool[data-command]")) {
    button.classList.toggle("active", states[button.dataset.command]);
  }
}

// lim inn som vanlig tekst så man ikke får med stil fra andre nettsider
function pasteNoteText(event) {
  event.preventDefault();
  document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
}

// husker hvor markøren var før man åpner filvelgeren
let noteSelection = null;

function saveNoteSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount) noteSelection = selection.getRangeAt(0);
}

function insertNoteImage(input) {
  const file = input.files[0];
  input.value = "";
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => makeNoteImage(reader.result, (imageUrl) => {
    const editor = document.querySelector(".note-editor");
    editor.focus();
    const selection = window.getSelection();
    selection.removeAllRanges();
    if (noteSelection && editor.contains(noteSelection.startContainer)) {
      selection.addRange(noteSelection);
    } else {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.addRange(range);
    }
    document.execCommand("insertImage", false, imageUrl);
    saveNoteFromEditor();
  });
  reader.readAsDataURL(file);
}

// trykker man på et bilde dukker det opp en meny for størrelse
let noteImage = null;

function selectNoteImage(event) {
  if (event.target.tagName !== "IMG") {
    hideNoteImageMenu();
    return;
  }
  noteImage = event.target;

  // markøren havner rett etter bildet
  window.getSelection().collapse(noteImage.parentNode, [...noteImage.parentNode.childNodes].indexOf(noteImage) + 1);
  showNoteImageMenu();
}

function showNoteImageMenu() {
  const menu = document.querySelector(".note-image-menu");
  menu.style.top = `${noteImage.offsetTop + 8}px`;
  menu.style.left = `${noteImage.offsetLeft + 8}px`;
  menu.hidden = false;

  const size = noteImage.dataset.size || "full";
  for (const button of menu.querySelectorAll("button")) {
    button.classList.toggle("active", button.dataset.size === size);
  }
}

function hideNoteImageMenu() {
  noteImage = null;
  const menu = document.querySelector(".note-image-menu");
  if (menu) menu.hidden = true;
}

function setNoteImageSize(size) {
  if (!noteImage) return;
  if (size === "full") noteImage.removeAttribute("data-size");
  else noteImage.dataset.size = size;
  saveNoteFromEditor();
  showNoteImageMenu();
}

function deleteNoteImage() {
  if (!noteImage) return;
  noteImage.remove();
  hideNoteImageMenu();
  saveNoteFromEditor();
}

// gjør bildet mindre så notatet ikke blir for tungt
function makeNoteImage(imageUrl, callback) {
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    const scale = Math.min(1, 1000 / img.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    callback(canvas.toDataURL("image/jpeg", 0.85));
  };
}
