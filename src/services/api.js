import axios from 'axios';

const API_URL = 'https://todolist-api.hexschool.io';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (email, password, nickname) => {
  return api.post('/users/sign_up', { email, password, nickname });
};

export const login = (email, password) => {
  return api.post('/users/sign_in', { email, password });
};

export const logout = () => {
  return api.post('/users/sign_out');
};

export const getTodos = () => {
  return api.get('/todos');
};

export const createTodo = (todo) => {
    return api.post('/todos', {
      content: todo.content,
      status: todo.completed
    });
  };
  
  
  export const updateTodo = (id, todo) => {
    return api.put(`/todos/${id}`, {
      content: todo.content,
      status: todo.completed
    });
  };
  

export const deleteTodo = (id) => {
  return api.delete(`/todos/${id}`);
};

export default api;