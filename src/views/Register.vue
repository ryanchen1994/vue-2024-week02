<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center mb-4">註冊</h2>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label">電子郵件</label>
          <input v-model="email" type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">密碼</label>
          <input v-model="password" type="password" class="form-control" id="password" required>
        </div>
        <div class="mb-3">
          <label for="nickname" class="form-label">暱稱</label>
          <input v-model="nickname" type="text" class="form-control" id="nickname" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">註冊</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { register } from '../services/api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const nickname = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const handleRegister = async () => {
      try {
        await register(email.value, password.value, nickname.value);
        router.push('/login');
      } catch (error) {
        errorMessage.value = error.response?.data?.message || '註冊失敗，請稍後再試';
      }
    };

    return { email, password, nickname, handleRegister, errorMessage };
  }
};
</script>