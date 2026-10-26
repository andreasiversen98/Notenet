const modals = {
   createList: createListModalComponent,
};

function openModal(name) {
   model.app.openModal = name;
   setView();
}

function closeModal() {
   model.app.openModal = null;
   setView();
}