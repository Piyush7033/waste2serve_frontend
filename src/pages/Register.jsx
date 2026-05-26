import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { registerUser } from '../services/authService.js';
import { validateEmail, validatePhone } from '../utils/validators.js';
import { USER_ROLES } from '../utils/constants.js';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: USER_ROLES.RECEIVER,
    phone: '',
    address: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      alert('Registration Successful ✅');

      if (response?.token && response?.user) {
        login(response.user, response.token);
      }

      navigate('/dashboard');

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        'Registration Failed ❌'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <div className="register-card">

        <div className="register-header">
          <h1>🍱 Food Donation</h1>
          <p>Create your account and help reduce food waste</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <small className="error-text">{errors.name}</small>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <small className="error-text">{errors.password}</small>
            )}
          </div>

          <div className="input-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value={USER_ROLES.RECEIVER}>
                Receiver
              </option>

              <option value={USER_ROLES.DONOR}>
                Donor
              </option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <small className="error-text">{errors.phone}</small>
            )}
          </div>

          <div className="input-group">
            <label>Address</label>

            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="row-fields">

            <div className="input-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>State</label>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;