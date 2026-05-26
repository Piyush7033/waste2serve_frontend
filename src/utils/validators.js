// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Form validation
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    } else if (rule.type === 'email' && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email';
    } else if (rule.type === 'password' && value && !validatePassword(value)) {
      errors[field] = 'Password must be at least 6 characters';
    } else if (rule.type === 'phone' && value && !validatePhone(value)) {
      errors[field] = 'Please enter a valid 10-digit phone number';
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
    }
  });

  return errors;
};