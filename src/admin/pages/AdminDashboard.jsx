import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import { Users, CheckCircle2, Slash, Package } from 'lucide-react';

import API from '../../api/axios';

import './AdminDashboard.css';

const AdminDashboard = () => {

  // ================= STATE =================
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    disabledUsers: 0,
    totalFood: 0
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD STATS =================
  const fetchDashboardStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      console.log("Admin Token:", token);

      const response = await API.get(
        "/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Dashboard Stats:",
        response.data
      );

      setStats(response.data);

    } catch (error) {

      console.error(
        "Dashboard Fetch Error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {

    fetchDashboardStats();

  }, []);

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="admin-main">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="admin-content">

          <h1 className="admin-heading">
            Admin Dashboard
          </h1>

          {/* LOADING */}
          {loading ? (

            <p className="loading-text">
              Loading dashboard...
            </p>

          ) : (

            <div className="dashboard-cards">
              <DashboardCard
                title="Total Users"
                count={stats.totalUsers}
                Icon={Users}
                note="All registered users on the platform"
              />

              <DashboardCard
                title="Active Users"
                count={stats.activeUsers}
                Icon={CheckCircle2}
                note="Users currently active"
              />

              <DashboardCard
                title="Disabled Users"
                count={stats.disabledUsers}
                Icon={Slash}
                note="Accounts temporarily disabled"
              />

              <DashboardCard
                title="Total Donations"
                count={stats.totalFood}
                Icon={Package}
                note="Food donations tracked"
              />
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;