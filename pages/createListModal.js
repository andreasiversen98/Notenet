function createListModal() {
  const state = model.viewState.createListModal;
  const canShare = getLoggedInUser().isPremium;

  const isShared = canShare && (state.isShared ?? false);
  const iconFile = isShared ? "users.svg" : "lock.svg";
  const placeholderText = isShared
    ? "Start en ny delt liste..."
    : "Start en ny privat liste...";

  return /*html*/ `
      <div class="modal-overlay" onclick="closeCreateListModal()"> 
         <div class="modal-content" onclick="event.stopPropagation()"> 
            <div class="flex row justify-end">
               <button class="btn-icon" onclick="closeCreateListModal()">
                  <img src="${getIcon("x")}" width="20" alt="Lukk">
               </button>
            </div>
            
            <div class="modal-toggle-container">
               <button class="modal-toggle-btn ${!isShared ? "active" : ""}" onclick="setCreateListShared(false)">Privat</button>
               <button class="modal-toggle-btn ${isShared ? "active" : ""}" onclick="setCreateListShared(true)" ${canShare ? "" : `disabled title="Delte lister krever premium"`}>
                  Delt
                  ${canShare ? "" : `<img class="premium-icon" src="${getPremiumImage("premium-icon")}" alt="Premium">`}
               </button>
            </div>

            <div class="input-box">
               <img src="../../assets/icons/${iconFile}" width="20" alt="Ikon">
               <input 
                  type="text" 
                  placeholder="${placeholderText}" 
                  value="${state.title}" 
                  oninput="setCreateListTitle(this.value)"
                  onkeydown="if(event.key === 'Enter') pushNewList()"
               >
               <button class="btn" onclick="pushNewList()">
                  <img src="${getIcon("square-plus")}" width="20" alt="Legg til">
               </button>
            </div>
         </div>
      </div>
   `;
}

function pushNewList() {
  const state = model.viewState.createListModal;
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
   model.viewState.createListModal.title = "";
   model.viewState.createListModal.isShared = null;
   closeModal();
}

function setCreateListTitle(value) {
  model.viewState.createListModal.title = value;
}

function setCreateListShared(isShared) {
  if (isShared && !getLoggedInUser().isPremium) return;
  model.viewState.createListModal.isShared = isShared;
  setView();
}
