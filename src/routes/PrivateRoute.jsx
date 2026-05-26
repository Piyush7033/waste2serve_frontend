import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children, allowedRoles = [] }) => {

  const { isLoggedIn, user, loading } = useAuth();

  // ==============================
  // LOADING STATE
  // ==============================
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        Loading...
      </div>
    );
  }

  // ==============================
  // NOT LOGGED IN
  // ==============================
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // ==============================
  // NORMALIZE ROLE SAFELY
  // ==============================
  const role = (user?.role || "").toUpperCase();

  // ==============================
  // ROLE REDIRECT MAP (CLEAN FIX)
  // ==============================
  const roleRedirectMap = {
    ADMIN: "/admin/dashboard",
    DONOR: "/donor/dashboard",
    RECEIVER: "/receiver/dashboard",
  };

  // ==============================
  // ROLE CHECK (IF RESTRICTION EXISTS)
  // ==============================
  if (allowedRoles.length > 0) {

    const normalizedAllowed = allowedRoles.map(r => r.toUpperCase());

    // ❌ ACCESS DENIED
    if (!normalizedAllowed.includes(role)) {
      return (
        <Navigate
          to={roleRedirectMap[role] || "/dashboard"}
          replace
        />
      );
    }
  }

  // ==============================
  // ACCESS ALLOWED
  // ==============================
  return children;
};

export default PrivateRoute;