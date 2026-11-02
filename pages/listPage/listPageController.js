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
  else updateNoteAuthors(editor);
  getCurrentList().content = editor.innerHTML.replace(/\u200b|<mark><\/mark>/g, "");
  rememberNoteBlocks();
  updateNoteToolbar();
  renderNoteAuthors();
}

// går gjennom avsnittene og legger til den som skrev, slik at man bare blir forfatter
// der teksten faktisk endres, og ikke når man gjør noe fet, deler eller slår sammen linjer
function updateNoteAuthors(editor) {
  if (!getNoteBlock(editor) && editor.contains(window.getSelection().anchorNode)) {
    // tekst rett i notatet uten avsnitt rundt pakkes inn i et avsnitt først
    document.execCommand("formatBlock", false, "p");
  }

  const me = model.app.currentUserId;
  const removed = [];
  for (const [block, old] of noteBlocks) {
    if (!block.isConnected) removed.push(old);
  }

  const blocks = getNoteBlocks(editor);
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const text = getNoteBlockText(block);
    const old = noteBlocks.get(block);
    let authors;

    if (old) {
      if (old.text === text) continue;

      // delt med Enter: første del er uendret, resten ligger i neste avsnitt
      const next = blocks[i + 1];
      if (next && !noteBlocks.has(next) && old.text === text + getNoteBlockText(next)) continue;

      // slått sammen med et avsnitt som er borte: begge sine forfattere
      const merged = removed.find((removedBlock) => removedBlock.text !== "" && text === old.text + removedBlock.text);
      authors = joinAuthors(old.authors, merged ? merged.authors : [me]);
    } else {
      const previous = blocks[i - 1];
      const previousOld = previous && noteBlocks.get(previous);
      const replaced = removed.find((removedBlock) => removedBlock.text !== "" && removedBlock.text === text);

      if (replaced) {
        // samme tekst i nytt avsnitt, for eksempel gjort om til overskrift
        authors = replaced.authors;
      } else if (text && previousOld && previousOld.text === getNoteBlockText(previous) + text) {
        // andre del av et avsnitt som ble delt
        authors = previousOld.authors;
      } else {
        authors = text ? [me] : [];
      }
    }
    block.dataset.authors = authors.join(" ");
  }
}

function joinAuthors(authors, newAuthors) {
  return [...new Set([...authors, ...newAuthors])];
}

// tekst uten forfattere fra før regnes som eierens
function getNoteBlockAuthors(block) {
  const authors = block.dataset.authors;
  if (authors === undefined) return getNoteBlockText(block) ? [getCurrentList().ownerId] : [];
  return authors.split(" ").filter(Boolean);
}

// husker teksten og forfatterne i hvert avsnitt etter forrige endring
let noteBlocks = new Map();

function rememberNoteBlocks() {
  const editor = document.querySelector(".note-editor");
  noteBlocks = new Map();
  if (!editor) return;
  for (const block of getNoteBlocks(editor)) {
    noteBlocks.set(block, { text: getNoteBlockText(block), authors: getNoteBlockAuthors(block) });
  }
}

function getNoteBlocks(editor) {
  return [...editor.querySelectorAll(":scope > p, :scope > h3, :scope > div, li")];
}

function getNoteBlockText(block) {
  return block.textContent.replace(/\u200b/g, "");
}

function getNoteBlock(editor) {
  const selection = window.getSelection();
  if (!selection.rangeCount || !editor.contains(selection.anchorNode)) return null;
  let node = selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentElement : selection.anchorNode;
  while (node && node !== editor) {
    if (node.tagName === "LI" || (node.parentElement === editor && ["P", "H3", "DIV"].includes(node.tagName))) return node;
    node = node.parentElement;
  }
  return null;
}

function toggleNoteAuthors() {
  const lp = model.viewState.listPage;
  lp.showNoteAuthors = !lp.showNoteAuthors;
  setView();
}

// avatarene må flyttes når teksten brytes annerledes eller et bilde lastes inn
window.addEventListener("resize", () => {
  if (model.app.currentPage === "listPage") renderNoteAuthors();
});

document.addEventListener("load", (event) => {
  if (event.target.closest && event.target.closest(".note-editor")) renderNoteAuthors();
}, true);

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

// står man i markert tekst fjernes markeringen, ellers markeres det med sist brukte farge
function toggleNoteMark() {
  const mark = getNoteMark(window.getSelection().anchorNode);
  setNoteMark(mark ? "" : model.viewState.listPage.noteMarkColor);
}

// fargen der markøren står, eller sist brukte farge
function getCurrentNoteMarkColor() {
  const mark = getNoteMark(window.getSelection().anchorNode);
  return mark ? getNoteMarkColor(mark) : model.viewState.listPage.noteMarkColor;
}

function chooseNoteMarkColor(color) {
  model.viewState.listPage.noteMarkColor = color;
  setNoteMark(color);
  updateNoteToolbar();
}

function toggleNoteMarkMenu(button) {
  hideNoteImageMenu();
  const menu = document.querySelector(".note-mark-menu");
  menu.style.left = `${button.offsetLeft}px`;
  menu.hidden = !menu.hidden;

  const currentColor = getCurrentNoteMarkColor();
  for (const colorButton of menu.querySelectorAll(".note-mark-color")) {
    colorButton.classList.toggle("active", colorButton.dataset.color === currentColor);
  }
}

function hideNoteMarkMenu() {
  const menu = document.querySelector(".note-mark-menu");
  if (menu) menu.hidden = true;
}

function hideNoteMenus() {
  hideNoteImageMenu();
  hideNoteMarkMenu();
}

// gul er standard, så den lagres uten data-color
function getNoteMarkColor(mark) {
  return mark.dataset.color || "yellow";
}

function createNoteMark(color) {
  const mark = document.createElement("mark");
  if (color !== "yellow") mark.dataset.color = color;
  return mark;
}

function removeMarks(fragment) {
  for (const mark of fragment.querySelectorAll("mark")) mark.replaceWith(...mark.childNodes);
}

// flytter markøren ut av markeringen, så det man skriver videre ikke blir markert
function moveCaretAfter(mark) {
  const after = document.createTextNode("\u200b");
  mark.after(after);
  window.getSelection().collapse(after, 1);
}

// tom farge betyr at markeringen fjernes
function setNoteMark(color) {
  hideNoteMarkMenu();
  const selection = window.getSelection();
  const range = getNoteRange();
  if (!range) return;
  const mark = getNoteMark(selection.anchorNode);

  if (!color) {
    if (mark && selection.isCollapsed) {
      moveCaretAfter(mark);
    } else if (mark) {
      mark.replaceWith(...mark.childNodes);
    } else if (!selection.isCollapsed) {
      const fragment = range.extractContents();
      removeMarks(fragment);
      range.insertNode(fragment);
    }
  } else if (mark && !selection.isCollapsed) {
    if (color === "yellow") delete mark.dataset.color;
    else mark.dataset.color = color;
  } else if (selection.isCollapsed) {
    // starter å markere fra markøren
    if (mark && getNoteMarkColor(mark) === color) return;
    if (mark) moveCaretAfter(mark);
    const newMark = createNoteMark(color);
    newMark.textContent = "\u200b";
    selection.getRangeAt(0).insertNode(newMark);
    selection.collapse(newMark.firstChild, 1);
  } else {
    const newMark = createNoteMark(color);
    const fragment = range.extractContents();
    removeMarks(fragment);
    newMark.appendChild(fragment);
    range.insertNode(newMark);
    selection.selectAllChildren(newMark);
  }
  saveNoteFromEditor();
}

// markøren må stå inne i notatet, ellers havner markeringen et annet sted på siden
function getNoteRange() {
  const editor = document.querySelector(".note-editor");
  const selection = window.getSelection();
  if (!editor || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  return editor.contains(range.commonAncestorContainer) ? range : null;
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

  // markeringsknappen viser fargen der markøren står, ellers sist brukte farge
  const toolbarMark = document.querySelector(".note-tool[data-command='mark'] mark");
  const color = getCurrentNoteMarkColor();
  if (!toolbarMark) return;
  if (color === "yellow") delete toolbarMark.dataset.color;
  else toolbarMark.dataset.color = color;
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
