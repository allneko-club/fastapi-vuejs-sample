const routes = [
  {
    path: "/private",
    name: "private",
    component: () => import('@/views/private/Main.vue'),
    redirect: 'private/dashboard',
    children: [
      {
        path: 'dashboard',
        name: "private-dashboard",
        component: () => import("@/views/private/Dashboard.vue"),
      },
      {
        path: 'account',
        name: 'private-account',
        component: () => import('@/views/private/UserAccount.vue'),
      },
      {
        path: 'account/edit',
        name: 'private-account-update',
        component: () => import('@/views/private/UserProfileUpdate.vue'),
      },
      {
        path: 'account/update-password',
        name: 'private-account-update-password',
        component: () => import('@/views/private/UserProfileUpdatePassword.vue'),
      },
    ]
  },
]

export default routes;
