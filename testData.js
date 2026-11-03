// testdata: brukere, lister og notater som lages når ingenting er lagret fra før
let testSeed = 7;

function testRandom() {
   testSeed = (testSeed * 16807) % 2147483647;
   return (testSeed - 1) / 2147483646;
}

function pickRandom(array) {
   return array[Math.floor(testRandom() * array.length)];
}

function createTestUsers() {
   const firstNames = [
      "Ingrid",
      "Lars",
      "Nora",
      "Emil",
      "Sofie",
      "Jonas",
      "Emma",
      "Henrik",
      "Maja",
      "Sander",
      "Thea",
      "Magnus",
      "Ida",
      "Mathias",
      "Sara",
      "Elias",
      "Linnea",
      "Kristian",
      "Hedda",
      "Tobias",
      "Amalie",
      "Aksel",
      "Frida",
      "Martin",
      "Julie",
      "Sigurd",
      "Vilde",
      "Oskar",
      "Mia",
      "Kasper",
      "Tuva",
      "Even",
      "Selma",
      "Jakob",
      "Live",
      "Filip",
      "Oda",
      "Adrian",
      "Ronja",
      "Håkon",
   ];
   const lastNames = [
      "Hansen",
      "Johansen",
      "Olsen",
      "Larsen",
      "Andersen",
      "Pedersen",
      "Nilsen",
      "Kristiansen",
      "Jensen",
      "Karlsen",
      "Berg",
      "Haugen",
      "Hagen",
      "Bakken",
      "Dahl",
      "Lie",
      "Moen",
      "Strand",
      "Solberg",
      "Eide",
   ];
   const pictures = [
      "default-avatar",
      "avatar-red",
      "avatar-blue",
      "avatar-green",
      "avatar-purple",
      "avatar-yellow",
      "avatar-pink",
      "avatar-orange",
      "avatar-teal",
      "avatar-gray",
      "avatar-navy",
      "avatar-brown",
      "avatar-mint",
      "avatar-wine",
      "shape-check",
      "shape-ring",
      "shape-split",
      "shape-dots",
      "shape-stack",
      "shape-sun",
      "shape-wave",
      "shape-quarter",
      "shape-moon",
      "shape-mountain",
      "shape-plus",
      "shape-diamond",
   ];
   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const usedNames = [];
   const usedCodes = model.data.users.map((user) => user.code);

   let testUserAmount = 100;
   for (let i = 0; i < testUserAmount; i++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - (i % 42));

      let username = pickRandom(firstNames) + " " + pickRandom(lastNames);
      while (usedNames.includes(username))
         username = pickRandom(firstNames) + " " + pickRandom(lastNames);
      usedNames.push(username);

      let code = "";
      while (code === "" || usedCodes.includes(code)) {
         code =
            pickRandom(letters) +
            pickRandom(letters) +
            pickRandom(letters) +
            "-" +
            (100 + Math.floor(testRandom() * 900));
      }
      usedCodes.push(code);

      model.data.users.push({
         id: `test${i}`,
         username: username,
         password: "123",
         profilePicture: `assets/images/profile-pictures/${pickRandom(pictures)}.svg`,
         code: code,
         isPremium: i > testUserAmount / 2 ? true : false,
         role: "user",
         createdAt: createdAt.toISOString().slice(0, 10),
         invitedTo: [],
         sentInvites: [],
         favorites: [],
      });
   }
}

function createTestLists() {
   const testLists = [
      {
         title: "Pakkeliste til hyttetur",
         tasks: [
            "Pakke sovepose",
            "Ta med ullsokker",
            "Lade hodelykt",
            "Kjøpe fyrstikker",
            "Pakke kortstokk",
            "Handle frokostmat",
            "Ta med vedsekk",
            "Pakke regntøy",
         ],
      },
      {
         title: "Fjelltur i Jotunheimen",
         tasks: [
            "Sjekke værmeldingen",
            "Booke hytte på DNT",
            "Kjøpe turkart",
            "Smøre fjellstøvler",
            "Pakke førstehjelpsskrin",
            "Kjøpe sjokolade",
            "Lade powerbank",
            "Planlegge rute",
         ],
      },
      {
         title: "Handleliste til grillfest",
         tasks: [
            "Kjøpe pølser",
            "Kjøpe hamburgerbrød",
            "Kjøpe grillkull",
            "Lage potetsalat",
            "Kjøpe brus",
            "Kjøpe ketchup og sennep",
            "Hente engangsgrill",
            "Kjøpe is til dessert",
         ],
      },
      {
         title: "Russetid 2027",
         tasks: [
            "Bestille russedress",
            "Lage russekort",
            "Velge russenavn",
            "Spare til buss",
            "Lage russelåt-budsjett",
            "Planlegge russetreff",
            "Kjøpe russelue",
            "Lage russeknuter-liste",
         ],
      },
      {
         title: "Bryllupsplanlegging",
         tasks: [
            "Booke lokale",
            "Sende invitasjoner",
            "Bestille bryllupskake",
            "Velge musikk",
            "Kjøpe ringer",
            "Finne fotograf",
            "Lage bordplassering",
            "Prøve brudekjole",
         ],
      },
      {
         title: "Flytting til Bergen",
         tasks: [
            "Bestille flyttebil",
            "Pakke kjøkkenet",
            "Melde flytting",
            "Si opp strøm",
            "Kjøpe flytteesker",
            "Vaske gammel leilighet",
            "Bytte adresse i banken",
            "Kjøpe paraply",
         ],
      },
      {
         title: "Oppussing av bad",
         tasks: [
            "Velge fliser",
            "Bestille rørlegger",
            "Kjøpe nytt speil",
            "Rive gammelt gulv",
            "Male taket",
            "Montere dusjvegg",
            "Kjøpe håndklestativ",
            "Fuge fliser",
         ],
      },
      {
         title: "Ukesmeny",
         tasks: [
            "Taco fredag",
            "Fiskegrateng mandag",
            "Pasta carbonara",
            "Kyllingsalat",
            "Pannekaker søndag",
            "Lasagne onsdag",
            "Laksewok",
            "Grønnsakssuppe",
         ],
      },
      {
         title: "Eksamensplan vår",
         tasks: [
            "Repetere matte",
            "Lese norsk pensum",
            "Gjøre gamle eksamener",
            "Lage tankekart",
            "Lese engelsk",
            "Møte kollokviegruppe",
            "Spørre lærer om oppgaven",
            "Sove nok før eksamen",
         ],
      },
      {
         title: "Julegaver 2026",
         tasks: [
            "Kjøpe gave til mamma",
            "Kjøpe gave til pappa",
            "Pakke inn gaver",
            "Bestille på nett",
            "Kjøpe julekort",
            "Lage hjemmelaget gave",
            "Kjøpe gave til bestemor",
            "Kjøpe gavepapir",
         ],
      },
      {
         title: "Bursdag til mamma",
         tasks: [
            "Bestille bord",
            "Kjøpe blomster",
            "Lage bursdagskake",
            "Skrive kort",
            "Kjøpe gave",
            "Invitere tante",
            "Pynte stua",
            "Kjøpe lys til kaka",
         ],
      },
      {
         title: "Treningsprogram 12 uker",
         tasks: [
            "Løpe 5 km",
            "Styrketrening bein",
            "Styrketrening overkropp",
            "Yoga og tøying",
            "Svømme 1 km",
            "Intervalltrening",
            "Hviledag",
            "Logge fremgang",
         ],
      },
      {
         title: "Tur til Roma",
         tasks: [
            "Bestille flybilletter",
            "Booke hotell",
            "Kjøpe billetter til Colosseum",
            "Besøke Vatikanet",
            "Spise ekte carbonara",
            "Kaste mynt i Fontana di Trevi",
            "Veksle euro",
            "Laste ned kart offline",
         ],
      },
      {
         title: "Lesesirkel",
         tasks: [
            "Velge neste bok",
            "Lese kapittel 1–5",
            "Booke møterom",
            "Lage diskusjonsspørsmål",
            "Kjøpe kaffe og kaker",
            "Sende påminnelse",
            "Skrive anmeldelse",
            "Stemme over neste bok",
         ],
      },
      {
         title: "Hagearbeid i mai",
         tasks: [
            "Klippe plenen",
            "Så gulrøtter",
            "Plante tomater",
            "Luke bedet",
            "Beskjære busker",
            "Kjøpe jord",
            "Vanne blomster",
            "Male gjerdet",
         ],
      },
      {
         title: "Studietur til London",
         tasks: [
            "Bestille fly",
            "Booke hostel",
            "Kjøpe Oyster card",
            "Besøke British Museum",
            "Se Big Ben",
            "Lage felles budsjett",
            "Sjekke pass",
            "Bestille musikalbilletter",
         ],
      },
      {
         title: "Sykkeltur rundt Mjøsa",
         tasks: [
            "Service på sykkelen",
            "Pumpe dekkene",
            "Kjøpe reserveslange",
            "Planlegge overnatting",
            "Pakke sykkelvesker",
            "Smøre kjedet",
            "Kjøpe sportsdrikke",
            "Laste ned ruten",
         ],
      },
      {
         title: "Dugnad i borettslaget",
         tasks: [
            "Henge opp oppslag",
            "Leie container",
            "Kjøpe søppelsekker",
            "Rake løv",
            "Vaske trappeoppgangen",
            "Kjøpe pizza til alle",
            "Male benkene",
            "Rydde sykkelboden",
         ],
      },
      {
         title: "Hackathon-forberedelser",
         tasks: [
            "Danne team",
            "Velge idé",
            "Sette opp GitHub-repo",
            "Lage wireframe",
            "Installere verktøy",
            "Lage pitch-presentasjon",
            "Kjøpe energidrikk",
            "Teste demoen",
         ],
      },
      {
         title: "Bandøving setliste",
         tasks: [
            "Øve på refrenget",
            "Stemme gitarene",
            "Lære ny cover",
            "Booke øvingslokale",
            "Skrive ny tekst",
            "Ta opp demo",
            "Bytte trommeskinn",
            "Lage setliste til konsert",
         ],
      },
      {
         title: "Fotballaget – utstyr",
         tasks: [
            "Kjøpe nye baller",
            "Vaske draktene",
            "Bestille kjegler",
            "Kjøpe vannflasker",
            "Fikse målnettet",
            "Lage kampoppsett",
            "Samle inn kontingent",
            "Kjøpe førstehjelpsutstyr",
         ],
      },
      {
         title: "Kanotur i Femunden",
         tasks: [
            "Leie kanoer",
            "Kjøpe vanntette sekker",
            "Pakke telt",
            "Kjøpe fiskekort",
            "Planlegge leirplasser",
            "Pakke primus",
            "Ta med myggmiddel",
            "Sjekke vannstand",
         ],
      },
      {
         title: "17. mai-komiteen",
         tasks: [
            "Bestille korps",
            "Lage leker til barna",
            "Kjøpe pølser og is",
            "Pynte med flagg",
            "Skrive talen",
            "Lage vaktliste",
            "Kjøpe premier",
            "Ordne lydanlegg",
         ],
      },
      {
         title: "Interrail 2027",
         tasks: [
            "Kjøpe interrailpass",
            "Planlegge rute",
            "Booke nattog",
            "Kjøpe reiseforsikring",
            "Pakke lett",
            "Laste ned appen",
            "Lage budsjett",
            "Finne hostels",
         ],
      },
      {
         title: "Skitur til Trysil",
         tasks: [
            "Smøre skiene",
            "Kjøpe heiskort",
            "Booke hytte",
            "Leie snowboard",
            "Pakke skibriller",
            "Kjøpe kvikk lunsj",
            "Sjekke snøforhold",
            "Fordele bilplasser",
         ],
      },
      {
         title: "Matpakke-ideer",
         tasks: [
            "Wraps med kylling",
            "Pastasalat",
            "Grovbrød med egg",
            "Hjemmelaget hummus",
            "Frukt og nøtter",
            "Rundstykker med ost",
            "Nudlesalat",
            "Smoothie på flaske",
         ],
      },
      {
         title: "Strikkeprosjekter",
         tasks: [
            "Strikke lue",
            "Kjøpe garn",
            "Strikke votter",
            "Finne genseroppskrift",
            "Strikke skjerf",
            "Lære ny maske",
            "Strikke sokker",
            "Felle av genseren",
         ],
      },
      {
         title: "Podcastideer",
         tasks: [
            "Kjøpe mikrofon",
            "Lage intro-musikk",
            "Finne første gjest",
            "Skrive manus",
            "Velge podcastnavn",
            "Lage logo",
            "Spille inn episode 1",
            "Laste opp til Spotify",
         ],
      },
      {
         title: "Spillkveld",
         tasks: [
            "Kjøpe snacks",
            "Velge brettspill",
            "Invitere vennene",
            "Lade kontrollerne",
            "Lage quiz",
            "Kjøpe brus",
            "Rydde stua",
            "Bestille pizza",
         ],
      },
      {
         title: "Vårrengjøring",
         tasks: [
            "Vaske vinduer",
            "Rydde boden",
            "Bytte til sommerdekk",
            "Sortere klær",
            "Vaske kjøleskapet",
            "Støvsuge bilen",
            "Gi bort gamle ting",
            "Vaske gardiner",
         ],
      },
      {
         title: "Søknader sommerjobb",
         tasks: [
            "Oppdatere CV",
            "Skrive søknadsbrev",
            "Søke på butikkjobb",
            "Søke i kommunen",
            "Spørre om referanse",
            "Øve på intervju",
            "Lage LinkedIn-profil",
            "Følge opp søknader",
         ],
      },
      {
         title: "Nyttårsfest",
         tasks: [
            "Kjøpe raketter",
            "Lage festmeny",
            "Invitere gjester",
            "Kjøpe pynt",
            "Lage spilleliste",
            "Kjøpe champagne",
            "Planlegge leker",
            "Rydde dagen etter",
         ],
      },
      {
         title: "Turliste Lofoten",
         tasks: [
            "Reinebringen",
            "Henningsvær",
            "Haukland strand",
            "Kvalvika",
            "Nusfjord",
            "Ryten",
            "Hamnøy",
            "Å i Lofoten",
         ],
      },
      {
         title: "Babyutstyr",
         tasks: [
            "Kjøpe barnevogn",
            "Kjøpe bilstol",
            "Montere stellebord",
            "Vaske babyklær",
            "Kjøpe bleier",
            "Pakke sykehusbag",
            "Kjøpe babycall",
            "Male barnerommet",
         ],
      },
      {
         title: "Valpeforberedelser",
         tasks: [
            "Kjøpe hundeseng",
            "Kjøpe valpefôr",
            "Melde på valpekurs",
            "Kjøpe bånd og sele",
            "Valpesikre leiligheten",
            "Finne veterinær",
            "Kjøpe tyggeleker",
            "Bestemme navn",
         ],
      },
      {
         title: "Fisketur i Nordmarka",
         tasks: [
            "Kjøpe fiskekort",
            "Sjekke fiskestanga",
            "Kjøpe sluk",
            "Pakke matpakke",
            "Planlegge vann",
            "Ta med kniv",
            "Pakke termos",
            "Lade kamera",
         ],
      },
      {
         title: "Klassetur 10. trinn",
         tasks: [
            "Samle inn penger",
            "Booke buss",
            "Lage aktivitetsliste",
            "Hente samtykkeskjema",
            "Booke overnatting",
            "Lage romfordeling",
            "Planlegge kveldsprogram",
            "Kjøpe førstehjelp",
         ],
      },
      {
         title: "Restauranter å prøve",
         tasks: [
            "Ramen-stedet på Grünerløkka",
            "Tapasbaren i sentrum",
            "Den nye burgerbaren",
            "Indisk på hjørnet",
            "Sushi ved sjøen",
            "Vegansk kafé",
            "Matmarkedet",
            "Etiopisk restaurant",
         ],
      },
      {
         title: "Filmmaraton",
         tasks: [
            "Velge filmserie",
            "Lage popcorn",
            "Kjøpe godteri",
            "Hente tepper",
            "Teste prosjektoren",
            "Lage kinobilletter",
            "Invitere venner",
            "Bestemme pauser",
         ],
      },
      {
         title: "Påskefjellet",
         tasks: [
            "Kjøpe appelsiner",
            "Smøre skiene",
            "Kjøpe påskekrim",
            "Pakke solkrem",
            "Kjøpe Kvikk Lunsj",
            "Lage påskeeggjakt",
            "Pakke solbriller",
            "Kjøpe marsipan",
         ],
      },
      {
         title: "Hjemmekontor-oppsett",
         tasks: [
            "Kjøpe skjerm",
            "Kjøpe kontorstol",
            "Ordne kabler",
            "Kjøpe skrivebordslampe",
            "Sette opp webkamera",
            "Kjøpe plante",
            "Kjøpe hodetelefoner",
            "Lage fast rutine",
         ],
      },
      {
         title: "Konfirmasjon",
         tasks: [
            "Booke lokale",
            "Sende invitasjoner",
            "Kjøpe bunad-sølje",
            "Bestille kake",
            "Skrive takketale",
            "Lage bordkort",
            "Bestille fotograf",
            "Kjøpe dress",
         ],
      },
      {
         title: "Juleverksted",
         tasks: [
            "Kjøpe glitter",
            "Lage julekurver",
            "Bake pepperkaker",
            "Lage julestjerner",
            "Kjøpe papp og lim",
            "Lage nisser",
            "Dekorere pepperkakehus",
            "Kjøpe gløgg",
         ],
      },
      {
         title: "Loppemarked",
         tasks: [
            "Samle inn ting",
            "Prise varer",
            "Låne bord",
            "Henge opp plakater",
            "Lage kaffeservering",
            "Ordne vekslepenger",
            "Rydde etterpå",
            "Lage Vipps-skilt",
         ],
      },
      {
         title: "Bilferie i Sverige",
         tasks: [
            "Service på bilen",
            "Planlegge rute",
            "Booke campingplass",
            "Kjøpe veibok",
            "Pakke kjølebag",
            "Besøke Liseberg",
            "Handle på Strömstad",
            "Kjøpe kanelbullar",
         ],
      },
      {
         title: "Kakebaking",
         tasks: [
            "Bake skillingsboller",
            "Lage sjokoladekake",
            "Kjøpe smør og mel",
            "Bake brownies",
            "Lage muffins",
            "Pynte kake",
            "Kjøpe kakeformer",
            "Bake kanelsnurrer",
         ],
      },
      {
         title: "Blomster på balkongen",
         tasks: [
            "Kjøpe blomsterkasser",
            "Plante petunia",
            "Kjøpe gjødsel",
            "Plante urter",
            "Kjøpe vannkanne",
            "Plante jordbær",
            "Henge opp lys",
            "Vanne hver kveld",
         ],
      },
      {
         title: "Kodeprosjekt",
         tasks: [
            "Sette opp repo",
            "Lage wireframe",
            "Skrive modellen",
            "Lage view-funksjoner",
            "Fikse bugs",
            "Skrive README",
            "Committe og pushe",
            "Presentere for klassen",
         ],
      },
      {
         title: "Bokhylla",
         tasks: [
            "Sult – Knut Hamsun",
            "1984 – George Orwell",
            "Harry Potter-serien",
            "Dune – Frank Herbert",
            "Hobbiten – J.R.R. Tolkien",
            "Naiv. Super. – Erlend Loe",
            "Doppler – Erlend Loe",
            "Kongen av Os – Jo Nesbø",
         ],
         allTasks: true,
      },
      {
         title: "Sommerfest på jobben",
         tasks: [
            "Booke lokale",
            "Lage invitasjon",
            "Bestille catering",
            "Planlegge quiz",
            "Kjøpe premier",
            "Ordne DJ",
            "Lage gjesteliste",
            "Rydde etterpå",
         ],
      },
      {
         title: "Favorittfilmer",
         tasks: [
            "Interstellar",
            "Løvenes konge",
            "Ringenes herre",
            "Spider-Verse",
            "Oppdrag Nemo",
            "Cast Away",
            "Inception",
            "Mamma Mia!",
         ],
         allTasks: true,
      },
      {
         title: "Gaveideer",
         tasks: [
            "Brettspill",
            "Kokebok",
            "Ullsokker",
            "Konsertbilletter",
            "Kaffekopp med navn",
            "Puslespill",
            "Potteplante",
            "Gavekort på kino",
         ],
      },
      {
         title: "Steder jeg vil reise",
         tasks: [
            "Tokyo",
            "Island",
            "Roma",
            "New York",
            "Barcelona",
            "Cape Town",
            "Svalbard",
            "Lisboa",
         ],
         allTasks: true,
      },
      {
         title: "Sanger til roadtrip",
         tasks: [
            "Take On Me – a-ha",
            "Africa – Toto",
            "Mr. Brightside – The Killers",
            "Dancing Queen – ABBA",
            "Don't Stop Me Now – Queen",
            "Wonderwall – Oasis",
            "Hey Ya! – OutKast",
            "Livin' on a Prayer – Bon Jovi",
         ],
      },
      {
         title: "Ting å lære",
         tasks: [
            "Spille gitar",
            "Sjonglere",
            "Strikke",
            "Koding i JavaScript",
            "Spansk",
            "Skrive med pekefingre",
            "Kortstokktriks",
            "Lage sushi",
         ],
      },
   ];
   const allUsers = model.data.users.filter((user) => user.role !== "admin");
   const premiumUsers = allUsers.filter((user) => user.isPremium);

   const simpleTitles = [
      "Restauranter å prøve",
      "Bokhylla",
      "Turliste Lofoten",
      "Favorittfilmer",
      "Gaveideer",
      "Steder jeg vil reise",
      "Sanger til roadtrip",
      "Ting å lære",
   ];

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
      const randomAmount = 3 + Math.floor(testRandom() * (availableTasks.length - 2));
      const itemAmount = testLists[i].allTasks ? availableTasks.length : randomAmount;
      for (let j = 0; j < itemAmount; j++) {
         const taskIndex = Math.floor(testRandom() * availableTasks.length);
         const text = availableTasks.splice(taskIndex, 1)[0];
         const isCompleted = testRandom() < 0.4;
         items.push({
            id: `i${j + 1}`,
            text: text,
            isCompleted: isCompleted,
            addedBy: pickRandom(members),
            // ikke tilfeldig, så resten av testdataen blir lik som før
            completedBy: isCompleted ? members[(i + j) % members.length] : null,
         });
      }

      const type = simpleTitles.includes(testLists[i].title) ? "simple" : "tasks";
      if (type === "simple") {
         items.forEach((item) => {
            item.isCompleted = false;
            item.completedBy = null;
         });
      }

      model.data.lists.push({
         id: `t${i + 1}`,
         title: testLists[i].title,
         type: type,
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

   for (const user of testUsers) {
      const userLists = model.data.lists.filter(
         (list) => list.ownerId === user.id || list.members.includes(user.id),
      );
      const favoriteAmount = Math.min(userLists.length, Math.floor(testRandom() * 4));
      for (let i = 0; i < favoriteAmount; i++) {
         const list = pickRandom(userLists);
         if (!user.favorites.includes(list.id)) user.favorites.push(list.id);
      }
   }
}

// delte notater der flere har skrevet, valgt uten testRandom så resten av testdataen blir lik
function createTestNotes() {
   const testNotes = [
      {
         title: "Planlegging av russebuss",
         memberAmount: 8,
         daysAgo: 2,
         blocks: [
            ["h3", "Det vi må bestemme", [0]],
            ["li", "Navn på bussen", [0, 3]],
            ["li", "Farge på dressene", [1]],
            ["li", "Hvem som tar kontakt med sjåfør", [2, 5]],
            [
               "p",
               "Vi har fått tilbud fra to firmaer. Det billigste er <b>48 000 kr</b> per person, men da må vi pusse opp innsiden selv.",
               [0],
            ],
            [
               "p",
               'Jeg kan spørre onkelen min, han driver med lyd og lys <mark data-color="green">gratis</mark>',
               [4],
            ],
            ["h3", "Navneforslag", [3]],
            ["li", "Nattens Ridder", [3]],
            ["li", "Kaos på Hjul", [6]],
            ["li", "Ikke Spør Mamma", [7, 1]],
            ["p", "<mark>Avstemning på fredag</mark>, alle må stemme!", [0]],
         ],
      },
      {
         title: "Felles middagsplan",
         memberAmount: 4,
         daysAgo: 5,
         blocks: [
            ["h3", "Denne uka", [0]],
            ["li", "<b>Mandag:</b> taco", [0]],
            ["li", "<b>Tirsdag:</b> fiskesuppe", [1]],
            ["li", "<b>Onsdag:</b> rester", [2]],
            ["li", "<b>Torsdag:</b> pizza", [3, 0]],
            ["p", 'Husk at ikke alle spiser <mark data-color="pink">skalldyr</mark>.', [1]],
            ["p", "Jeg handler på lørdag, skriv i handlelista hvis dere trenger noe.", [0]],
         ],
      },
      {
         title: "Gruppeoppgave: klimaendringer",
         memberAmount: 5,
         withOle: true,
         daysAgo: 9,
         blocks: [
            ["h3", "Fordeling", [0]],
            ["p", "<b>Innledning</b> og <b>konklusjon</b> skriver vi sammen til slutt.", [0, 1]],
            ["li", "Årsaker", [1]],
            ["li", "Konsekvenser for Norge", [2, 3]],
            ["li", "Hva vi kan gjøre", [4]],
            ["h3", "Kilder", [2]],
            [
               "p",
               'Bruk helst <mark data-color="blue">snl.no</mark> og FNs klimapanel, ikke Wikipedia.',
               [2],
            ],
            ["p", "Frist for utkast er <mark>onsdag kl. 20</mark>.", [0]],
         ],
      },
      {
         title: "Bokklubb",
         memberAmount: 3,
         withOle: true,
         daysAgo: 14,
         blocks: [
            ["h3", "Neste bok", [0]],
            ["p", "Vi leser <i>Sult</i> av Knut Hamsun til neste gang.", [0]],
            ["p", "Litt tung i starten, men det tar seg opp etter kapittel tre.", [1]],
            ["h3", "Spørsmål til diskusjon", [2]],
            ["li", "Hvorfor tror dere han nekter å ta imot hjelp?", [2]],
            ["li", "Er fortelleren til å stole på?", [1, 2]],
         ],
      },
      {
         title: "Påsketur til Hemsedal",
         memberAmount: 7,
         daysAgo: 20,
         blocks: [
            ["h3", "Praktisk", [0]],
            ["p", "Hytta har plass til <b>åtte</b>, så alle får en seng.", [0]],
            [
               "p",
               'Vi kjører fra Oslo <mark data-color="orange">skjærtorsdag kl. 09</mark>.',
               [0, 2],
            ],
            ["h3", "Hvem tar med hva", [1]],
            ["li", "Brettspill", [1]],
            ["li", "Appelsiner og Kvikk Lunsj", [3]],
            ["li", "Høyttaler", [4]],
            ["li", "Ski-smøring", [5, 6]],
            ["p", "Noen som vil kjøre opp sammen med meg dagen før?", [6]],
         ],
      },
      {
         title: "Ideer til bandnavn",
         memberAmount: 2,
         daysAgo: 30,
         blocks: [
            ["li", "De Glemte Notene", [0]],
            ["li", "Fuzz og Fjell", [1]],
            ["li", "Måkene", [0]],
            [
               "p",
               'Jeg stemmer for <mark data-color="purple">Måkene</mark>, kort og lett å huske.',
               [1],
            ],
         ],
      },
   ];

   const premiumUsers = model.data.users.filter(
      (user) => user.id.startsWith("test") && user.isPremium,
   );
   const testUsers = model.data.users.filter((user) => user.id.startsWith("test"));

   for (let i = 0; i < testNotes.length; i++) {
      const note = testNotes[i];
      const owner = premiumUsers[(i * 7) % premiumUsers.length];
      const members = [owner.id];
      if (note.withOle) members.push("u1");

      let k = 0;
      while (members.length < note.memberAmount) {
         const member = testUsers[(i * 13 + k * 11) % testUsers.length];
         if (!members.includes(member.id)) members.push(member.id);
         k++;
      }

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - note.daysAgo);

      model.data.lists.push({
         id: `n${i + 1}`,
         title: note.title,
         type: "note",
         ownerId: owner.id,
         isShared: true,
         completedItems: 0,
         totalItems: 0,
         members: members,
         items: [],
         content: buildTestNote(note.blocks, members),
         createdAt: createdAt.toISOString().slice(0, 10),
      });
   }
}

// gjør om [tag, tekst, forfattere] til html, og legger listepunkter etter hverandre i en <ul>
function buildTestNote(blocks, members) {
   let html = "";
   let inList = false;
   for (const [tag, text, authors] of blocks) {
      if (tag === "li" && !inList) html += "<ul>";
      if (tag !== "li" && inList) html += "</ul>";
      inList = tag === "li";
      html += `<${tag} data-authors="${authors.map((index) => members[index]).join(" ")}">${text}</${tag}>`;
   }
   if (inList) html += "</ul>";
   return html;
}
