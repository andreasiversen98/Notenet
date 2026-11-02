function landingPage() {
   const vs = model.viewState.landingPage;
   return /*html*/ `
      <div class="landing-page">

         <img class="profile-pic" src="${getLoggedInUser().profilePicture}"
            onclick="setView('userProfile')" />

         <div class="filter-row">
            <button class="filter-button ${vs.selectedFilter === "all" ? "active" : ""}"
               onclick="setFilter('all')">Alle</button>
            <button class="filter-button ${vs.selectedFilter === "mine" ? "active" : ""}"
               onclick="setFilter('mine')">Mine</button>
            <button class="filter-button ${vs.selectedFilter === "shared" ? "active" : ""}"
               onclick="setFilter('shared')">Delt</button>
         </div>

         <div class="list-rows">
            ${getListRows()}
         </div>

      </div>
      ${getBottomBar()}
   `;
}

function getListRows() {
   let html = "";
   for (const list of getVisibleLists()) {
      html += /*html*/ `
         <div class="list-row" onclick="openList('${list.id}')">
            <span class="list-icon">${list.isShared ? "🌐" : "🔒"}</span>
            <div class="list-text">
               <p class="list-title">${list.title}</p>
               <p class="list-owner">${getOwnerName(list)}</p>
            </div>
            <span class="list-count">${list.completedItems} / ${list.totalItems}</span>
            <span class="list-arrow">›</span>
         </div>
      `;
   }
   return html;
}