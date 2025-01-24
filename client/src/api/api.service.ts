import * as dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.API_URL;

const urlBase = `${apiUrl}`;

const apiService = {
  auth: `${urlBase}/auth`,
  user: `${urlBase}/users`,
};

export default apiService;