function getBottomBar() {
  const notificationCount = fetchInvites().length;

  return /*html*/ `
      <div class="flex column justify-self-end bottom-bar">
         <div class="flex row justify-evenly align-end padding">

            <span onclick="setView('userProfile')">
               <img class="icon-bottom icon-home" src="../../src/icons/house.svg" alt="Hjem">
            </span>

            <span onclick="openModal('createList')">
               <img class="icon-add" src="../../src/icons/plus.svg" alt="Ny liste">
            </span>

            <span class="notification-icon" onclick="openModal('notifications')">
               <img class="icon-bottom icon-notification" src="../../src/icons/bell.svg" alt="Varsler">
               ${notificationCount > 0 ? `<span class="notification-count">${notificationCount}</span>` : ""}
            </span>
         </div>
      </div>
   `;
}
