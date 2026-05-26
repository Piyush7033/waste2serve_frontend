import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Users, ShieldCheck, Activity, Package } from 'lucide-react';

import api from "../../services/api";

import "./Receivers.css";

const Receivers = () => {

  // =========================================
  // STATES
  // =========================================

  const [receivers, setReceivers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [receiverRequests, setReceiverRequests] =
    useState([]);

  const [requestLoading, setRequestLoading] =
    useState(false);

  const [error, setError] = useState("");

  // =========================================
  // COMMON TOKEN
  // =========================================

  const token =
    localStorage.getItem("token");

  // =========================================
  // FETCH RECEIVERS
  // =========================================

  const fetchReceivers = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/admin/receivers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Receivers Data:",
        response.data
      );

      setReceivers(response.data || []);

    } catch (error) {

      console.error(
        "Receiver Fetch Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to load receivers"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================
  // FETCH RECEIVER REQUESTS
  // =========================================

  const fetchReceiverRequests = async () => {

    try {

      setRequestLoading(true);

      setError("");

      const response = await api.get(
        "/request/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Receiver Requests:",
        response.data
      );

      setReceiverRequests(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Request Fetch Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to load requests"
      );

    } finally {

      setRequestLoading(false);
    }
  };

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    fetchReceivers();

    fetchReceiverRequests();

  }, []);

  // =========================================
  // DELETE RECEIVER
  // =========================================

  const deleteReceiver = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this receiver?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Receiver deleted successfully"
      );

      // REFRESH RECEIVERS
      fetchReceivers();

    } catch (error) {

      console.error(
        "Delete Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete receiver"
      );
    }
  };

  // =========================================
  // ACCEPT REQUEST
  // =========================================

  const acceptRequest = async (id) => {

    try {

      const response = await api.put(
        `/request/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Accept Response:",
        response.data
      );

      alert(
        "Request accepted successfully"
      );

      // REFRESH REQUESTS
      fetchReceiverRequests();

    } catch (error) {

      console.error(
        "Accept Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to accept request"
      );
    }
  };

  // =========================================
  // REJECT REQUEST
  // =========================================

  const rejectRequest = async (id) => {

    try {

      const response = await api.put(
        `/request/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Reject Response:",
        response.data
      );

      alert(
        "Request rejected successfully"
      );

      // REFRESH REQUESTS
      fetchReceiverRequests();

    } catch (error) {

      console.error(
        "Reject Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to reject request"
      );
    }
  };

  const summary = {
    totalReceivers: receivers.length,
    activeReceivers: receivers.filter((item) => item.active).length,
    disabledReceivers: receivers.filter((item) => !item.active).length,
    pendingRequests: receiverRequests.filter((item) => item.status === 'REQUESTED').length,
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

          <div className="receiver-hero">
            <div className="hero-copy">
              <p className="eyebrow">Receiver Management</p>
              <h1 className="receiver-page-title">All Receivers</h1>
              <p className="receiver-page-description">
                Monitor active receiver accounts, manage user status, and review pending food requests in a single easy admin view.
              </p>
            </div>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon blue">
                  <Users size={20} />
                </div>
                <div>
                  <p className="summary-label">Total Receivers</p>
                  <h2>{summary.totalReceivers}</h2>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon teal">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="summary-label">Active Receivers</p>
                  <h2>{summary.activeReceivers}</h2>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon cyan">
                  <Package size={20} />
                </div>
                <div>
                  <p className="summary-label">Disabled Receivers</p>
                  <h2>{summary.disabledReceivers}</h2>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon navy">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="summary-label">Pending Requests</p>
                  <h2>{summary.pendingRequests}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="section-block">
            <div className="section-header">
              <div>
                <h2>Registered Receivers</h2>
                <p className="section-description">
                  View receiver contact details and manage account status with fast admin actions.
                </p>
              </div>
            </div>

          {loading ? (

            <p className="loading-text">
              Loading receivers...
            </p>

          ) : (

            <div className="receiver-table-container">

              <table className="receiver-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {receivers.length > 0 ? (

                    receivers.map((receiver) => (

                      <tr key={receiver.id}>

                        <td>{receiver.id}</td>

                        <td>
                          {receiver.name || "N/A"}
                        </td>

                        <td>
                          {receiver.email || "N/A"}
                        </td>

                        <td>
                          {receiver.role || "N/A"}
                        </td>

                        <td>

                          <span
                            className={
                              receiver.active
                                ? "status-active"
                                : "status-disabled"
                            }
                          >
                            {receiver.active
                              ? "Active"
                              : "Disabled"}
                          </span>

                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteReceiver(receiver.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="6">
                        No receivers found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          )}

          </div>

          {/* ===================================== */}
          {/* REQUEST SECTION */}
          {/* ===================================== */}

          <div className="section-block">
            <div className="section-header">
              <div>
                <h2>Receiver Food Requests</h2>
                <p className="section-description">
                  Review incoming food requests and manage approval workflow from the admin panel.
                </p>
              </div>
            </div>
          </div>

          {requestLoading && (

            <p className="loading-text">
              Loading requests...
            </p>

          )}

          {error && (

            <p className="error-text">
              {error}
            </p>

          )}

          {!requestLoading && !error && (

            <div className="receiver-table-container">

              <table className="receiver-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Receiver Name</th>

                    <th>Receiver Email</th>

                    <th>Food Title</th>

                    <th>Quantity</th>

                    <th>Location</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {receiverRequests.length > 0 ? (

                    receiverRequests.map((request) => (

                      <tr key={request.id}>

                        {/* REQUEST ID */}
                        <td>{request.id}</td>

                        {/* RECEIVER NAME */}
                        <td>
                          {request.receiver?.name ||
                            "N/A"}
                        </td>

                        {/* RECEIVER EMAIL */}
                        <td>
                          {request.receiver?.email ||
                            "N/A"}
                        </td>

                        {/* FOOD TITLE */}
                        <td>
                          {request.food?.title ||
                            "N/A"}
                        </td>

                        {/* QUANTITY */}
                        <td>
                          {request.food?.quantity ||
                            "N/A"}
                        </td>

                        {/* LOCATION */}
                        <td>
                          {request.food?.location ||
                            "N/A"}
                        </td>

                        {/* STATUS */}
                        <td>

                          <span
                            className={
                              request.status ===
                              "APPROVED"
                                ? "status-active"
                                : request.status ===
                                  "REJECTED"
                                ? "status-disabled"
                                : "status-pending"
                            }
                          >
                            {request.status}
                          </span>

                        </td>

                        {/* ACTION */}
                        <td>

                          {request.status ===
                            "REQUESTED" && (

                            <div className="request-action-buttons">

                              <button
                                className="accept-btn"
                                onClick={() =>
                                  acceptRequest(
                                    request.id
                                  )
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="reject-btn"
                                onClick={() =>
                                  rejectRequest(
                                    request.id
                                  )
                                }
                              >
                                Reject
                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="8">
                        No requests found
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

export default Receivers;