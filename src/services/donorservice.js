import api from './api.js';

const DONOR_ENDPOINTS = {
  ADD_FOOD: '/donor/food',
  MY_DONATIONS: '/donor/foods',
  DONATION_HISTORY: '/donor/history',
  DELETE_FOOD: (id) => `/donor/food/${id}`,
  UPDATE_FOOD: (id) => `/donor/food/${id}`,
};

/**
 * ================= ADD FOOD =================
 * Create new food donation
 */
export const addFood = async (foodData) => {
  try {
    const response = await api.post(
      DONOR_ENDPOINTS.ADD_FOOD,
      foodData
    );

    return response;
  } catch (error) {
    console.error('ADD FOOD ERROR =>', error);
    throw error;
  }
};

/**
 * ================= GET MY DONATIONS =================
 * Fetch all foods added by logged-in donor
 */
export const getMyDonations = async () => {
  try {
    const response = await api.get(
      DONOR_ENDPOINTS.MY_DONATIONS
    );

    return response;
  } catch (error) {
    console.error('MY DONATIONS ERROR =>', error);
    throw error;
  }
};

/**
 * ================= GET DONATION HISTORY =================
 */
export const getDonationHistory = async () => {
  try {
    const response = await api.get(
      DONOR_ENDPOINTS.DONATION_HISTORY
    );

    return response;
  } catch (error) {
    console.error('DONATION HISTORY ERROR =>', error);
    throw error;
  }
};

/**
 * ================= UPDATE FOOD =================
 */
export const updateFood = async (id, foodData) => {
  try {
    const response = await api.put(
      DONOR_ENDPOINTS.UPDATE_FOOD(id),
      foodData
    );

    return response;
  } catch (error) {
    console.error('UPDATE FOOD ERROR =>', error);
    throw error;
  }
};

/**
 * ================= DELETE FOOD =================
 */
export const deleteFood = async (id) => {
  try {
    const response = await api.delete(
      DONOR_ENDPOINTS.DELETE_FOOD(id)
    );

    return response;
  } catch (error) {
    console.error('DELETE FOOD ERROR =>', error);
    throw error;
  }
};