<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">登入</h2>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">電子郵件</label>
                <input v-model="email" type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input v-model="password" type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                {{ isLoading ? '登入中...' : '登入' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { login } from '../services/api';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const isLoading = ref(false);
      const router = useRouter();
      const store = useStore();
  
      const handleLogin = async () => {
        isLoading.value = true;
        error.value = '';
        try {
          const response = await login(email.value, password.value);
          const token = response.data.token;
          localStorage.setItem('token', token);
          store.commit('setLoggedIn', true);
          router.push('/');
        } catch (err) {
          error.value = err.response?.data?.message || '登入失敗，請稍後再試';
        } finally {
          isLoading.value = false;
        }
      };
  
      return {
        email,
        password,
        error,
        isLoading,
        handleLogin
      };
    }
  }
  </script>