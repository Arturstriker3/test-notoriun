
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const urlBase = `${apiUrl}`;

const apiService = {
  auth: `${urlBase}/auth`,
  user: `${urlBase}/users`,
};

export default apiService;