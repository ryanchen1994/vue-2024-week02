<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="todo.completed"
        @change="toggleComplete"
        :id="'todo-' + todo.id"
      >
      <label class="form-check-label" :for="'todo-' + todo.id" :class="{ 'text-decoration-line-through': todo.completed }">
        {{ todo.content }}
      </label>
    </div>
    <button @click="$emit('delete', todo.id)" class="btn btn-danger btn-sm">刪除</button>
  </li>
</template>

<script>
export default {
  props: ['todo'],
  setup(props, { emit }) {
    const toggleComplete = () => {
      emit('update', props.todo.id, {
        ...props.todo,
        completed: !props.todo.completed
      });
    };

    return { toggleComplete };
  }
};
</script>
