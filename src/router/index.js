import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { useStore } from 'vuex';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.state.isLoggedIn;

  if (to.path !== '/login' && to.path !== '/register' && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
