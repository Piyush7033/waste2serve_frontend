import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

// ================= PUBLIC =================
import HomePage from './pages/HomePages.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// ================= ADMIN =================
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import Donations from './admin/pages/Donations.jsx';
import Receivers from './admin/pages/Receivers.jsx';

// ================= DONOR =================
import DonorDashboard from './pages/donor/DonorDashboard.jsx';
import AddFood from './pages/donor/AddFood.jsx';
import MyDonations from './pages/donor/MyDonations.jsx';
import DonationHistory from './pages/donor/DonationHistory.jsx';

// ================= RECEIVER =================
import ReceiverDashboard from './pages/receiver/ReceiverDashboard.jsx';
import AvailableFoods from './pages/receiver/AvailableFoods.jsx';
import MyRequests from './pages/receiver/MyRequests.jsx';
import FoodDetails from './pages/receiver/FoodDetails.jsx';


// ==========================================
// ROLE REDIRECT (IMPROVED)
// ==========================================
const RoleRedirect = () => {

  const role = (localStorage.getItem('role') || '').toUpperCase();

  switch (role) {
    case 'ADMIN':
      return <Navigate to="/admin/dashboard" replace />;

    case 'DONOR':
      return <Navigate to="/donor/dashboard" replace />;

    case 'RECEIVER':
      return <Navigate to="/receiver/dashboard" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
};


// ==========================================
// APP LAYOUT
// ==========================================
function AppLayout() {

  const location = useLocation();

  // hide navbar only for admin pages
  const hideLayout = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout">

      {!hideLayout && <Navbar />}

      <main className="app-content">
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= AUTO ROLE DASHBOARD ================= */}
          <Route path="/dashboard" element={<RoleRedirect />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/donations"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <Donations />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/receivers"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <Receivers />
              </PrivateRoute>
            }
          />

          {/* ================= DONOR ================= */}
          <Route
            path="/donor/dashboard"
            element={
              <PrivateRoute allowedRoles={['DONOR']}>
                <DonorDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/donor/add-food"
            element={
              <PrivateRoute allowedRoles={['DONOR']}>
                <AddFood />
              </PrivateRoute>
            }
          />

          <Route
            path="/donor/my-donations"
            element={
              <PrivateRoute allowedRoles={['DONOR']}>
                <MyDonations />
              </PrivateRoute>
            }
          />

          <Route
            path="/donor/history"
            element={
              <PrivateRoute allowedRoles={['DONOR']}>
                <DonationHistory />
              </PrivateRoute>
            }
          />

          {/* ================= RECEIVER ================= */}
          {/* <Route
            path="/receiver/dashboard"
            element={
              <PrivateRoute allowedRoles={['RECEIVER']}>
                <ReceiverDashboard />
              </PrivateRoute>
            }
          /> */}

          <Route
            path="/receiver/available-foods"
            element={
              <PrivateRoute allowedRoles={['RECEIVER']}>
                <AvailableFoods />
              </PrivateRoute>
            }
          />

          <Route
            path="/receiver/requests"
            element={
              <PrivateRoute allowedRoles={['RECEIVER']}>
                <MyRequests />
              </PrivateRoute>
            }
          />

          <Route
            path="/receiver/food/:id"
            element={
              <PrivateRoute allowedRoles={['RECEIVER']}>
                <FoodDetails />
              </PrivateRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}

    </div>
  );
}


// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;