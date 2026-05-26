import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getDashboardStats } from '../services/adminService.js';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import '../styles/dashboard.css';

const Dashboard = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await getDashboardStats();

        if (response?.success) {

          setStats(response.data);

        }

      } catch (error) {

        console.error('Dashboard Error:', error);

      } finally {

        setLoading(false);

      }

    };

    // Admin only
    if (user?.role === 'ADMIN') {

      fetchStats();

    } else {

      setLoading(false);

    }

  }, [user]);

  if (loading) {

    return <Loading />;

  }

  return (

    <div className="dashboard-container">

      <div className="container-fluid py-4">

        {/* ================= HEADER ================= */}
        <div className="dashboard-header">

          <div>

            <h1 className="dashboard-title">
              Welcome Back, {user?.name} 👋
            </h1>

            <p className="dashboard-subtitle">
              Manage your food donation activities easily.
            </p>

          </div>

          <div className="dashboard-role">
            {user?.role}
          </div>

        </div>

        {/* ================= ADMIN DASHBOARD ================= */}
        {user?.role === 'ADMIN' && stats && (

          <>

            {/* ================= STATS ================= */}
            <div className="row g-4 mb-5">

              <div className="col-md-3">
                <div className="dashboard-card users-card">

                  <div>
                    <p>Total Users</p>
                    <h2>{stats.totalUsers}</h2>
                  </div>

                  <span>👥</span>

                </div>
              </div>

              <div className="col-md-3">
                <div className="dashboard-card donor-card">

                  <div>
                    <p>Total Donors</p>
                    <h2>{stats.totalDonors}</h2>
                  </div>

                  <span>🍱</span>

                </div>
              </div>

              <div className="col-md-3">
                <div className="dashboard-card receiver-card">

                  <div>
                    <p>Total Receivers</p>
                    <h2>{stats.totalReceivers}</h2>
                  </div>

                  <span>❤️</span>

                </div>
              </div>

              <div className="col-md-3">
                <div className="dashboard-card food-card">

                  <div>
                    <p>Total Foods</p>
                    <h2>{stats.totalFoods}</h2>
                  </div>

                  <span>🍲</span>

                </div>
              </div>

            </div>

            {/* ================= REQUESTS ================= */}
            <div className="row g-4 mb-5">

              <div className="col-md-3">
                <div className="request-card pending">
                  <h5>Pending Requests</h5>
                  <h2>{stats.pendingRequests}</h2>
                </div>
              </div>

              <div className="col-md-3">
                <div className="request-card approved">
                  <h5>Approved Requests</h5>
                  <h2>{stats.approvedRequests}</h2>
                </div>
              </div>

              <div className="col-md-3">
                <div className="request-card completed">
                  <h5>Completed Requests</h5>
                  <h2>{stats.completedRequests}</h2>
                </div>
              </div>

              <div className="col-md-3">
                <div className="request-card available">
                  <h5>Available Foods</h5>
                  <h2>{stats.availableFoods}</h2>
                </div>
              </div>

            </div>

            {/* ================= ADMIN ACTIONS ================= */}
            <div className="dashboard-section">

              <h3 className="section-title">
                Admin Controls ⚙️
              </h3>

              <div className="action-grid">

                <Link to="/manage-users" className="action-card">
                  <span>👥</span>
                  <h5>Manage Users</h5>
                  <p>View all donors and receivers</p>
                </Link>

                <Link to="/manage-foods" className="action-card">
                  <span>🍲</span>
                  <h5>Manage Foods</h5>
                  <p>Monitor all food donations</p>
                </Link>

                <Link to="/manage-requests" className="action-card">
                  <span>📦</span>
                  <h5>Manage Requests</h5>
                  <p>Approve or reject requests</p>
                </Link>

                <Link to="/reports" className="action-card">
                  <span>📊</span>
                  <h5>Reports</h5>
                  <p>View analytics and reports</p>
                </Link>

              </div>

            </div>

          </>

        )}

        {/* ================= DONOR DASHBOARD ================= */}
        {user?.role === 'DONOR' && (

          <div className="dashboard-section">

            <div className="welcome-card donor-welcome">

              <h2>
                🍱 Donor Dashboard
              </h2>

              <p>
                Help people by donating extra food.
              </p>

            </div>

            <div className="action-grid">

              <Link to="/add-food" className="action-card">
                <span>➕</span>
                <h5>Add Food</h5>
                <p>Add new food donation</p>
              </Link>

              <Link to="/my-foods" className="action-card">
                <span>🍛</span>
                <h5>My Donations</h5>
                <p>View donated foods</p>
              </Link>

              <Link to="/donation-history" className="action-card">
                <span>📜</span>
                <h5>Donation History</h5>
                <p>Check completed donations</p>
              </Link>

            </div>

          </div>

        )}

        {/* ================= RECEIVER DASHBOARD ================= */}
        {user?.role === 'RECEIVER' && (

          <div className="dashboard-section">

            <div className="welcome-card receiver-welcome">

              <h2>
                ❤️ Receiver Dashboard
              </h2>

              <p>
                Find available food donations near you.
              </p>

            </div>

            <div className="action-grid">

              <Link to="/available-foods" className="action-card">
                <span>🍲</span>
                <h5>Available Foods</h5>
                <p>Browse all food donations</p>
              </Link>

              <Link to="/my-requests" className="action-card">
                <span>📦</span>
                <h5>My Requests</h5>
                <p>Track your requests</p>
              </Link>

              <Link to="/request-history" className="action-card">
                <span>📜</span>
                <h5>Request History</h5>
                <p>See completed requests</p>
              </Link>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default Dashboard;