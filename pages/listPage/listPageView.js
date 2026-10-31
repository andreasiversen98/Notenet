function listPageView() {
  const list = getCurrentList();
  if (!list) return "";

  let uncompletedHtml = "";
  let completedHtml = "";
  let uncompletedCount = 0;
  let completedCount = 0;

  for (let i = 0; i < list.items.length; i++) {
    const item = list.items[i];

    const checked = item.isCompleted ? "checked" : "";

    let sharedIcon = "";
    if (list.isShared && !item.isCompleted) {
      const addedBy = getUserById(item.addedBy);
      sharedIcon = addedBy
        ? /*html*/ `<img src="${addedBy.profilePictureSmall || addedBy.profilePicture}" class="item-avatar" title="${addedBy.username}" alt="${addedBy.username}">`
        : '<img src="../../assets/icons/user-round.svg" width="14" alt="Bruker">';
    }

    let textHtml = /*html*/ `<span>${item.text}</span>`;
    let editBtnHtml = /*html*/ `<button class="edit-btn" onclick="editItem('${item.id}')"><img src="${getIcon("pencil")}" alt="">Rediger</button>`;

    if (model.viewState.listPage.editingItemId === item.id) {
      textHtml = /*html*/ `
        <input
          class="edit-input"
          type="text"
          value="${model.viewState.listPage.editingItemTitle}"
          oninput="model.viewState.listPage.editingItemTitle = this.value"
          onkeydown="if(event.key === 'Enter') saveEditItem()"
        >
      `;
      editBtnHtml = /*html*/ `
        <button class="edit-btn edit-btn-save" onclick="saveEditItem()"><img src="${getIcon("check")}" alt="">Lagre</button>
        <button class="edit-btn edit-btn-cancel" onclick="cancelEditItem()">Avbryt</button>
      `;
    }

    if (item.isCompleted) editBtnHtml = "";

    const itemHtml = /*html*/ `
      <li>
        <input type="checkbox" ${checked} onchange="toggleItemCompletion('${item.id}')">
        ${textHtml}
        ${editBtnHtml}
        <button class="btn btn-icon" onclick="deleteItem('${item.id}')">
          <img src="${getIcon("trash")}" width="14" alt="Slett">
        </button>
        ${sharedIcon}
      </li>
    `;

    if (item.isCompleted) {
      completedHtml += itemHtml;
      completedCount++;
    } else {
      uncompletedHtml += itemHtml;
      uncompletedCount++;
    }
  }

  const visibilityHtml = canChangeVisibility(list)
    ? /*html*/ `
        <div class="visibility-switch">
          <button class="visibility-option ${!list.isShared ? "active" : ""}" onclick="setListVisibility(false)">
            <img src="${getIcon("lock")}" width="14" alt="">
            Privat
          </button>
          <button class="visibility-option ${list.isShared ? "active" : ""}" onclick="setListVisibility(true)">
            <img src="../../assets/icons/users.svg" width="14" alt="">
            Delt
          </button>
        </div>
      `
    : /*html*/ `
        <span class="visibility-label">
          <img src="../../assets/icons/${list.isShared ? "users.svg" : "lock.svg"}" width="14" alt="">
          ${list.isShared ? "Delt" : "Privat"}
        </span>
      `;

  const isMono = model.app.theme === "mono";
  const percent = list.totalItems === 0 ? 0 : Math.round((list.completedItems / list.totalItems) * 100);

  const showMembers = model.viewState.listPage.showMembers;
  const showTodo = model.viewState.listPage.showTodo;
  const showCompleted = model.viewState.listPage.showCompleted;

  const sharedHtml = list.isShared
    ? /*html*/ `
        <div class="share-meta">
          <button class="member-count-btn" onclick="toggleMembers()">
            ${list.members && list.members.length === 1 ? "1 medlem" : `${list.members ? list.members.length : 0} medlemmer`}
            <img src="${getIcon("chevron-right")}" width="14"
                 class="${showMembers ? "rotated" : ""}" alt="">
          </button>
          ${canAddMember(list) ? `
          <button class="btn invite-btn" onclick="openInviteModal()">
            <img src="${getIcon("user-plus")}" width="14" alt="">
            Inviter
          </button>` : ""}
        </div>
      `
    : "";

  let membersHtml = "";
  if (list.isShared && showMembers) {
    const members = getListMembers(list);
    let rows = "";
    for (const user of members) {
      rows += /*html*/ `
        <div class="member-row">
          <img src="${user.profilePictureSmall || user.profilePicture}" class="member-avatar" alt="">
          <span>${user.username}</span>
          ${user.id === list.ownerId ? `<span class="owner-tag">Eier</span>` : ""}
          <span class="member-code">${user.code}</span>
          ${canRemoveMember(list, user) ? `
            <button class="btn-icon remove-member-btn" onclick="removeMember('${user.id}')" title="Fjern medlem">
              <img src="${getIcon("x")}" width="14" alt="Fjern">
            </button>` : ""}
        </div>
      `;
    }
    membersHtml = /*html*/ `
      <div class="members-list">
        ${rows || `<span class="member-row member-code">Ingen medlemmer ennå</span>`}
      </div>
    `;
  }

  return /*html*/ `
    ${headerComponent()}

    <div class="list-container">
      <div class="list-title-row">
        <h2>${list.title}</h2>
      </div>

      <div class="list-progress">
        <div class="list-progress-fill" style="width: ${percent}%"></div>
      </div>
      <span class="counter"><b>${percent}%</b> ferdig · <span class="counter-link" onclick="showCompletedTasks()">${list.completedItems} av ${list.totalItems} oppgaver</span></span>

      <div class="list-toolbar">
        ${visibilityHtml}
        ${sharedHtml}
      </div>

      ${membersHtml}

      <div class="input-box">
        <input
          type="text"
          placeholder="Legg til ny oppgave..."
          value="${model.viewState.listPage.newItemTitle}"
          oninput="model.viewState.listPage.newItemTitle = this.value"
          onkeydown="if(event.key === 'Enter') pushNewItem()"
        />
        <button class="btn" onclick="pushNewItem()">
          <img src="${getIcon("square-plus")}" width="16" alt="Legg til">
        </button>
      </div>

      <h3 class="section-toggle" onclick="toggleTodo()">
        Å gjøre · ${uncompletedCount}
        <img src="${getIcon("chevron-right")}" width="14" class="${showTodo ? "rotated" : ""}" alt="">
      </h3>
      ${showTodo ? uncompletedHtml ? `<ul>${uncompletedHtml}</ul>` : `<p class="empty-text">${completedCount ? `Alle oppgaver er fullført ${isMono ? ":D" : "🎉"}` : `Ingen oppgaver ennå ${isMono ? ":)" : "📝"}`}</p>` : ""}

      <h3 id="completed-tasks" class="section-toggle" onclick="toggleCompleted()">
        Fullførte oppgaver · ${completedCount}
        <img src="${getIcon("chevron-right")}" width="14" class="${showCompleted ? "rotated" : ""}" alt="">
      </h3>
      ${showCompleted ? completedHtml ? `<ul class="completed-list">${completedHtml}</ul>` : `<p class="empty-text">Ingen oppgaver er fullført ennå ${isMono ? ":(" : "😢"}</p>` : ""}
    </div>

    ${getBottomBar()}
  `;
}