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
            <button class="modal-toggle-btn ${vs.selectedFilter === "private" ? "active" : ""}" onclick="setLandingFilter('private')">Privat</button>
            <button class="modal-toggle-btn ${vs.selectedFilter === "shared" ? "active" : ""}" onclick="setLandingFilter('shared')">Delt</button>
         </div>

         <div class="list-rows">
            ${getListRows() || /*html*/ `<p class="empty-text">Fant ingen lister</p>`}
         </div>
      </div>
      ${getBottomBar()}
   `;
}

function getListRows() {
   let html = "";
   for (const list of getVisibleLists()) {
      html += /*html*/ `
         <div class="list-row flex row align-center" onclick="openList('${list.id}')">
            <img class="list-icon" src="${getIcon(list.isShared ? "users" : "lock")}" alt=""/>
            <div class="list-text flex column">
               <span class="list-title">${list.title}</span>
               <span class="list-owner">${getOwnerName(list)}</span>
            </div>
            <span class="list-count">${list.completedItems} / ${list.totalItems}</span>
            <img class="list-arrow" src="${getIcon("chevron-right")}" alt=""/>
         </div>
      `;
   }
   return html;
}

function getEmptyLists() {
   return /*html*/ `
      <div class="empty-lists flex column align-center">
         <img class="empty-lists-image" src="../../assets/images/illustrations/empty-lists.svg" alt=""/>
         <h2>Du har ingen lister ennå</h2>
         <p class="empty-text">Lag din første liste, eller bli invitert til en delt liste.</p>
         <button class="empty-lists-btn" onclick="openModal('createList')">Lag ny liste</button>
      </div>
   `;
}
