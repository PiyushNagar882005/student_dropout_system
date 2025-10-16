import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 5000,
});

export async function predictStudent(payload) {
  const res = await api.post('/students/predict', payload);
  return res.data;
}

export default api;
