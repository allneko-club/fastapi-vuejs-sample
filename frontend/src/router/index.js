import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../views/LoginView.vue"),
        },
        {
          path: 'recover-password',
          name: 'recover-password',
          component: () => import('../views/PasswordRecovery.vue'),
        },
      ],
    },
    {
      path: "/main",
      name: "main",
      component: () => import('../views/main/Main.vue'),
      redirect: 'main/dashboard',
      children: [
        {
          path: 'dashboard',
          name: "main-dashboard",
          component: () => import("../views/main/Dashboard.vue"),
        },
        {
          path: 'account',
          name: 'main-account',
          component: () => import('../views/main/profile/UserAccount.vue'),
        },
        {
          path: 'account/edit',
          name: 'main-account-update',
          component: () => import('../views/main/profile/UserProfileUpdate.vue'),
        },
        {
          path: 'account/update-password',
          name: 'main-account-update-password',
          component: () => import('../views/main/profile/UserProfileUpdatePassword.vue'),
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/main/admin/Admin.vue'),
      children: [
        {
          path: 'users/',
          name: 'admin-users',
          component: () => import('../views/main/admin/AdminUsers.vue'),
        },
        {
          path: 'users/edit/:id',
          name: 'admin-users-edit',
          component: () => import('../views/main/admin/EditUser.vue'),
        },
        {
          path: 'users/create',
          name: 'admin-users-create',
          component: () => import('../views/main/admin/CreateUser.vue'),
        },
      ],
    },
  ],
});

export default router;
