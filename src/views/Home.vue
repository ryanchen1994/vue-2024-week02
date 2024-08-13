<template>
  <div class="card">
    <div class="card-body">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <form @submit.prevent="addTodo" class="mb-4">
        <div class="input-group">
          <input v-model="newTodo" type="text" class="form-control" placeholder="新增待辦事項" required>
          <button class="btn btn-primary" type="submit" :disabled="isLoading">
            {{ isLoading ? '新增中...' : '新增' }}
          </button>
        </div>
      </form>
      <ul v-if="todos && todos.length > 0" class="list-group">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo"
          @delete="deleteTodo"
        />
      </ul>
      <p v-else-if="!isLoading" class="text-center text-muted">目前沒有待辦事項</p>
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import TodoItem from '../components/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  setup() {
    const todos = ref([]);
    const newTodo = ref('');
    const error = ref('');
    const isLoading = ref(false);

    const fetchTodos = async () => {
      isLoading.value = true;
      error.value = '';
      try {
        const response = await getTodos();
        todos.value = response.data.data.map(todo => ({
          id: todo.id,
          content: todo.content,
          completed: todo.status
        }));
      } catch (err) {
        error.value = '獲取待辦事項失敗';
        console.error('Error fetching todos:', err);
      } finally {
        isLoading.value = false;
      }
    };

    const addTodo = async () => {
      if (newTodo.value.trim()) {
        isLoading.value = true;
        error.value = '';
        try {
          const response = await createTodo({ 
            content: newTodo.value, 
            completed: false 
          });


          if (response.status === 200 || response.status === 201) { 
            todos.value.push({
              id: response.data.newTodo.id,
              content: response.data.newTodo.content,
              completed: response.data.newTodo.status
            });
            newTodo.value = '';
          } else {
            error.value = '新增待辦事項失敗';
            console.error('API 回應非成功狀態碼', response);
          }
        } catch (err) {
          error.value = '新增待辦事項失敗';
          console.error('新增待辦事項失敗，捕捉到的錯誤:', err.response || err);
        } finally {
          isLoading.value = false;
        }
      }
    };





    const handleUpdateTodo = async (id, updatedTodo) => {
      error.value = '';
      try {
        await updateTodo(id, updatedTodo);
        const index = todos.value.findIndex(todo => todo.id === id);
        if (index !== -1) {
          todos.value[index] = { ...todos.value[index], ...updatedTodo };
        }
      } catch (err) {
        error.value = '更新待辦事項失敗';
        console.error('Error updating todo:', err);
      }
    };

    const handleDeleteTodo = async (id) => {
      error.value = '';
      try {
        await deleteTodo(id);
        todos.value = todos.value.filter(todo => todo.id !== id);
      } catch (err) {
        error.value = '刪除待辦事項失敗';
        console.error('Error deleting todo:', err);
      }
    };

    onMounted(fetchTodos);

    return {
      todos,
      newTodo,
      error,
      isLoading,
      addTodo,
      updateTodo: handleUpdateTodo,
      deleteTodo: handleDeleteTodo
    };
  }
};
</script>
