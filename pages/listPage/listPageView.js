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

    // viser hvem som la til oppgaven, eller hvem som fullførte den
    let sharedIcon = "";
    if (list.isShared && !item.isCompleted) {
      const addedBy = getUserById(item.addedBy);
      sharedIcon = addedBy
        ? /*html*/ `<img src="${addedBy.profilePictureSmall || addedBy.profilePicture}" class="item-avatar" title="${addedBy.username}" alt="${addedBy.username}">`
        : '<img src="assets/icons/user-round.svg" width="14" alt="Bruker">';
    }
    if (list.isShared && item.isCompleted && item.completedBy) {
      const completedBy = getUserById(item.completedBy);
      if (completedBy) sharedIcon = /*html*/ `<img src="${completedBy.profilePictureSmall || completedBy.profilePicture}" class="item-avatar" title="Fullført av ${completedBy.username}" alt="Fullført av ${completedBy.username}">`;
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

  // sletting ligger nederst, unna det man bruker hele tiden
  const deleteHtml = canDeleteList(list)
    ? /*html*/ `
        <div class="list-delete">
          <button class="leave-btn" onclick="openModal('deleteList')">Slett ${list.type === "note" ? "notat" : "liste"}</button>
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
          ${user.id === model.app.currentUserId ? `<span class="owner-tag you-tag">Deg</span>` : ""}
          <span class="member-code">${user.code}</span>
          ${user.id === model.app.currentUserId && canLeaveList(list) ? `
            <button class="leave-btn" onclick="openModal('leaveList')">Forlat</button>` : ""}
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
          <h2>${list.title} ${getFavoriteButton(list.id)}</h2>
        </div>

        ${list.createdAt ? `<span class="counter">Opprettet ${formatDate(list.createdAt)}</span>` : ""}

        <div class="list-toolbar">
          ${visibilityHtml}
          <div class="list-actions">
            ${sharedHtml}
          </div>
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
          <div class="note-mark-split">
            <button class="note-tool" data-command="mark" title="Marker" onmousedown="event.preventDefault()" onclick="toggleNoteMark()"><mark ${getNoteMarkColorAttribute()}>A</mark></button>
            <button class="note-tool note-tool-arrow" title="Velg farge" onmousedown="event.preventDefault()" onclick="toggleNoteMarkMenu(this.parentElement)">
              <img src="${getIcon("chevron-right")}" width="12" alt="">
            </button>
          </div>
          <span class="note-tool-divider"></span>
          <label class="note-tool" title="Legg til bilde" onmousedown="event.preventDefault()">
            <img src="${getIcon("image")}" width="18" alt="">
            <input type="file" accept="image/*" hidden onchange="insertNoteImage(this)">
          </label>
          ${list.isShared ? /*html*/ `
          <span class="note-tool-divider"></span>
          <button class="note-tool ${model.viewState.listPage.showNoteAuthors ? "active" : ""}" title="Vis hvem som skrev" onmousedown="event.preventDefault()" onclick="toggleNoteAuthors()">
            <img src="${getIcon("users")}" width="18" alt="">
          </button>` : ""}

          <div class="note-mark-menu" hidden>
            ${getNoteMarkColorButtons()}
            <span class="note-tool-divider"></span>
            <button class="note-mark-remove" title="Fjern markering" onmousedown="event.preventDefault()" onclick="setNoteMark('')">
              <img src="${getIcon("x")}" width="14" alt="Fjern">
            </button>
          </div>
        </div>

        <div class="note-editor-wrapper">
          <div
            class="note-editor"
            contenteditable="true"
            spellcheck="false"
            data-placeholder="Skriv her..."
            oninput="hideNoteMenus(); updateNoteContent(this)"
            onpaste="pasteNoteText(event)"
            onclick="hideNoteMarkMenu(); selectNoteImage(event)"
            onkeyup="updateNoteToolbar()"
            onmouseup="updateNoteToolbar()"
            onfocus="rememberNoteBlocks()"
            onblur="saveNoteSelection(); hideNoteMenus()"
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

        ${deleteHtml}
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
        <h2>${list.title} ${getFavoriteButton(list.id)}</h2>
      </div>

      ${progressHtml}

      <div class="list-toolbar">
        ${visibilityHtml}
        <div class="list-actions">
          ${sharedHtml}
        </div>
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

      ${deleteHtml}
    </div>

    ${getBottomBar()}
  `;
}

function escapeNoteText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

const noteMarkColors = [
  { color: "yellow", name: "Gul" },
  { color: "green", name: "Grønn" },
  { color: "blue", name: "Blå" },
  { color: "pink", name: "Rosa" },
  { color: "orange", name: "Oransje" },
  { color: "purple", name: "Lilla" },
];

// gul er standard, så den trenger ikke data-color
function getNoteMarkColorAttribute() {
  const color = model.viewState.listPage.noteMarkColor;
  return color === "yellow" ? "" : `data-color="${color}"`;
}

function getNoteMarkColorButtons() {
  let html = "";
  for (const markColor of noteMarkColors) {
    html += /*html*/ `<button class="note-mark-color" data-color="${markColor.color}" title="${markColor.name}" onmousedown="event.preventDefault()" onclick="chooseNoteMarkColor('${markColor.color}')"></button>`;
  }
  return html;
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
    const color = node.getAttribute("data-color");
    const authors = node.getAttribute("data-authors");
    for (const attribute of [...node.attributes]) node.removeAttribute(attribute.name);

    if (node.tagName === "MARK" && noteMarkColors.some((markColor) => markColor.color === color)) {
      node.setAttribute("data-color", color);
    }

    if (["P", "H3", "DIV", "LI"].includes(node.tagName) && authors !== null && /^[\w ]*$/.test(authors)) {
      node.setAttribute("data-authors", authors);
    }

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

// avatarer i margen for hvem som skrev hvert avsnitt, tegnes etter at siden er laget
// fordi plasseringen avhenger av hvor høyt hvert avsnitt blir
function renderNoteAuthors() {
  const wrapper = document.querySelector(".note-editor-wrapper");
  if (!wrapper) return;
  for (const oldAvatar of wrapper.querySelectorAll(".note-author, .note-author-line")) oldAvatar.remove();

  const list = getCurrentList();
  const show = list.isShared && model.viewState.listPage.showNoteAuthors;
  wrapper.classList.toggle("show-authors", show);
  if (!show) return;

  // avsnitt etter hverandre med samme forfattere blir en gruppe med avatarer og en strek
  const groups = [];
  for (const block of getNoteBlocks(wrapper.querySelector(".note-editor"))) {
    if (block.textContent.replace(/\u200b/g, "").trim() === "" && !block.querySelector("img")) continue;

    const authors = getNoteBlockAuthors(block);
    const key = [...authors].sort().join(" ");
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.key === key) lastGroup.lastBlock = block;
    else groups.push({ key: key, authors: authors, firstBlock: block, lastBlock: block });
  }

  // margen blir bredere når flere har skrevet i samme avsnitt
  const mostAuthors = Math.max(0, ...groups.map((group) => Math.min(group.authors.length, 3)));
  wrapper.classList.toggle("authors-2", mostAuthors === 2);
  wrapper.classList.toggle("authors-3", mostAuthors === 3);

  for (const group of groups) {
    const lineHeight = parseFloat(getComputedStyle(group.firstBlock).lineHeight) || 24;
    const top = group.firstBlock.offsetTop + lineHeight / 2 - 10;
    const bottom = group.lastBlock.offsetTop + group.lastBlock.offsetHeight;

    const users = group.authors.map(getUserById).filter(Boolean).slice(0, 3);
    for (let i = 0; i < users.length; i++) {
      const avatar = document.createElement("img");
      avatar.className = `item-avatar note-author ${i > 0 ? "stacked" : ""}`;
      avatar.src = users[i].profilePictureSmall || users[i].profilePicture;
      avatar.title = users[i].username;
      avatar.alt = users[i].username;
      avatar.style.top = `${top}px`;
      avatar.style.left = `${i * 14}px`;
      wrapper.appendChild(avatar);
    }

    if (users.length && bottom - top > 28) {
      const line = document.createElement("span");
      line.className = "note-author-line";
      line.style.top = `${top + 24}px`;
      line.style.height = `${bottom - top - 24}px`;
      wrapper.appendChild(line);
    }
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
