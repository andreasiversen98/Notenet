function makePrivateModal() {
   const list = getCurrentList();
   const count = list.members.length - 1;
   const membersText = count === 1 ? "1 medlem" : `${count} medlemmer`;

   return /*html*/ `
   <div class="modal-overlay" onclick="closeModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h2>Gjøre listen privat?</h2>
               <img onclick="closeModal()" class="icon-size" src="../../assets/icons/x.svg"/>
            </div>
            <p class="invite-text">${membersText} blir fjernet fra «${list.title}». De må inviteres på nytt hvis listen blir delt igjen.</p>
            <div class="flex row justify-end">
               <button class="edit-btn edit-btn-cancel" onclick="closeModal()">Avbryt</button>
               <button class="edit-btn edit-btn-save" onclick="confirmMakePrivate()">Gjør privat</button>
            </div>
         </div>
      </div>
   </div>`;
}
