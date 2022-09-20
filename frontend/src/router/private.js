const routes = [
  {
    path: "/private",
    name: "private",
    component: () => import('@/views/private/Private.vue'),
    children: [
      {
        path: 'account',
        name: 'profile',
        component: () => import('@/views/private/Profile.vue'),
      },
      {
        path: 'account/edit',
        name: 'update-profile',
        component: () => import('@/views/private/UpdateProfile.vue'),
      },
      {
        path: 'account/update-password',
        name: 'update-password',
        component: () => import('@/views/private/UpdatePassword.vue'),
      },
    ]
  },
]

export default routes;
