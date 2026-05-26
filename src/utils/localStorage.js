// LocalStorage keys
const STORAGE_KEYS = {
  TOKEN: 'authToken',
  USER: 'authUser',
  THEME: 'theme'
};

// Save token
export const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Save user
export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// Get user
export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};