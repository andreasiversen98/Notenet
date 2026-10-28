function inviteMemberModal() {
   const lp = model.viewState.listPage;
   const list = getCurrentList();

   return /*html*/ `
   <div class="modal-overlay" onclick="closeInviteModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
         <div class="flex column gap">
            <div class="flex row justify-between align-center">
               <h2>Inviter</h2>
               <img onclick="closeInviteModal()" class="icon-size" src="../../assets/icons/x.svg"/>
            </div>
            <p class="invite-text">Skriv inn vennekoden til personen du vil invitere til «${list.title}».</p>
            <div class="input-box">
               <input
                  class="invite-input"
                  type="text"
                  placeholder="f.eks. LWH-385"
                  value="${lp.inviteCode}"
                  oninput="model.viewState.listPage.inviteCode = this.value"
                  onkeydown="if(event.key === 'Enter') inviteMember()"
               />
               <button class="btn" onclick="inviteMember()">
                  <img src="../../assets/icons/user-plus.svg" width="16" alt="Inviter">
               </button>
            </div>
            ${lp.inviteMessage ? `<p class="invite-message">${lp.inviteMessage}</p>` : ""}
         </div>
      </div>
   </div>`;
}
