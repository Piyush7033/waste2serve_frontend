import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginUser } from '../services/authService.js';
import { validateEmail } from '../utils/validators.js';
import '../styles/pages.css';

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= VALIDATION =================
  const validateForm = () => {

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // clear errors
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ================= HANDLE LOGIN =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // role check
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    setLoading(true);

    try {

      // ================= LOGIN API =================
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      console.log("FULL LOGIN RESPONSE:", response);

      // ================= TOKEN EXTRACTION =================
      const token =
        response?.token ||
        response?.data?.token ||
        response?.jwt ||
        response?.data?.jwt ||
        response?.accessToken ||
        response?.data?.accessToken;

      // ================= USER EXTRACTION =================
      const user =
        response?.user ||
        response?.data?.user ||
        response?.data;

      // ================= ROLE EXTRACTION =================
      const backendRole =
        (
          response?.role ||
          response?.data?.role ||
          user?.role ||
          selectedRole
        ).toUpperCase();

      // ================= VALIDATION =================
      if (!token) {
        alert("JWT Token not received from backend ❌");
        console.log("Token Missing");
        return;
      }

      if (!user) {
        alert("User data missing ❌");
        console.log("User Missing");
        return;
      }

      // ================= SAVE DATA =================
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", backendRole);

      // ================= DEBUG =================
      console.log("TOKEN SAVED:", localStorage.getItem("token"));
      console.log("USER SAVED:", localStorage.getItem("user"));
      console.log("ROLE SAVED:", localStorage.getItem("role"));

      // ================= CONTEXT LOGIN =================
      login(user, token);

      alert(`Login Successful as ${backendRole} ✅`);

      // ================= ROLE REDIRECT =================
      switch (backendRole) {

        case "DONOR":
          navigate('/donor/dashboard', { replace: true });
          break;

        case "RECEIVER":
          navigate('/receiver/available-foods', { replace: true });
          break;

        case "ADMIN":
          navigate('/admin/dashboard', { replace: true });
          break;

        default:
          navigate('/dashboard', { replace: true });
      }

    } catch (error) {

      console.log("LOGIN ERROR:", error);

      alert(
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'Login Failed ❌'
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="left-content">

          <span className="auth-badge">
            Safe, secure login
          </span>

          <h1>
            Share Food, Spread Humanity ❤️
          </h1>

          <p>
            Join our Food Donation System and help reduce hunger.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="auth-card">

          <h2 className="auth-title">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />

              {
                errors.email &&
                <span className="error-text">
                  {errors.email}
                </span>
              }

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />

              {
                errors.password &&
                <span className="error-text">
                  {errors.password}
                </span>
              }

            </div>

            {/* ROLE */}
            <div className="role-selector">

              <p className="role-title">
                Choose Role
              </p>

              <div className="role-buttons">

                <button
                  type="button"
                  className={
                    selectedRole === "DONOR"
                      ? "role-btn active donor"
                      : "role-btn"
                  }
                  onClick={() => setSelectedRole("DONOR")}
                >
                  DONOR
                </button>

                <button
                  type="button"
                  className={
                    selectedRole === "RECEIVER"
                      ? "role-btn active receiver"
                      : "role-btn"
                  }
                  onClick={() => setSelectedRole("RECEIVER")}
                >
                  RECEIVER
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              className="auth-btn"
              disabled={loading}
            >
              {
                loading
                  ? 'Logging in...'
                  : 'Login'
              }
            </button>

          </form>

          <p className="auth-link">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;