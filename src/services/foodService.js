import api from './api.js';

const FOOD_ENDPOINTS = {
  CREATE: '/foods',
  GET_ALL: '/foods',
  GET_MY_DONATIONS: '/foods/my-donations',
  GET_BY_ID: (id) => `/foods/${id}`,
  UPDATE: (id) => `/foods/${id}`,
  DELETE: (id) => `/foods/${id}`
};

/**
 * Create food donation
 */
export const createFood = async (formData) => {
  try {
    const response = await api.post(FOOD_ENDPOINTS.CREATE, {
      title: formData.title,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      expiryDate: formData.expiryDate
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all available foods
 */
export const getAllFoods = async (page = 0, size = 10, sortBy = 'createdAt', direction = 'DESC') => {
  try {
    const response = await api.get(FOOD_ENDPOINTS.GET_ALL, {
      params: { page, size, sortBy, direction }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get my donations
 */
export const getMyDonations = async (page = 0, size = 10) => {
  try {
    const response = await api.get(FOOD_ENDPOINTS.GET_MY_DONATIONS, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get food by ID
 */
export const getFoodById = async (id) => {
  try {
    const response = await api.get(FOOD_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update food
 */
export const updateFood = async (id, formData) => {
  try {
    const response = await api.put(FOOD_ENDPOINTS.UPDATE(id), {
      title: formData.title,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      expiryDate: formData.expiryDate
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete food
 */
export const deleteFood = async (id) => {
  try {
    const response = await api.delete(FOOD_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    throw error;
  }
};