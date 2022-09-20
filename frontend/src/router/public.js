const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: 'recover-password',
        name: 'recover-password',
        component: () => import('@/views/RecoveryPassword.vue'),
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
