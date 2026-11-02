let filterPath = model.viewState.adminUserOverview.selectedFilter;

function adminUserOverview() {
   return /*html*/ `
      ${adminHeaderComponent()}
      <div class="admin-container flex column gap">
         <div class="flex row justify-between align-center">
            <h2 class="admin-title">Brukere</h2>
            ${filterUsers()}
         </div>
         ${drawUserSearch()}
         <span class="admin-count">${filteredUserCount()} brukere</span>
         ${displayUsers()}
         ${displayPagination()}
      </div>
      ${getBottomBar()}`;
}

function filterUsers() {
   return /*html*/ `
      <div class="modal-toggle-container admin-filter">
         <button class="modal-toggle-btn ${filterPath == "all" ? "active" : ""}" onclick="setFilter('all')">Alle</button>
         <button class="modal-toggle-btn ${filterPath == "free" ? "active" : ""}" onclick="setFilter('free')">Gratis</button>
         <button class="modal-toggle-btn ${filterPath == "premium" ? "active" : ""}" onclick="setFilter('premium')">Premium</button>
      </div>`;
}

function getFilteredUsers() {
   const search = model.viewState.adminUserOverview.search.toLowerCase();
   return model.data.users.filter((user) => {
      if (user.role === "admin") return false;
      if (!user.username.toLowerCase().includes(search)) return false;
      if (filterPath === "free") return !user.isPremium;
      if (filterPath === "premium") return user.isPremium;
      return true;
   });
}

function filteredUserCount() {
   return getFilteredUsers().length;
}

function getTotalUserPages() {
   return Math.ceil(filteredUserCount() / model.viewState.adminUserOverview.usersPerPage);
}

function getUserPage() {
   // deleting the only user on the last page would otherwise leave the page number past the end
   return Math.min(model.viewState.adminUserOverview.page, Math.max(getTotalUserPages(), 1));
}

function getPageUsers() {
   const startIndex = (getUserPage() - 1) * model.viewState.adminUserOverview.usersPerPage;
   return getFilteredUsers().slice(
      startIndex,
      startIndex + model.viewState.adminUserOverview.usersPerPage,
   );
}

function setFilter(newFilter) {
   filterPath = newFilter;
   model.viewState.adminUserOverview.page = 1;
   setView("adminUserOverview");
}

function setUserSearch(searchInput) {
   const caretPosition = searchInput.selectionStart;
   model.viewState.adminUserOverview.search = searchInput.value;
   model.viewState.adminUserOverview.page = 1;
   setView("adminUserOverview");
   // setView replaced the input with a new one, so focus has to move to the new one
   const newSearchInput = document.getElementById("admin-user-search");
   newSearchInput.focus();
   newSearchInput.setSelectionRange(caretPosition, caretPosition);
}

function drawUserSearch() {
   // a " in the search text would otherwise end the value attribute early
   const searchValue = model.viewState.adminUserOverview.search
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;");
   return /*html*/ `<input id="admin-user-search" class="settings-input" type="text" placeholder="Søk etter brukernavn" aria-label="Søk etter brukernavn" value="${searchValue}" oninput="setUserSearch(this)">`;
}

function setUserPage(newPage) {
   model.viewState.adminUserOverview.page = newPage;
   setView("adminUserOverview");
}

function drawPageButton(pageNumber, currentPage) {
   return /*html*/ `<button class="admin-page-btn ${pageNumber === currentPage ? "active" : ""}" onclick="setUserPage(${pageNumber})">${pageNumber}</button>`;
}

function displayPagination() {
   const totalPages = getTotalUserPages();
   if (totalPages <= 1) return "";
   const currentPage = getUserPage();
   const middleCount = model.viewState.adminUserOverview.paginationButtonAmount;
   // current page sits second in the group, but the group must stay between the first and last page
   const middleStart = Math.max(2, Math.min(currentPage - 1, totalPages - middleCount));
   const middleEnd = Math.min(totalPages - 1, middleStart + middleCount - 1);
   let pageButtons = drawPageButton(1, currentPage);
   if (middleStart > 2) pageButtons += /*html*/ `<span class="admin-page-dots">...</span>`;
   for (let i = middleStart; i <= middleEnd; i++) {
      pageButtons += drawPageButton(i, currentPage);
   }
   if (middleEnd < totalPages - 1)
      pageButtons += /*html*/ `<span class="admin-page-dots">...</span>`;
   pageButtons += drawPageButton(totalPages, currentPage);
   return /*html*/ `
      <nav class="admin-pagination flex row align-center">
         ${pageButtons}
      </nav>`;
}

function displayUsers() {
   let users = /*html*/ `<div class="admin-users">`;
   for (let user of getPageUsers()) {
      users += /*html*/ `
      <div 
         class="admin-user-row flex row align-center gap"
         onclick="model.viewState.adminUserOverview.selectedUser = '${user.id}'; openModal('adminViewUser')">
         <span class="admin-avatar-wrap">
            <img class="admin-avatar" src="${user.profilePictureSmall || user.profilePicture}" alt=""/>
            ${user.isPremium ? `<img class="admin-premium-icon" title="Premium" src="${getPremiumImage("premium-icon")}"/>` : ""}
         </span>
         <span class="admin-user-name">${user.username}</span>
         <span class="admin-user-code">${user.code}</span>
         <img class="admin-chevron" src="${getIcon("chevron-right")}"/>
      </div>`;
   }
   users += "</div>";
   return users;
}
