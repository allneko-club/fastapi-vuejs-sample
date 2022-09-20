const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    children: [
      {
      path: "login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      },
      {
        path: 'recover-password',
        name: 'recover-password',
        component: () => import('@/views/PasswordRecovery.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // component: NotFound,
    redirect: '/',
  },
]

export default routes;
