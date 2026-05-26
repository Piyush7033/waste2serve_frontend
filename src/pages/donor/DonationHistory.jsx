import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/donationHistory.css";

// =========================================
// STATUS CONFIG — matches FoodStatus enum
// =========================================

const STATUS_META = {
  AVAILABLE: {
    label: "Available",
    badgeCls: "badge-available",
    cardCls: "card-available",
    icon: "",
  },
  REQUESTED: {
    label: "Requested",
    badgeCls: "badge-requested",
    cardCls: "card-requested",
    icon: "",
  },
  ACCEPTED: {
    label: "Accepted",
    badgeCls: "badge-accepted",
    cardCls: "card-accepted",
    icon: "",
  },
};

const getStatusMeta = (status) =>
  STATUS_META[status] ?? {
    label: status ?? "Unknown",
    badgeCls: "badge-unknown",
    cardCls: "",
    icon: "",
  };

// =========================================
// COMPONENT
// =========================================

const DonationHistory = () => {

  const { user } = useAuth();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [filter, setFilter]       = useState("ALL");

  // =========================================
  // FETCH
  // =========================================

  useEffect(() => {
    if (user?.id) fetchDonationHistory();
  }, [user]);

  const fetchDonationHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }
      console.log("token: ", token);

      const response = await API.get(`/donations/history/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDonations(Array.isArray(response.data) ? response.data : []);

    } catch (err) {
      if (err.response?.status === 401)      setError("Unauthorized. Please login again.");
      else if (err.response?.status === 403) setError("Access denied.");
      else if (err.response?.status === 404) setError("No donation history found.");
      else setError(err.response?.data?.message || "Failed to load donation history.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FILTER + COUNTS
  // =========================================

  const counts = {
    ALL:       donations.length,
    AVAILABLE: donations.filter((d) => d.status === "AVAILABLE").length,
    REQUESTED: donations.filter((d) => d.status === "REQUESTED").length,
    ACCEPTED:  donations.filter((d) => d.status === "ACCEPTED").length,
  };

  const filtered =
    filter === "ALL"
      ? donations
      : donations.filter((d) => d.status === filter);

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="dh-page">

      <div className="dh-hero">
        <div className="dh-hero-bg" />
        <div className="dh-hero-content">
          <div>
            <span className="dh-hero-eyebrow">Donation Dashboard</span>
            <h1 className="dh-hero-title">Donation History</h1>
            <p className="dh-hero-sub">Track your food contributions, monitor status updates, and review details for every donation you've made.</p>
          </div>
          <div className="dh-hero-emoji"></div>
        </div>
      </div>

      {/* ── LOADING ── */}
      {loading && (
        <div className="dh-state">
          <div className="dh-spinner" />
          <p>Loading your donations...</p>
        </div>
      )}

      {/* ── ERROR ── */}
      {!loading && error && (
        <div className="dh-state dh-state-error">
          <div className="dh-state-icon-wrap"></div>
          <p>{error}</p>
        </div>
      )}

      {/* ── EMPTY ── */}
      {!loading && !error && donations.length === 0 && (
        <div className="dh-state">
          <div className="dh-state-icon-wrap"></div>
          <p>You haven't made any donations yet.</p>
        </div>
      )}

      {/* ── TABLE CONTENT ── */}
      {!loading && !error && donations.length > 0 && (
        <div className="dh-content">
          <div className="dh-table-wrapper">
            <table className="dh-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>Donated At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => {
                  const meta = getStatusMeta(donation.status);
                  return (
                    <tr key={donation.id}>
                      <td className="dh-col-name">
                        <strong>{donation.foodName || "Food Donation"}</strong>
                        <span className="dh-col-id">#{donation.id}</span>
                      </td>
                      <td>{donation.location || "N/A"}</td>
                      <td>{donation.quantity || "N/A"}</td>
                      <td>
                        {donation.donatedAt
                          ? new Date(donation.donatedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        <span className={`dh-badge ${meta.badgeCls}`}>
                          {meta.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default DonationHistory;
