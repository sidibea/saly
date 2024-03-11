import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
          next();
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
      authRequired: true,
    },
    component: () => import("../views/dashboard/simple/index.vue"),
  },

  {
    path: "/collectivites/contribuables",
    name: "contribuables",
    meta: {
      title: "Contribuables",
      authRequired: true,
    },
    children:[
      {
        path: "",
        name: "listeContribuables",
        meta: {
          title: "Contribuables",
          authRequired: true,
        },
        component: () => import("../views/contribuables/liste")

      },
      {
        path: ":id/fiche",
        name: "ficheContribuables",
        meta: {
          title: "Contribuables",
          authRequired: true,
        },
        component: () => import("../views/contribuables/fiche.vue")

      }
    ]
  },
  {
    path: "/collectivites/equipements",
    name: "equipements",
    meta: {
      title: "Equipements",
      authRequired: true,
    },
    children:[
      {
        path: "",
        name: "listeEquipements",
        meta: {
          title: "Equipements",
          authRequired: true,
        },
        component: () => import("../views/equipements/liste")

      },
      {
        path: ":id/fiche",
        name: "ficheContribuables",
        meta: {
          title: "Contribuables",
          authRequired: true,
        },
        component: () => import("../views/contribuables/fiche.vue")

      }
    ]
  },
  {
    path: "/collectivites/transactions",
    name: "transactions",
    meta: {
      title: "Transactions",
      authRequired: true,
    },
    children:[
      {
        path: "",
        name: "listeTransactions",
        meta: {
          title: "Transactions",
          authRequired: true,
        },
        component: () => import("../views/transactions/liste")

      },
      {
        path: ":id/fiche",
        name: "ficheContribuables",
        meta: {
          title: "Contribuables",
          authRequired: true,
        },
        component: () => import("../views/contribuables/fiche.vue")

      }
    ]
  },
  {
    path: "/collectivites/configurations/sous-entites",
    name: "ramifications",
    meta: {
      title: "Sous-entités",
      authRequired: true,
    },
    children:[
      {
        path: "",
        name: "listeSousEntites",
        meta: {
          title: "Sous-entités",
          authRequired: true,
        },
        component: () => import("../views/configurations/ramifications/liste")

      },
      {
        path: "",
        name: "createRamification",
        meta: {
          title: "Ramifications",
          authRequired: true,
        },
        component: () => import("../views/configurations/ramifications/liste")

      },
      {
        path: ":id/edit",
        name: "editRamification",
        meta: {
          title: "Sous-entités",
          authRequired: true,
        },
        component: () => import("../views/contribuables/fiche.vue")

      }
    ]
  },

  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout", authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        localStorage.clear();
        sessionStorage.clear();
        next();
      },
    },
    component: () => import("../views/auth/logout/basic")
  },

];