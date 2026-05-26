import api from './api.js';

const ADMIN_ENDPOINTS = {
  GET_USERS: '/admin/users',
  GET_FOODS: '/admin/foods',
  GET_REQUESTS: '/admin/requests',
  GET_STATS: '/admin/stats'
};

/**
 * Get all users
 */
export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const response = await api.get(ADMIN_ENDPOINTS.GET_USERS, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all foods
 */
export const getAllFoods = async (page = 0, size = 10) => {
  try {
    const response = await api.get(ADMIN_ENDPOINTS.GET_FOODS, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all requests
 */
export const getAllRequests = async (page = 0, size = 10) => {
  try {
    const response = await api.get(ADMIN_ENDPOINTS.GET_REQUESTS, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get(ADMIN_ENDPOINTS.GET_STATS);
    return response;
  } catch (error) {
    throw error;
  }
};