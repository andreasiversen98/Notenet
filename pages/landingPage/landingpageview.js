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
            <button class="modal-toggle-btn ${vs.selectedFilter === "all" ? "active" : ""}" onclick="setLandingFilter('all')">Alle</button>
            <button class="modal-toggle-btn ${vs.selectedFilter === "private" ? "active" : ""}" onclick="setLandingFilter('private')">Private</button>
            <button class="modal-toggle-btn ${vs.selectedFilter === "shared" ? "active" : ""}" onclick="setLandingFilter('shared')">Delte</button>
            <button class="modal-toggle-btn ${vs.selectedFilter === "favorites" ? "active" : ""}" onclick="setLandingFilter('favorites')">Favoritter</button>
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
      ${mine.length ? /*html*/ `<h3 class="landing-group">Laget av deg · ${mine.length}</h3><div class="list-rows">${getListRows(mine)}</div>` : ""}
      ${others.length ? /*html*/ `<h3 class="landing-group">Delt med deg · ${others.length}</h3><div class="list-rows">${getListRows(others)}</div>` : ""}
   `;
}

function getListRows(lists) {
   let html = "";
   for (const list of lists) {
      html += /*html*/ `
         <div class="list-row flex row align-center" onclick="openList('${list.id}')">
            <img class="list-icon" src="${getIcon(list.type === "simple" ? "list" : "square-check")}" alt=""/>
            <div class="list-text flex column">
               <span class="list-title">${list.title}</span>
               <span class="list-owner">${getOwnerName(list)} · ${list.isShared ? "Delt" : "Privat"}</span>
            </div>
            ${getFavoriteButton(list.id)}
            <span class="list-count">${list.type === "simple" ? `${list.totalItems} stk` : `${list.completedItems} / ${list.totalItems}`}</span>
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
         <h2>Du har ingen lister ennå</h2>
         <p class="empty-text">Lag din første liste, eller bli invitert til en delt liste.</p>
         <button class="empty-lists-btn" onclick="openModal('createList')">Lag ny liste</button>
      </div>
   `;
}
