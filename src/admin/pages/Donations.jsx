



import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Package, CircleDot, Timer, CheckCircle2, Trash2 } from 'lucide-react';

import API from '../../api/axios';

import './Donations.css';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDonations = async () => {

    try {

      setLoading(true);

      setError("");

      // ✅ GET TOKEN
      const token =
        localStorage.getItem("authToken");

      console.log("TOKEN:", token);

      // ✅ API CALL
      const response = await API.get(
        "/admin/food",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "DONATIONS:",
        response.data
      );

      // ✅ SAVE DATA
      setDonations(response.data || []);

    } catch (error) {

      console.error(
        "FETCH ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to fetch donations"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    fetchDonations();

  }, []);

  // =========================================
  // DELETE DONATION
  // =========================================

  const deleteDonation = async (id) => {

    try {

      const token =
        localStorage.getItem("authToken");

      await API.delete(
        `/admin/food/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchDonations();

    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete donation');
    }
  };

  const statusClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'available':
        return 'available';
      case 'requested':
        return 'requested';
      case 'accepted':
        return 'accepted';
      default:
        return 'pending';
    }
  };

  const counts = {
    total: donations.length,
    available: donations.filter((item) => (item.status || '').toLowerCase() === 'available').length,
    requested: donations.filter((item) => (item.status || '').toLowerCase() === 'requested').length,
    accepted: donations.filter((item) => (item.status || '').toLowerCase() === 'accepted').length,
  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="admin-content">

          <h1 className="page-title">
            All Donations
          </h1>

          {/* LOADING */}
          {loading && (

            <p className="loading-text">
              Loading donations...
            </p>

          )}

          {/* ERROR */}
          {!loading && error && (

            <p className="error-text">
              {error}
            </p>

          )}

          {/* TABLE */}
          {!loading && !error && (

            <div className="table-container">

              <table className="donation-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Food Title</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Expiry Time</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {donations.length > 0 ? (

                    donations.map((item) => (

                      <tr key={item.id}>

                        {/* ID */}
                        <td>{item.id}</td>

                        {/* TITLE */}
                        <td>{item.title}</td>

                        {/* DESCRIPTION */}
                        <td>{item.description}</td>

                        {/* QUANTITY */}
                        <td>{item.quantity}</td>

                        {/* LOCATION */}
                        <td>{item.location}</td>

                        {/* STATUS */}
                        <td>

                          <span
                            className={`status-badge ${item.status?.toLowerCase()}`}
                          >
                            {item.status}
                          </span>

                        </td>

                        {/* EXPIRY */}
                        <td>

                          {item.expiryTime
                            ? new Date(
                                item.expiryTime
                              ).toLocaleString()
                            : "N/A"}

                        </td>

                        {/* ACTION */}
                        <td>

                          <button
                            className="action-btn delete-btn"
                            onClick={() => deleteDonation(item.id)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="8">
                        No donations found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Donations;