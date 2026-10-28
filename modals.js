const modals = {
   createList: createListModal,
   notifications: notificationsModal,
   invite: inviteMemberModal,
   makePrivate: makePrivateModal,
};

function openModal(name) {
   model.app.openModal = name;
   setView();
}

function closeModal() {
   model.app.openModal = null;
   setView();
}
