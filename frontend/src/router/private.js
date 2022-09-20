const routes = [
  {
    path: "/private",
    name: "private",
    component: () => import('@/views/private/Main.vue'),
    children: [
      {
        path: 'account',
        name: 'private-profile',
        component: () => import('@/views/private/UserProfile.vue'),
      },
      {
        path: 'account/edit',
        name: 'private-profile-update',
        component: () => import('@/views/private/UserProfileUpdate.vue'),
      },
      {
        path: 'account/update-password',
        name: 'private-profile-update-password',
        component: () => import('@/views/private/UserUpdatePassword.vue'),
      },
    ]
  },
]

export default routes;
