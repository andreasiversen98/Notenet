const modals = {
   createList: createListModalComponent,
   notifications: userNotification,
};

function openModal(name) {
   model.app.openModal = name;
   setView();
}

function closeModal() {
   model.app.openModal = null;
   setView();
}