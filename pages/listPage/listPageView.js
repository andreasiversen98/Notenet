function listPageView() {
  const list = getCurrentList();
  if (!list) return "";

  let uncompletedHtml = "";
  let completedHtml = "";

  for (let i = 0; i < list.items.length; i++) {
    const item = list.items[i];

    const checked = item.isCompleted ? "checked" : "";

    const sharedIcon =
      list.isShared && !item.isCompleted
        ? '<img src="../../src/icons/user-round.svg" width="14" alt="User">'
        : "";

    let textHtml = `<span>${item.text}</span>`;
    let editBtnHtml = `<button class="edit-btn" onclick="editItem('${item.id}')">rediger</button>`;

    if (model.viewState.listPage.editingItemId === item.id) {
      textHtml = `
        <input
          class="edit-input"
          type="text"
          value="${model.viewState.listPage.editingItemTitle}"
          oninput="model.viewState.listPage.editingItemTitle = this.value"
          onkeydown="if(event.key === 'Enter') saveEditItem()"
        >
      `;
      editBtnHtml = `
        <button class="edit-btn" onclick="saveEditItem()">lagre</button>
        <button class="edit-btn" onclick="cancelEditItem()">avbryt</button>
      `;
    }

    if (item.isCompleted) editBtnHtml = "";

    const itemHtml = /*html*/ `
      <li>
        <input type="checkbox" ${checked} onchange="toggleItemCompletion('${item.id}')">
        <button class="btn btn-icon" onclick="deleteItem('${item.id}')">
          <img src="../../src/icons/trash.svg" width="14" alt="Delete">
        </button>
        ${textHtml}
        ${editBtnHtml}
        ${sharedIcon}
      </li>
    `;

    if (item.isCompleted) completedHtml += itemHtml;
    else uncompletedHtml += itemHtml;
  }

  const visibilityHtml = canChangeVisibility(list)
    ? /*html*/ `
        <div class="visibility-switch">
          <button class="visibility-option ${!list.isShared ? "active" : ""}" onclick="setListVisibility(false)">
            <img src="../../src/icons/lock.svg" width="14" alt="">
            Privat
          </button>
          <button class="visibility-option ${list.isShared ? "active" : ""}" onclick="setListVisibility(true)">
            <img src="../../src/icons/globe.svg" width="14" alt="">
            Delt
          </button>
        </div>
      `
    : /*html*/ `
        <span class="visibility-label">
          <img src="../../src/icons/${list.isShared ? "globe.svg" : "lock.svg"}" width="14" alt="">
          ${list.isShared ? "Delt" : "Privat"}
        </span>
      `;

  const sharedHtml = list.isShared
    ? /*html*/ `
        <div class="share-meta">
          <span class="member-count">${list.members ? list.members.length : 0} members</span>
          <button class="btn invite-btn">
            <img src="../../src/icons/user-plus.svg" width="14" alt="">
            invite
          </button>
        </div>
      `
    : "";

  return /*html*/ `
    ${headerComponent()}

    <div class="list-container">
      <div class="list-title-row">
        <div>
          <h2>${list.title}</h2>
          <span class="counter">${list.completedItems} / ${list.totalItems}</span>
        </div>
      </div>

      <div class="list-toolbar">
        ${visibilityHtml}
        ${sharedHtml}
      </div>

      <div class="input-box">
        <input
          type="text"
          placeholder="Add new item..."
          value="${model.viewState.listPage.newItemTitle}"
          oninput="model.viewState.listPage.newItemTitle = this.value"
          onkeydown="if(event.key === 'Enter') pushNewItem()"
        />
        <button class="btn" onclick="pushNewItem()">
          <img src="../../src/icons/square-plus.svg" width="16" alt="Add">
        </button>
      </div>

      <ul>${uncompletedHtml}</ul>

      <h3>Completed tasks</h3>
      <ul>${completedHtml}</ul>
    </div>

    ${getBottomBar()}
  `;
}