// API Base URL from environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://waste2servebackend-production.up.railway.app/api';

// User Roles
export const USER_ROLES = {
  DONOR: 'DONOR',
  RECEIVER: 'RECEIVER',
  ADMIN: 'ADMIN'
};

// Food Status
export const FOOD_STATUS = {
  AVAILABLE: 'AVAILABLE',
  REQUESTED: 'REQUESTED',
  DONATED: 'DONATED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION: 'Registration successful!',
  LOGIN: 'Login successful!',
  FOOD_CREATED: 'Food donation created successfully!',
  FOOD_UPDATED: 'Food donation updated successfully!',
  FOOD_DELETED: 'Food donation deleted successfully!',
  REQUEST_CREATED: 'Request created successfully!',
  REQUEST_APPROVED: 'Request approved successfully!',
  REQUEST_REJECTED: 'Request rejected successfully!',
  REQUEST_COMPLETED: 'Request completed successfully!'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User already exists with this email.',
  FIELD_REQUIRED: 'All fields are required.',
  INVALID_EMAIL: 'Please enter a valid email.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.'
};