import {
  createWebHistory,
  createRouter
} from 'vue-router';
// import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        meta: { requiresAuth: false, },
        component: () => import('../views/LandingPage.vue'),
        name: 'LandingPage',
    },
    {
        path: '/login',
        meta: { requiresAuth: false, },
        component: () => import('../views/user-mgt/LoginPage.vue'),
        name: 'LoginPage',
    },
    {
        path: '/register',
        meta: { requiresAuth: false, },
        component: () => import('../views/user-mgt/RegisterPage.vue'),
        name: 'RegisterPage',
    },
    {
      path: '/fund-all/expense-trancker',
      component: () => import('../views/expense-tracker/ExpenseTrackerPage.vue'),
      name: "FundAll",
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../NotFoundView.vue'),
      name: 'NotFoundView'
    },
  ]
});

router.beforeEach((to) => {
  console.log('the  route to =>', to);
  if (to.name === "LoginPage") {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem("tokenData");
  };
  // current running app
  const checkTokenInStorage = localStorage.token
  // const auth = useAuthStore();

  if (to.meta.requiresAuth && !checkTokenInStorage) {
    // auth.setError = 'Please login with your credentials';
    return '/login'
  };
})

export default router