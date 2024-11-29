import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Update with your FastAPI URL

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token); // Store JWT token
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { login, getToken };
