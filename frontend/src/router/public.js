const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/ResetPassword.vue'),
      },
      {
        path: 'reset-password-confirm',
        name: 'reset-password-confirm',
        component: () => import('@/views/resetPasswordConfirm.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

export default routes;
