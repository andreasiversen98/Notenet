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
   getLoggedInUser().theme = theme;
   setView();
}

function getPremiumImage(name) {
   const ending = model.app.theme === "retro" ? "-retro" : "";
   return `../../assets/images/premium/${name}${ending}.svg`;
}

function getLogo() {
   const ending = model.app.theme === "retro" ? "-retro" : "";
   return `../../assets/images/logo/notenet-logo${ending}.svg`;
}

function getIcon(name) {
   const folder = model.app.theme === "retro" ? "icons/pixel" : "icons";
   return `../../assets/${folder}/${name}.svg`;
}

// model.viewState.adminUserOverview.selectedUser = 'test55'
model.app.currentUserId = "u6"
setView("adminUserOverview");
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
   const pictures = ["default-avatar", "avatar-red", "avatar-blue", "avatar-green", "avatar-purple", "avatar-yellow", "avatar-pink", "avatar-orange", "avatar-teal", "avatar-gray", "avatar-navy", "avatar-brown", "avatar-mint", "avatar-wine", "shape-check", "shape-ring", "shape-split", "shape-dots", "shape-stack", "shape-sun", "shape-wave", "shape-quarter", "shape-moon", "shape-mountain", "shape-plus", "shape-diamond"];
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
   const testLists = [
      { title: "Pakkeliste til hyttetur", tasks: ["Pakke sovepose", "Ta med ullsokker", "Lade hodelykt", "Kjøpe fyrstikker", "Pakke kortstokk", "Handle frokostmat", "Ta med vedsekk", "Pakke regntøy"] },
      { title: "Fjelltur i Jotunheimen", tasks: ["Sjekke værmeldingen", "Booke hytte på DNT", "Kjøpe turkart", "Smøre fjellstøvler", "Pakke førstehjelpsskrin", "Kjøpe sjokolade", "Lade powerbank", "Planlegge rute"] },
      { title: "Handleliste til grillfest", tasks: ["Kjøpe pølser", "Kjøpe hamburgerbrød", "Kjøpe grillkull", "Lage potetsalat", "Kjøpe brus", "Kjøpe ketchup og sennep", "Hente engangsgrill", "Kjøpe is til dessert"] },
      { title: "Russetid 2027", tasks: ["Bestille russedress", "Lage russekort", "Velge russenavn", "Spare til buss", "Lage russelåt-budsjett", "Planlegge russetreff", "Kjøpe russelue", "Lage russeknuter-liste"] },
      { title: "Bryllupsplanlegging", tasks: ["Booke lokale", "Sende invitasjoner", "Bestille bryllupskake", "Velge musikk", "Kjøpe ringer", "Finne fotograf", "Lage bordplassering", "Prøve brudekjole"] },
      { title: "Flytting til Bergen", tasks: ["Bestille flyttebil", "Pakke kjøkkenet", "Melde flytting", "Si opp strøm", "Kjøpe flytteesker", "Vaske gammel leilighet", "Bytte adresse i banken", "Kjøpe paraply"] },
      { title: "Oppussing av bad", tasks: ["Velge fliser", "Bestille rørlegger", "Kjøpe nytt speil", "Rive gammelt gulv", "Male taket", "Montere dusjvegg", "Kjøpe håndklestativ", "Fuge fliser"] },
      { title: "Ukesmeny", tasks: ["Taco fredag", "Fiskegrateng mandag", "Pasta carbonara", "Kyllingsalat", "Pannekaker søndag", "Lasagne onsdag", "Laksewok", "Grønnsakssuppe"] },
      { title: "Eksamensplan vår", tasks: ["Repetere matte", "Lese norsk pensum", "Gjøre gamle eksamener", "Lage tankekart", "Lese engelsk", "Møte kollokviegruppe", "Spørre lærer om oppgaven", "Sove nok før eksamen"] },
      { title: "Julegaver 2026", tasks: ["Kjøpe gave til mamma", "Kjøpe gave til pappa", "Pakke inn gaver", "Bestille på nett", "Kjøpe julekort", "Lage hjemmelaget gave", "Kjøpe gave til bestemor", "Kjøpe gavepapir"] },
      { title: "Bursdag til mamma", tasks: ["Bestille bord", "Kjøpe blomster", "Lage bursdagskake", "Skrive kort", "Kjøpe gave", "Invitere tante", "Pynte stua", "Kjøpe lys til kaka"] },
      { title: "Treningsprogram 12 uker", tasks: ["Løpe 5 km", "Styrketrening bein", "Styrketrening overkropp", "Yoga og tøying", "Svømme 1 km", "Intervalltrening", "Hviledag", "Logge fremgang"] },
      { title: "Tur til Roma", tasks: ["Bestille flybilletter", "Booke hotell", "Kjøpe billetter til Colosseum", "Besøke Vatikanet", "Spise ekte carbonara", "Kaste mynt i Fontana di Trevi", "Veksle euro", "Laste ned kart offline"] },
      { title: "Lesesirkel", tasks: ["Velge neste bok", "Lese kapittel 1–5", "Booke møterom", "Lage diskusjonsspørsmål", "Kjøpe kaffe og kaker", "Sende påminnelse", "Skrive anmeldelse", "Stemme over neste bok"] },
      { title: "Hagearbeid i mai", tasks: ["Klippe plenen", "Så gulrøtter", "Plante tomater", "Luke bedet", "Beskjære busker", "Kjøpe jord", "Vanne blomster", "Male gjerdet"] },
      { title: "Studietur til London", tasks: ["Bestille fly", "Booke hostel", "Kjøpe Oyster card", "Besøke British Museum", "Se Big Ben", "Lage felles budsjett", "Sjekke pass", "Bestille musikalbilletter"] },
      { title: "Sykkeltur rundt Mjøsa", tasks: ["Service på sykkelen", "Pumpe dekkene", "Kjøpe reserveslange", "Planlegge overnatting", "Pakke sykkelvesker", "Smøre kjedet", "Kjøpe sportsdrikke", "Laste ned ruten"] },
      { title: "Dugnad i borettslaget", tasks: ["Henge opp oppslag", "Leie container", "Kjøpe søppelsekker", "Rake løv", "Vaske trappeoppgangen", "Kjøpe pizza til alle", "Male benkene", "Rydde sykkelboden"] },
      { title: "Hackathon-forberedelser", tasks: ["Danne team", "Velge idé", "Sette opp GitHub-repo", "Lage wireframe", "Installere verktøy", "Lage pitch-presentasjon", "Kjøpe energidrikk", "Teste demoen"] },
      { title: "Bandøving setliste", tasks: ["Øve på refrenget", "Stemme gitarene", "Lære ny cover", "Booke øvingslokale", "Skrive ny tekst", "Ta opp demo", "Bytte trommeskinn", "Lage setliste til konsert"] },
      { title: "Fotballaget – utstyr", tasks: ["Kjøpe nye baller", "Vaske draktene", "Bestille kjegler", "Kjøpe vannflasker", "Fikse målnettet", "Lage kampoppsett", "Samle inn kontingent", "Kjøpe førstehjelpsutstyr"] },
      { title: "Kanotur i Femunden", tasks: ["Leie kanoer", "Kjøpe vanntette sekker", "Pakke telt", "Kjøpe fiskekort", "Planlegge leirplasser", "Pakke primus", "Ta med myggmiddel", "Sjekke vannstand"] },
      { title: "17. mai-komiteen", tasks: ["Bestille korps", "Lage leker til barna", "Kjøpe pølser og is", "Pynte med flagg", "Skrive talen", "Lage vaktliste", "Kjøpe premier", "Ordne lydanlegg"] },
      { title: "Interrail 2027", tasks: ["Kjøpe interrailpass", "Planlegge rute", "Booke nattog", "Kjøpe reiseforsikring", "Pakke lett", "Laste ned appen", "Lage budsjett", "Finne hostels"] },
      { title: "Skitur til Trysil", tasks: ["Smøre skiene", "Kjøpe heiskort", "Booke hytte", "Leie snowboard", "Pakke skibriller", "Kjøpe kvikk lunsj", "Sjekke snøforhold", "Fordele bilplasser"] },
      { title: "Matpakke-ideer", tasks: ["Wraps med kylling", "Pastasalat", "Grovbrød med egg", "Hjemmelaget hummus", "Frukt og nøtter", "Rundstykker med ost", "Nudlesalat", "Smoothie på flaske"] },
      { title: "Strikkeprosjekter", tasks: ["Strikke lue", "Kjøpe garn", "Strikke votter", "Finne genseroppskrift", "Strikke skjerf", "Lære ny maske", "Strikke sokker", "Felle av genseren"] },
      { title: "Podcastideer", tasks: ["Kjøpe mikrofon", "Lage intro-musikk", "Finne første gjest", "Skrive manus", "Velge podcastnavn", "Lage logo", "Spille inn episode 1", "Laste opp til Spotify"] },
      { title: "Spillkveld", tasks: ["Kjøpe snacks", "Velge brettspill", "Invitere vennene", "Lade kontrollerne", "Lage quiz", "Kjøpe brus", "Rydde stua", "Bestille pizza"] },
      { title: "Vårrengjøring", tasks: ["Vaske vinduer", "Rydde boden", "Bytte til sommerdekk", "Sortere klær", "Vaske kjøleskapet", "Støvsuge bilen", "Gi bort gamle ting", "Vaske gardiner"] },
      { title: "Søknader sommerjobb", tasks: ["Oppdatere CV", "Skrive søknadsbrev", "Søke på butikkjobb", "Søke i kommunen", "Spørre om referanse", "Øve på intervju", "Lage LinkedIn-profil", "Følge opp søknader"] },
      { title: "Nyttårsfest", tasks: ["Kjøpe raketter", "Lage festmeny", "Invitere gjester", "Kjøpe pynt", "Lage spilleliste", "Kjøpe champagne", "Planlegge leker", "Rydde dagen etter"] },
      { title: "Turliste Lofoten", tasks: ["Gå opp Reinebringen", "Besøke Henningsvær", "Bade på Haukland", "Se midnattssol", "Spise tørrfisk", "Booke rorbu", "Leie bil", "Ta ferge fra Bodø"] },
      { title: "Babyutstyr", tasks: ["Kjøpe barnevogn", "Kjøpe bilstol", "Montere stellebord", "Vaske babyklær", "Kjøpe bleier", "Pakke sykehusbag", "Kjøpe babycall", "Male barnerommet"] },
      { title: "Valpeforberedelser", tasks: ["Kjøpe hundeseng", "Kjøpe valpefôr", "Melde på valpekurs", "Kjøpe bånd og sele", "Valpesikre leiligheten", "Finne veterinær", "Kjøpe tyggeleker", "Bestemme navn"] },
      { title: "Fisketur i Nordmarka", tasks: ["Kjøpe fiskekort", "Sjekke fiskestanga", "Kjøpe sluk", "Pakke matpakke", "Planlegge vann", "Ta med kniv", "Pakke termos", "Lade kamera"] },
      { title: "Klassetur 10. trinn", tasks: ["Samle inn penger", "Booke buss", "Lage aktivitetsliste", "Hente samtykkeskjema", "Booke overnatting", "Lage romfordeling", "Planlegge kveldsprogram", "Kjøpe førstehjelp"] },
      { title: "Restauranter å prøve", tasks: ["Prøve ramen-stedet", "Booke bord på tapasbar", "Teste ny burgerbar", "Prøve indisk", "Spise sushi", "Prøve vegansk restaurant", "Besøke matmarkedet", "Prøve etiopisk"] },
      { title: "Filmmaraton", tasks: ["Velge filmserie", "Lage popcorn", "Kjøpe godteri", "Hente tepper", "Teste prosjektoren", "Lage kinobilletter", "Invitere venner", "Bestemme pauser"] },
      { title: "Påskefjellet", tasks: ["Kjøpe appelsiner", "Smøre skiene", "Kjøpe påskekrim", "Pakke solkrem", "Kjøpe Kvikk Lunsj", "Lage påskeeggjakt", "Pakke solbriller", "Kjøpe marsipan"] },
      { title: "Hjemmekontor-oppsett", tasks: ["Kjøpe skjerm", "Kjøpe kontorstol", "Ordne kabler", "Kjøpe skrivebordslampe", "Sette opp webkamera", "Kjøpe plante", "Kjøpe hodetelefoner", "Lage fast rutine"] },
      { title: "Konfirmasjon", tasks: ["Booke lokale", "Sende invitasjoner", "Kjøpe bunad-sølje", "Bestille kake", "Skrive takketale", "Lage bordkort", "Bestille fotograf", "Kjøpe dress"] },
      { title: "Juleverksted", tasks: ["Kjøpe glitter", "Lage julekurver", "Bake pepperkaker", "Lage julestjerner", "Kjøpe papp og lim", "Lage nisser", "Dekorere pepperkakehus", "Kjøpe gløgg"] },
      { title: "Loppemarked", tasks: ["Samle inn ting", "Prise varer", "Låne bord", "Henge opp plakater", "Lage kaffeservering", "Ordne vekslepenger", "Rydde etterpå", "Lage Vipps-skilt"] },
      { title: "Bilferie i Sverige", tasks: ["Service på bilen", "Planlegge rute", "Booke campingplass", "Kjøpe veibok", "Pakke kjølebag", "Besøke Liseberg", "Handle på Strömstad", "Kjøpe kanelbullar"] },
      { title: "Kakebaking", tasks: ["Bake skillingsboller", "Lage sjokoladekake", "Kjøpe smør og mel", "Bake brownies", "Lage muffins", "Pynte kake", "Kjøpe kakeformer", "Bake kanelsnurrer"] },
      { title: "Blomster på balkongen", tasks: ["Kjøpe blomsterkasser", "Plante petunia", "Kjøpe gjødsel", "Plante urter", "Kjøpe vannkanne", "Plante jordbær", "Henge opp lys", "Vanne hver kveld"] },
      { title: "Kodeprosjekt", tasks: ["Sette opp repo", "Lage wireframe", "Skrive modellen", "Lage view-funksjoner", "Fikse bugs", "Skrive README", "Committe og pushe", "Presentere for klassen"] },
      { title: "Bokhylla", tasks: ["Lese Sult", "Lese 1984", "Lese Harry Potter på nytt", "Låne bok på biblioteket", "Lese Kongen av Os", "Sortere bøkene", "Lese Dune", "Kjøpe ny bokhylle"] },
      { title: "Sommerfest på jobben", tasks: ["Booke lokale", "Lage invitasjon", "Bestille catering", "Planlegge quiz", "Kjøpe premier", "Ordne DJ", "Lage gjesteliste", "Rydde etterpå"] },
   ];
   const allUsers = model.data.users.filter((user) => user.role !== "admin");
   const premiumUsers = allUsers.filter((user) => user.isPremium);

   for (let i = 0; i < testLists.length; i++) {
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
      const availableTasks = [...testLists[i].tasks];
      const itemAmount = 3 + Math.floor(testRandom() * (availableTasks.length - 2));
      for (let j = 0; j < itemAmount; j++) {
         const taskIndex = Math.floor(testRandom() * availableTasks.length);
         items.push({
            id: `i${j + 1}`,
            text: availableTasks.splice(taskIndex, 1)[0],
            isCompleted: testRandom() < 0.4,
            addedBy: pickRandom(members),
         });
      }

      model.data.lists.push({
         id: `t${i + 1}`,
         title: testLists[i].title,
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
