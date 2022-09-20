const routes = [
  {
    path: "/private",
    name: "private",
    component: () => import('@/views/private/Private.vue'),
    children: [
      {
        path: 'account',
        name: 'private-profile',
        component: () => import('@/views/private/Profile.vue'),
      },
      {
        path: 'account/edit',
        name: 'private-profile-update',
        component: () => import('@/views/private/UpdateProfile.vue'),
      },
      {
        path: 'account/update-password',
        name: 'private-profile-update-password',
        component: () => import('@/views/private/UpdatePassword.vue'),
      },
    ]
  },
]

export default routes;
