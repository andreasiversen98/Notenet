const model = {
  app: {
    currentPage: "login",
    currentUserId: "",
  },

  viewState: {
    loginPage: {
      username: "",
      password: "",
    },

    registerPage: {
      username: "",
      password: "",
    },

    landingPage: {
      createList: {
        isShared: null,
        title: "",
        selectedFilter: "",
      },
    },

    listPage: {
      newItemTitle: "",
      editingItemId: null,
      editingItemTitle: "",
      selectedListId: "",
    },

    invitationPage: {
      code: "",
      foundUserId: "",
    },

    userProfilePage: {
      editProfile: {
        username: "",
        image: "",
      },
    },

    adminUserOverview: {
      search: "",
      selectedFilter: null,
      page: null,
      selectedUserId: "",
    },

    adminUserActions: {
      changeUserStatus: null,
      removeUser: null,
    },
  },

  data: {
    users: [
      {
        id: "u1",
        username: "Ole",
        password: "123",
        profilePicture: "../../src/images/image.svg",
        code: "FLT-034",
        isPremium: false,
        role: "user",
      },
      {
        id: "u2",
        username: "Terje",
        password: "234",
        profilePicture: "../../src/images/image.svg",
        code: "TTQ-805",
        isPremium: false,
        role: "user",
      },
      {
        id: "u3",
        username: "Kenneth",
        password: "742",
        profilePicture: "../../src/images/image.svg",
        code: "BNR-114",
        isPremium: true,
        role: "user",
      },
      {
        id: "u4",
        username: "Rebecka",
        password: "555",
        profilePicture: "../../src/images/image.svg",
        code: "ORW-135",
        isPremium: true,
        role: "admin",
      },
      {
        id: "u5",
        username: "Geir",
        password: "888",
        profilePicture: "../../src/images/image.svg",
        code: "LWH-385",
        isPremium: false,
        role: "user",
      },
    ],

    lists: [
      {
        id: "l1",
        title: "Awesome list of fun",
        ownerId: "u1",
        isShared: true,
        completedItems: 0,
        totalItems: 12,
        members: null,
        items: [],
      },
      {
        id: "l2",
        title: "Episke gjøremål",
        ownerId: "u2",
        isShared: true,
        completedItems: 5,
        totalItems: 23,
        members: null,
        items: [],
      },
      {
        id: "l3",
        title: "Crazy banan liste",
        ownerId: "u3",
        isShared: true,
        completedItems: 39,
        totalItems: 42,
        members: null,
        items: [],
      },
      {
        id: "l4",
        title: "To cosplay or not todo",
        ownerId: "u4",
        isShared: false,
        completedItems: 9,
        totalItems: 14,
        items: [
          { id: "i1", text: "Kjøpe stoff til kostyme", isCompleted: true },
          { id: "i2", text: "Sy om ermene", isCompleted: false },
          { id: "i3", text: "Lage sverd av foam", isCompleted: false },
        ],
      },
      {
        id: "l5",
        title: "Planer for å ta over verden",
        ownerId: "u4",
        isShared: false,
        completedItems: 560,
        totalItems: 1793,
        items: [],
      },
    ],

    invitations: [{ id: "inv1", userId: "u1", listId: "l1", status: "venter" }],
  },
};
