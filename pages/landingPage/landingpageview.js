function landingPage() {
   const vs = model.viewState.landingPage;
   if (!hasAnyLists()) return /*html*/ `
      ${headerComponent()}
      <div class="landing-page flex column">
         ${getEmptyLists()}
      </div>
      ${getBottomBar()}
   `;

   return /*html*/ `
      ${headerComponent()}
      <div class="landing-page flex column">
         <div class="input-box">
            <input type="text" id="landing-search" placeholder="Søk i listene dine..."
               value="${vs.search}" oninput="setLandingSearch(this.value)" />
         </div>

         <div class="modal-toggle-container landing-filter">
            ${getLandingFilterButton("all", "Alle")}
            ${getLandingFilterButton("private", "Private")}
            ${getLandingFilterButton("shared", "Delte")}
            ${getLandingFilterButton("favorites", "Favoritter")}
         </div>

         ${getListSection()}
      </div>
      ${getBottomBar()}
   `;
}

function getListSection() {
   const lists = getVisibleLists();
   if (lists.length === 0) return /*html*/ `<div class="list-rows"><p class="empty-text">Fant ingen lister</p></div>`;
   if (model.viewState.landingPage.selectedFilter !== "shared") return /*html*/ `<div class="list-rows">${getListRows(lists)}</div>`;

   const mine = lists.filter((list) => list.ownerId === model.app.currentUserId);
   const others = lists.filter((list) => list.ownerId !== model.app.currentUserId);
   return /*html*/ `
      ${getListGroup("Laget av deg", mine)}
      ${getListGroup("Delt med deg", others)}
   `;
}

function getListGroup(title, lists) {
   if (lists.length === 0) return "";
   return /*html*/ `
      <h3 class="landing-group">${title} · ${lists.length}</h3>
      <div class="list-rows">${getListRows(lists)}</div>
   `;
}

function getLandingFilterButton(filter, text) {
   const active = model.viewState.landingPage.selectedFilter === filter ? "active" : "";
   return /*html*/ `<button class="modal-toggle-btn ${active}" onclick="setLandingFilter('${filter}')">${text}</button>`;
}

function getListRows(lists) {
   let html = "";
   for (const list of lists) {
      html += /*html*/ `
         <div class="list-row flex row align-center" onclick="openList('${list.id}')">
            <img class="list-icon" src="${getIcon(getListTypeIcon(list))}" alt=""/>
            <div class="list-text flex column">
               <span class="list-title">${list.title}</span>
               <span class="list-owner">${getOwnerName(list)} · ${list.isShared ? "Delt" : "Privat"}</span>
            </div>
            ${getFavoriteButton(list.id)}
            <span class="list-count">${getListCount(list)}</span>
            <img class="list-arrow" src="${getIcon("chevron-right")}" alt=""/>
         </div>
      `;
   }
   return html;
}

function getEmptyLists() {
   return /*html*/ `
      <div class="empty-lists flex column align-center">
         <img class="empty-lists-image" src="${getIllustration("empty-lists")}" alt=""/>
         <h2>Du har ingen lister eller notater ennå</h2>
         <p class="empty-text">Lag en liste eller et notat, eller bli invitert til en delt liste.</p>
         <button class="empty-lists-btn" onclick="openModal('createList')">Kom i gang</button>
      </div>
   `;
}

function getListCount(list) {
   if (list.type === "note") return `${getNoteWordCount(list.content)} ord`;
   if (list.type === "simple") return `${list.totalItems} stk`;
   return `${list.completedItems} / ${list.totalItems}`;
}

function getListTypeIcon(list) {
   if (list.type === "note") return "note";
   if (list.type === "simple") return "list";
   return "square-check";
}
