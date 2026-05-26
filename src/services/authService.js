import api from './api.js';

const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login'
};

/**
 * ================= REGISTER USER =================
 */
export const registerUser = async (formData) => {

  try {

    const response = await api.post(
      AUTH_ENDPOINTS.REGISTER,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state
      }
    );

    console.log('REGISTER API RESPONSE =>', response);

    /**
     * Since api.js already returns response,
     * return complete response here
     */
    return response;

  } catch (error) {

    console.error('REGISTER API ERROR =>', error);

    throw error;

  }

};

/**
 * ================= LOGIN USER =================
 */
export const loginUser = async (formData) => {

  try {

    const response = await api.post(
      AUTH_ENDPOINTS.LOGIN,
      {
        email: formData.email,
        password: formData.password
        
      }
    );

    console.log('LOGIN API RESPONSE =>', response);

    /**
     * IMPORTANT
     * Return complete response
     */
    return response;

  } catch (error) {

    console.error('LOGIN API ERROR =>', error);

    throw error;

  }

};

/**
 * ================= LOGOUT USER =================
 */
export const logoutUser = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('user');

};