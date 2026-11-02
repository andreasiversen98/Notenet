function listPageView() {
  const list = getCurrentList();
  if (!list) return "";
  const isSimple = list.type === "simple";

  let uncompletedHtml = "";
  let completedHtml = "";
  let uncompletedCount = 0;
  let completedCount = 0;

  for (let i = 0; i < list.items.length; i++) {
    const item = list.items[i];

    const isCompleting = item.id === model.viewState.listPage.completingItemId;
    const checked = item.isCompleted || isCompleting ? "checked" : "";

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

    let animated = item.id === model.viewState.listPage.animatedItemId ? "animate-in" : "";
    if (isCompleting) animated = "completing";

    const itemHtml = /*html*/ `
      <li class="${animated}">
        ${isSimple ? `<i class="simple-dot"></i>` : `<input type="checkbox" ${checked} onchange="toggleItemCompletion('${item.id}')">`}
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
            <img src="${getIcon("users")}" width="14" alt="">
            Delt
          </button>
        </div>
      `
    : /*html*/ `
        <span class="visibility-label">
          <img src="${getIcon(list.isShared ? "users" : "lock")}" width="14" alt="">
          ${list.isShared ? "Delt" : "Privat"}
        </span>
      `;

  const isRetro = model.app.theme === "retro";
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

  if (list.type === "note") {
    return /*html*/ `
      ${headerComponent()}

      <div class="list-container">
        <div class="list-title-row">
          <h2>${list.title}</h2>
          ${getFavoriteButton(list.id)}
        </div>

        ${list.createdAt ? `<span class="counter">Opprettet ${formatDate(list.createdAt)}</span>` : ""}

        <div class="list-toolbar">
          ${visibilityHtml}
          ${sharedHtml}
        </div>

        ${membersHtml}

        <div class="note-toolbar">
          <button class="note-tool" data-command="bold" title="Fet" onmousedown="event.preventDefault()" onclick="formatNote('bold')"><b>B</b></button>
          <button class="note-tool" data-command="italic" title="Kursiv" onmousedown="event.preventDefault()" onclick="formatNote('italic')"><i>I</i></button>
          <button class="note-tool" data-command="underline" title="Understrek" onmousedown="event.preventDefault()" onclick="formatNote('underline')"><u>U</u></button>
          <span class="note-tool-divider"></span>
          <button class="note-tool" data-command="heading" title="Overskrift" onmousedown="event.preventDefault()" onclick="toggleNoteHeading()"><b>H</b></button>
          <button class="note-tool" data-command="insertUnorderedList" title="Punktliste" onmousedown="event.preventDefault()" onclick="formatNote('insertUnorderedList')">
            <img src="${getIcon("list")}" width="18" alt="">
          </button>
          <button class="note-tool" data-command="mark" title="Marker" onmousedown="event.preventDefault()" onclick="toggleNoteMark()"><mark>A</mark></button>
          <span class="note-tool-divider"></span>
          <label class="note-tool" title="Legg til bilde" onmousedown="event.preventDefault()">
            <img src="${getIcon("image")}" width="18" alt="">
            <input type="file" accept="image/*" hidden onchange="insertNoteImage(this)">
          </label>
        </div>

        <div class="note-editor-wrapper">
          <div
            class="note-editor"
            contenteditable="true"
            data-placeholder="Skriv her..."
            oninput="hideNoteImageMenu(); updateNoteContent(this)"
            onpaste="pasteNoteText(event)"
            onclick="selectNoteImage(event)"
            onkeyup="updateNoteToolbar()"
            onmouseup="updateNoteToolbar()"
            onblur="saveNoteSelection(); hideNoteImageMenu()"
          >${getNoteHtml(list.content)}</div>

          <div class="note-image-menu" hidden>
            <button data-size="small" onmousedown="event.preventDefault()" onclick="setNoteImageSize('small')">Liten</button>
            <button data-size="medium" onmousedown="event.preventDefault()" onclick="setNoteImageSize('medium')">Middels</button>
            <button data-size="full" onmousedown="event.preventDefault()" onclick="setNoteImageSize('full')">Full</button>
            <span class="note-image-divider"></span>
            <button title="Slett bilde" onmousedown="event.preventDefault()" onclick="deleteNoteImage()">
              <img src="${getIcon("trash")}" width="14" alt="Slett">
            </button>
          </div>
        </div>
      </div>

      ${getBottomBar()}
    `;
  }

  const progressHtml = isSimple
    ? /*html*/ `<span class="counter">${list.totalItems} stk</span>`
    : /*html*/ `
      <div class="list-progress">
        <div class="list-progress-fill" style="width: ${percent}%"></div>
      </div>
      <span class="counter"><b>${percent}%</b> ferdig · <span class="counter-link" onclick="showCompletedTasks()">${list.completedItems} av ${list.totalItems} oppgaver</span></span>
    `;

  const simpleHtml = uncompletedHtml
    ? /*html*/ `<ul class="simple-list">${uncompletedHtml}</ul>`
    : /*html*/ `<p class="empty-text">Listen er tom ennå ${isRetro ? ":)" : "📝"}</p>`;

  const tasksHtml = /*html*/ `
      <h3 class="section-toggle" onclick="toggleTodo()">
        Å gjøre · ${uncompletedCount}
        <img src="${getIcon("chevron-right")}" width="14" class="${showTodo ? "rotated" : ""}" alt="">
      </h3>
      ${showTodo ? uncompletedHtml ? `<ul>${uncompletedHtml}</ul>` : `<p class="empty-text">${completedCount ? `Alle oppgaver er fullført ${isRetro ? ":D" : "🎉"}` : `Ingen oppgaver ennå ${isRetro ? ":)" : "📝"}`}</p>` : ""}

      <h3 id="completed-tasks" class="section-toggle" onclick="toggleCompleted()">
        Fullførte oppgaver · ${completedCount}
        <img src="${getIcon("chevron-right")}" width="14" class="${showCompleted ? "rotated" : ""}" alt="">
      </h3>
      ${showCompleted ? completedHtml ? `<ul class="completed-list">${completedHtml}</ul>` : `<p class="empty-text">Ingen oppgaver er fullført ennå ${isRetro ? ":(" : "😢"}</p>` : ""}
  `;

  return /*html*/ `
    ${headerComponent()}

    <div class="list-container">
      <div class="list-title-row">
        <h2>${list.title}</h2>
        ${getFavoriteButton(list.id)}
      </div>

      ${progressHtml}

      <div class="list-toolbar">
        ${visibilityHtml}
        ${sharedHtml}
      </div>

      ${membersHtml}

      <div class="input-box">
        <input
          type="text"
          placeholder="${isSimple ? "Legg til i listen..." : "Legg til ny oppgave..."}"
          value="${model.viewState.listPage.newItemTitle}"
          oninput="model.viewState.listPage.newItemTitle = this.value"
          onkeydown="if(event.key === 'Enter') pushNewItem()"
        />
        <button class="btn" onclick="pushNewItem()">
          <img src="${getIcon("square-plus")}" width="16" alt="Legg til">
        </button>
      </div>

      ${isSimple ? simpleHtml : tasksHtml}
    </div>

    ${getBottomBar()}
  `;
}

function escapeNoteText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// gamle notater er vanlig tekst, nye er html
function getNoteHtml(content) {
  if (!content) return "";
  if (!content.includes("<")) return escapeNoteText(content).replace(/\n/g, "<br>");
  return sanitizeNoteHtml(content);
}

// notater kan deles, så vi fjerner alt som ikke er vanlig tekstformatering
const allowedNoteTags = ["B", "STRONG", "I", "EM", "U", "H3", "P", "BR", "UL", "OL", "LI", "MARK", "DIV", "IMG"];

function sanitizeNoteHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  cleanNoteNode(template.content);
  return template.innerHTML;
}

function cleanNoteNode(parent) {
  for (const node of [...parent.childNodes]) {
    if (node.nodeType === Node.TEXT_NODE) continue;

    if (node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "STYLE"].includes(node.tagName.toUpperCase())) {
      node.remove();
      continue;
    }

    if (!allowedNoteTags.includes(node.tagName)) {
      cleanNoteNode(node);
      node.replaceWith(...node.childNodes);
      continue;
    }

    const src = node.getAttribute("src") || "";
    const size = node.getAttribute("data-size");
    for (const attribute of [...node.attributes]) node.removeAttribute(attribute.name);

    if (node.tagName === "IMG") {
      if (!src.startsWith("data:image/")) {
        node.remove();
        continue;
      }
      node.setAttribute("src", src);
      if (size === "small" || size === "medium") node.setAttribute("data-size", size);
      continue;
    }

    cleanNoteNode(node);
  }
}

function getNoteText(content) {
  const template = document.createElement("template");
  template.innerHTML = getNoteHtml(content).replace(/<br>|<\/(p|h3|li|div)>/g, " ");
  return template.content.textContent.replace(/\s+/g, " ").trim();
}

function getNoteWordCount(content) {
  const text = getNoteText(content);
  return text ? text.split(" ").length : 0;
}
