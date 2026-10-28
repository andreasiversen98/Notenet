const modals = {
   createList: createListModalComponent,
   notifications: userNotification,
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
