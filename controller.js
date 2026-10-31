let testSeed = 7;
createTestUsers();
createTestLists();

function getLoggedInUser() {
   return model.data.users.find((u) => u.id === model.app.currentUserId);
}
console.log("controller.js - loggedInUser", getLoggedInUser());

function setView(selectedPage) {
   if (selectedPage && selectedPage !== model.app.currentPage) {
      model.app.previousPage = model.app.currentPage;
      model.app.currentPage = selectedPage;
   }
   const currentView = router[model.app.currentPage];
   updateView(currentView);

   // pagination check
   //   console.table({
   //     Source: "controller.js",
   //     Function: "setView(selectedPage)",
   //     "Previous Page": model.app.previousPage,
   //     "Current Page": model.app.currentPage,
   //   });
}

function toggleDarkMode() {
   model.app.darkMode = !model.app.darkMode;
   setView();
}

function setTheme(theme) {
   model.app.theme = theme;
   setView();
}

// model.viewState.adminUserOverview.selectedUser = 'test55'
setView("loginPage");
// setView("userProfile")
// setView("adminProfile")
// setView("adminUserOverview")
// setView("adminViewUser")
// openModal("notifications");
// setView("userNotification");

function testRandom() {
   testSeed = (testSeed * 16807) % 2147483647;
   return (testSeed - 1) / 2147483646;
}

function pickRandom(array) {
   return array[Math.floor(testRandom() * array.length)];
}

function createTestUsers() {
   const firstNames = ["Ingrid", "Lars", "Nora", "Emil", "Sofie", "Jonas", "Emma", "Henrik", "Maja", "Sander", "Thea", "Magnus", "Ida", "Mathias", "Sara", "Elias", "Linnea", "Kristian", "Hedda", "Tobias", "Amalie", "Aksel", "Frida", "Martin", "Julie", "Sigurd", "Vilde", "Oskar", "Mia", "Kasper", "Tuva", "Even", "Selma", "Jakob", "Live", "Filip", "Oda", "Adrian", "Ronja", "Håkon"];
   const lastNames = ["Hansen", "Johansen", "Olsen", "Larsen", "Andersen", "Pedersen", "Nilsen", "Kristiansen", "Jensen", "Karlsen", "Berg", "Haugen", "Hagen", "Bakken", "Dahl", "Lie", "Moen", "Strand", "Solberg", "Eide"];
   const pictures = ["default-avatar", "avatar-red", "avatar-blue", "avatar-green", "avatar-purple", "avatar-yellow", "avatar-pink", "avatar-orange", "avatar-teal", "avatar-gray", "avatar-navy", "avatar-brown", "shape-check", "shape-ring", "shape-split", "shape-dots", "shape-stack", "shape-sun", "shape-wave", "shape-quarter", "shape-moon", "shape-mountain"];
   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const usedNames = [];
   const usedCodes = model.data.users.map((user) => user.code);

   let testUserAmount = 100;
   for (let i = 0; i < testUserAmount; i++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - (i % 42));

      let username = pickRandom(firstNames) + " " + pickRandom(lastNames);
      while (usedNames.includes(username)) username = pickRandom(firstNames) + " " + pickRandom(lastNames);
      usedNames.push(username);

      let code = "";
      while (code === "" || usedCodes.includes(code)) {
         code = pickRandom(letters) + pickRandom(letters) + pickRandom(letters) + "-" + (100 + Math.floor(testRandom() * 900));
      }
      usedCodes.push(code);

      model.data.users.push({
         id: `test${i}`,
         username: username,
         password: "123",
         profilePicture: `../../assets/images/profile-pictures/${pickRandom(pictures)}.svg`,
         code: code,
         isPremium: i > testUserAmount / 2 ? true : false,
         role: "user",
         createdAt: createdAt.toISOString().slice(0, 10),
         invitedTo: [],
         sentInvites: [],
      });
   }
}

function createTestLists() {
   const titles = ["Pakkeliste til hyttetur", "Fjelltur i Jotunheimen", "Handleliste til grillfest", "Russetid 2027", "Bryllupsplanlegging", "Flytting til Bergen", "Oppussing av bad", "Ukesmeny", "Eksamensplan vår", "Julegaver 2026", "Bursdag til mamma", "Treningsprogram 12 uker", "Tur til Roma", "Lesesirkel", "Hagearbeid i mai", "Studietur til London", "Sykkeltur rundt Mjøsa", "Dugnad i borettslaget", "Hackathon-forberedelser", "Bandøving setliste", "Fotballaget – utstyr", "Kanotur i Femunden", "17. mai-komiteen", "Interrail 2027", "Skitur til Trysil", "Matpakke-ideer", "Strikkeprosjekter", "Podcastideer", "Spillkveld", "Vårrengjøring", "Søknader sommerjobb", "Nyttårsfest", "Turliste Lofoten", "Babyutstyr", "Valpeforberedelser", "Fisketur i Nordmarka", "Klassetur 10. trinn", "Restauranter å prøve", "Filmmaraton", "Påskefjellet", "Hjemmekontor-oppsett", "Konfirmasjon", "Juleverksted", "Loppemarked", "Bilferie i Sverige", "Kakebaking", "Blomster på balkongen", "Kodeprosjekt", "Bokhylla", "Sommerfest på jobben"];
   const tasks = ["Lage plan", "Kjøpe inn mat", "Sende invitasjoner", "Bestille billetter", "Pakke sekken", "Lage budsjett", "Booke overnatting", "Sjekke værmeldingen", "Kjøpe gave", "Rydde boden", "Ringe bestemor", "Lage spilleliste", "Leie utstyr", "Fikse sykkelen", "Skrive handleliste", "Bestemme dato", "Lage påmeldingsskjema", "Kjøpe kaffe", "Henge opp plakater", "Vaske bilen", "Lade powerbank", "Lage matpakker", "Sette opp telt", "Kjøpe ved", "Ta bilder"];
   const allUsers = model.data.users.filter((user) => user.role !== "admin");
   const premiumUsers = allUsers.filter((user) => user.isPremium);

   for (let i = 0; i < titles.length; i++) {
      const isShared = testRandom() < 0.7;
      const owner = isShared ? pickRandom(premiumUsers) : pickRandom(allUsers);
      const members = [owner.id];

      if (isShared) {
         const memberAmount = 1 + Math.floor(testRandom() * 9);
         for (let j = 0; j < memberAmount; j++) {
            const member = pickRandom(allUsers);
            if (!members.includes(member.id)) members.push(member.id);
         }
      }

      const items = [];
      const itemAmount = 3 + Math.floor(testRandom() * 10);
      for (let j = 0; j < itemAmount; j++) {
         items.push({
            id: `i${j + 1}`,
            text: pickRandom(tasks),
            isCompleted: testRandom() < 0.4,
            addedBy: pickRandom(members),
         });
      }

      model.data.lists.push({
         id: `t${i + 1}`,
         title: titles[i],
         ownerId: owner.id,
         isShared: isShared,
         completedItems: items.filter((item) => item.isCompleted).length,
         totalItems: items.length,
         members: members,
         items: items,
      });
   }

   const sharedLists = model.data.lists.filter((list) => list.isShared);
   const testUsers = model.data.users.filter((user) => user.id.startsWith("test"));

   for (const user of testUsers) {
      const notMemberOf = sharedLists.filter((list) => !list.members.includes(user.id));
      const memberOf = sharedLists.filter((list) => list.members.includes(user.id));

      const invitedAmount = Math.floor(testRandom() * 6);
      for (let i = 0; i < invitedAmount; i++) {
         const list = pickRandom(notMemberOf);
         if (!user.invitedTo.includes(list.id)) user.invitedTo.push(list.id);
      }

      const sentAmount = memberOf.length === 0 ? 0 : Math.floor(testRandom() * 6);
      for (let i = 0; i < sentAmount; i++) {
         const list = pickRandom(memberOf);
         if (!user.sentInvites.includes(list.id)) user.sentInvites.push(list.id);
      }
   }
}
