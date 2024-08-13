<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">TodoList</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">登入</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/register">註冊</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click.prevent="handleLogout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="flex-grow-1">
      <div class="container py-4">
        <router-view @login="setLoggedIn(true)" @logout="setLoggedIn(false)"></router-view>
      </div>
    </main>
    <footer class="bg-dark text-light py-3 mt-auto">
      <div class="container text-center">
        &copy; 2024 TodoList App
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from './services/api';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('token'));
    const router = useRouter();
    const store = useStore();

    const setLoggedIn = (value) => {
      isLoggedIn.value = value;
    };

    const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem('token');
        setLoggedIn(false);
        router.push('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    onMounted(() => {
      store.dispatch('checkAuth');
    });

    return {
      isLoggedIn,
      setLoggedIn,
      handleLogout
    };
  }
}
</script>
