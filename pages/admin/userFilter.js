let filterPath = model.viewState.adminUserOverview.selectedFilter;

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
