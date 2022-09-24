import {createRouter, createWebHistory} from 'vue-router';
import adminRoutes from '@/router/admin';
import publicRoutes from '@/router/public';
import privateRoutes from '@/router/private';

const routes = publicRoutes.concat(privateRoutes, adminRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
