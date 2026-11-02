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
               <img onclick="closeModal()" class="icon-size" src="${getIcon("x")}"/>
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

function cancelPremiumModal() {
   const count = getSharedListsOwnedBy(getLoggedInUser()).length;
   const listsText = count === 1 ? "Den delte listen din blir privat" : `De ${count} delte listene dine blir private`;

   return /*html*/ `
   <div class="modal-overlay" onclick="closeModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h2>Avslutte premium?</h2>
               <img onclick="closeModal()" class="icon-size" src="${getIcon("x")}"/>
            </div>
            <p class="invite-text">${listsText}, og alle medlemmer blir fjernet. Ventende invitasjoner blir også slettet.</p>
            <div class="flex row justify-end">
               <button class="edit-btn edit-btn-cancel" onclick="closeModal()">Avbryt</button>
               <button class="edit-btn edit-btn-save" onclick="confirmCancelPremium()">Avslutt premium</button>
            </div>
         </div>
      </div>
   </div>`;
}

function deleteUserModal() {
   const user = adminSelectedUser();
   const count = model.data.lists.filter((list) => list.ownerId === user.id).length;
   let text = "Brukeren blir slettet for godt.";
   if (count === 1) text = "Brukeren og den ene listen brukeren eier blir slettet for godt.";
   if (count > 1) text = `Brukeren og de ${count} listene brukeren eier blir slettet for godt.`;

   return /*html*/ `
   <div class="modal-overlay" onclick="openModal('adminViewUser')">
      <div class="modal-content" onclick="event.stopPropagation()">
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h2>Slette ${user.username}?</h2>
               <img onclick="openModal('adminViewUser')" class="icon-size" src="${getIcon("x")}"/>
            </div>
            <p class="invite-text">${text} Dette kan ikke angres.</p>
            <div class="flex row justify-end">
               <button class="edit-btn edit-btn-cancel" onclick="openModal('adminViewUser')">Avbryt</button>
               <button class="edit-btn edit-btn-danger" onclick="adminDeleteUser('${user.id}')">Slett bruker</button>
            </div>
         </div>
      </div>
   </div>`;
}
