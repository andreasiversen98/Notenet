const model = {
   app: {
      currentPage: "login",
      currentUserId: "",
   },

   viewstate: {
      login: {
         username: "",
         password: "",
      },

      register: {
         username: "",
         password: "",
      },

      landingPage: {
         logo: null,
         createList: {
            isShared: null,
            title: null,
         },
         listView: {
            filter: null,
            content: null,
         },
      },

      list: {
         private: {
            logo: null,
            title: null,
            createItem: null,
            itemCount: null,
            items: [],
            completedItems: [],
         },
         shared: {
            logo: null,
            title: null,
            memberCount: null,
            itemCount: null,
            createItem: null,
            items: [],
            completedItems: null,
            inviteCode: null,
         },
      },

      invitations: {
         code: "",
         foundUserId: "",
      },

      profile: {
         user: {
            free: {
               logo: null,
               profilePicture: null,
               isPremium: null,
               name: null,
               shareCode: null,
               listCount: {
                  all: null,
                  shared: null,
                  private: null,
               },
            },
            premium: {},
         },
         admin: {
            search: "",
            filter: "alle",
            page: 1,
            selectedUserId: "",
         },
      },

      selectedListId: "",
   },

   data: {
      users: [
         {
            id: "u1",
            username: "Ole",
            code: "FLT-034",
            isPremium: false,
            role: "user",
         },
         {
            id: "u2",
            username: "Terje",
            code: "TTQ-805",
            isPremium: false,
            role: "user",
         },
         {
            id: "u3",
            username: "Kenneth",
            code: "BNR-114",
            isPremium: true,
            role: "user",
         },
         {
            id: "u4",
            username: "Rebecka",
            code: "ORW-135",
            isPremium: true,
            role: "admin",
         },
         {
            id: "u5",
            username: "Geir",
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
            items: [],
         },
         {
            id: "l2",
            title: "Episke gjøremål",
            ownerId: "u2",
            isShared: true,
            completedItems: 5,
            totalItems: 23,
            items: [],
         },
         {
            id: "l3",
            title: "Crazy banan liste",
            ownerId: "u3",
            isShared: true,
            completedItems: 39,
            totalItems: 42,
            items: [],
         },
         {
            id: "l4",
            title: "To cosplay or not todo",
            ownerId: "u4",
            isShared: false,
            completedItems: 9,
            totalItems: 14,
            items: [],
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
//test
