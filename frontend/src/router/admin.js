const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: 'users/',
        name: 'admin-users',
        component: () => import('@/views/admin/Users.vue'),
      },
      {
        path: 'users/update/:id',
        name: 'admin-users-update',
        component: () => import('@/views/admin/UpdateUser.vue'),
      },
      {
        path: 'users/create',
        name: 'admin-users-create',
        component: () => import('@/views/admin/CreateUser.vue'),
      },
    ],
  },
]

export default routes;
