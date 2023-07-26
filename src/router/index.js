import { createRouter, createWebHistory } from 'vue-router';
import HomeRouter from '../views/HomeRouter.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeRouter
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountRouter.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartRouter.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/CatalogRouter.vue')
  },
  {
    path: '/addingBook',
    name: 'addingBook',
    component: () => import('../views/AddingBook.vue'),
  },
  {
    path: '/edit-book/',
    name: 'editBook',
    component: () => import('@/components/EditBook.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
