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
      children: [
        {
          path: 'dashboard',
          name: "main-dashboard",
          component: () => import("../views/main/Dashboard.vue"),
        },
        {
          path: 'profile',
          name: 'main-profile',
          component: () => import('../views/main/profile/UserProfile.vue'),
          children: [
            {
              path: 'edit',
              name: 'main-profile-edit',
              component: () => import('../views/main/profile/UserProfileEdit.vue'),
            },
            {
              path: 'password',
              name: 'main-profile-password',
              component: () => import('../views/main/profile/UserProfileEditPassword.vue'),
            },
            {
              path: 'reset-password',
              name: 'main-reset-password',
              component: () => import('../views/main/profile/ResetPassword.vue'),
            },
          ],
        },
        {
          path: 'admin',
          name: 'main-admin',
          component: () => import('../views/main/admin/Admin.vue'),
          redirect: 'admin/users/',
          children: [
            {
              path: 'users/',
              name: 'main-admin-users',
              component: () => import('../views/main/admin/AdminUsers.vue'),
            },
            {
              path: 'users/edit/:id',
              name: 'main-admin-users-edit',
              component: () => import('../views/main/admin/EditUser.vue'),
            },
            {
              path: 'users/create',
              name: 'main-admin-users-create',
              component: () => import('../views/main/admin/CreateUser.vue'),
            },
          ],
        }
      ],
    },
  ],
});

export default router;
