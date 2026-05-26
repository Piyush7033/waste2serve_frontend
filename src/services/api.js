import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { getToken, clearAuthData } from '../utils/localStorage.js';

/**
 * ================= AXIOS INSTANCE =================
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * ================= REQUEST INTERCEPTOR =================
 */
api.interceptors.request.use(

  (config) => {

    const token = getToken();

    // Add token if available
    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    console.error('REQUEST ERROR =>', error);

    return Promise.reject(error);

  }

);

/**
 * ================= RESPONSE INTERCEPTOR =================
 */
api.interceptors.response.use(

  // SUCCESS RESPONSE
  (response) => {

    console.log('API SUCCESS RESPONSE =>', response);

    // IMPORTANT:
    // Return FULL response instead of response.data
    return response;

  },

  // ERROR RESPONSE
  (error) => {

    console.error('API ERROR RESPONSE =>', error);

    // Unauthorized
    if (error.response?.status === 401) {

      clearAuthData();

      window.location.href = '/login';

    }

    // Return full error
    return Promise.reject(error);

  }

);

export default api;