import api from './api.js';

const REQUEST_ENDPOINTS = {
  CREATE: '/requests',
  GET_MY: '/requests/my',
  GET_MY_FOODS: '/requests/my-foods',
  GET_BY_ID: (id) => `/requests/${id}`,
  APPROVE: (id) => `/requests/${id}/approve`,
  REJECT: (id) => `/requests/${id}/reject`,
  COMPLETE: (id) => `/requests/${id}/complete`
};

/**
 * Create food request
 */
export const createFoodRequest = async (foodId, quantityRequested) => {
  try {
    const response = await api.post(REQUEST_ENDPOINTS.CREATE, {
      foodId,
      quantityRequested: parseInt(quantityRequested)
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get my requests (receiver)
 */
export const getMyRequests = async (page = 0, size = 10) => {
  try {
    const response = await api.get(REQUEST_ENDPOINTS.GET_MY, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get requests for my foods (donor)
 */
export const getRequestsForMyFoods = async (page = 0, size = 10) => {
  try {
    const response = await api.get(REQUEST_ENDPOINTS.GET_MY_FOODS, {
      params: { page, size }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get request by ID
 */
export const getRequestById = async (id) => {
  try {
    const response = await api.get(REQUEST_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Approve request
 */
export const approveRequest = async (id) => {
  try {
    const response = await api.post(REQUEST_ENDPOINTS.APPROVE(id));
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Reject request
 */
export const rejectRequest = async (id, reason) => {
  try {
    const response = await api.post(REQUEST_ENDPOINTS.REJECT(id), null, {
      params: { reason }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Complete request
 */
export const completeRequest = async (id) => {
  try {
    const response = await api.post(REQUEST_ENDPOINTS.COMPLETE(id));
    return response;
  } catch (error) {
    throw error;
  }
};