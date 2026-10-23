function createListModalComponent() {
  const state = model.viewState.landingPage.createList;
  if (!state.isOpen) return "";

  return /*html*/ `
      <div class="modal-overlay">
         <div class="modal-content">
            <div class="flex row justify-end">
               <button class="btn-icon" onclick="closeCreateListModal()">
                  <img src="../../src/icons/x.svg" width="20" alt="Close">
               </button>
            </div>
            <div class="input-box">
               <img src="../../src/icons/globe.svg" width="20" alt="Icon">
               <input 
                  type="text" 
                  placeholder="Start en ny liste..." 
                  value="${state.title}" 
                  oninput="setCreateListTitle(this.value)"
                  onkeydown="if(event.key === 'Enter') pushNewList()"
               >
               <button class="btn" onclick="pushNewList()">
                  <img src="../../src/icons/square-plus.svg" width="20" alt="Add">
               </button>
            </div>
         </div>
      </div>
   `;
}
