const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: 'users/',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsers.vue'),
      },
      {
        path: 'users/edit/:id',
        name: 'admin-users-edit',
        component: () => import('@/views/admin/EditUser.vue'),
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
