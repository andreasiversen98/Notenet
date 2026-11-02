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
