import { createRouter, createWebHistory } from 'vue-router';
import Account from '../views/AccountRouter.vue';
import Cart from '../views/CartRouter.vue';
import Catalog from '../views/CatalogRouter.vue';
import HomeRouter from '../views/HomeRouter.vue';
import AddingBook from '../views/AddingBook.vue';
import EditBook from '@/components/EditBook.vue';
// import CatalogItem from '@/components/CatalogItem.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeRouter
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Cart
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/addingBook',
    name: 'addingBook',
    component: AddingBook,
  },
  {
    path: '/edit-book/:book',
    name: 'edit-book',
    component: EditBook
    // path: '/edit-book/:book',
    // name: 'EditBook',
    // component: EditBook,
    // props: (route) => ({
    //   book: route.params.book,
    // })
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
