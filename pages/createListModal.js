function createListModalComponent() {
  const state = model.viewState.landingPage.createList;

  const isShared = state.isShared ?? false;
  const iconFile = isShared ? "globe.svg" : "lock.svg";
  const placeholderText = isShared
    ? "Start en ny delt liste..."
    : "Start en ny privat liste...";

  return /*html*/ `
      <div class="modal-overlay" onclick="closeCreateListModal()"> 
         <div class="modal-content" onclick="event.stopPropagation()"> 
            <div class="flex row justify-end">
               <button class="btn-icon" onclick="closeCreateListModal()">
                  <img src="../../src/icons/x.svg" width="20" alt="Lukk">
               </button>
            </div>
            
            <div class="modal-toggle-container">
               <button class="modal-toggle-btn ${!isShared ? "active" : ""}" onclick="setCreateListShared(false)">Privat</button>
               <button class="modal-toggle-btn ${isShared ? "active" : ""}" onclick="setCreateListShared(true)">Delt</button>
            </div>

            <div class="input-box">
               <img src="../../src/icons/${iconFile}" width="20" alt="Ikon">
               <input 
                  type="text" 
                  placeholder="${placeholderText}" 
                  value="${state.title}" 
                  oninput="setCreateListTitle(this.value)"
                  onkeydown="if(event.key === 'Enter') pushNewList()"
               >
               <button class="btn" onclick="pushNewList()">
                  <img src="../../src/icons/square-plus.svg" width="20" alt="Legg til">
               </button>
            </div>
         </div>
      </div>
   `;
}
