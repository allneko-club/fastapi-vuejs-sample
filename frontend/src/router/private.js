const routes = [
  {
    path: "/private",
    name: "private",
    component: () => import('@/views/private/Main.vue'),
    children: [
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
        component: () => import('@/views/private/UserUpdatePassword.vue'),
      },
    ]
  },
]

export default routes;
