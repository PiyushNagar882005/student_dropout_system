import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://student-dropout-system-1-oigt.onrender.com';

const api = axios.create({
  baseURL: `${backendUrl.replace(/\/$/, '')}/api`,
  timeout: 5000,
});

export async function predictStudent(payload) {
  const res = await api.post('/students/predict', payload);
  return res.data;
}

export async function getSubmissions(limit = 50) {
  const res = await api.get(`/admin/submissions?limit=${limit}`);
  return res.data;
}

export default api;
