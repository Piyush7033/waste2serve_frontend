import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/donor.css";

const DonorRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 FETCH DONOR REQUESTS (FIXED API PATH)
  const fetchDonorRequests = async () => {
    try {
      setLoading(true);

      const donorId = localStorage.getItem("userId");

      // ✅ FIXED: added /api prefix (matches backend best practice)
      const res = await API.get(
        `/api/donor/requests?donorId=${donorId}`
      );

      setRequests(res.data);

    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
      setError("Failed to load donor requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonorRequests();
  }, []);

  // ✅ ACCEPT REQUEST
  const handleAccept = async (id) => {
    try {
      await API.put(`/api/donor/request/accept/${id}`);

      // refresh UI
      fetchDonorRequests();

    } catch (err) {
      console.log("Accept error:", err.response?.data || err.message);
    }
  };

  // ❌ REJECT REQUEST
  const handleReject = async (id) => {
    try {
      await API.put(`/api/donor/request/reject/${id}`);

      // refresh UI
      fetchDonorRequests();

    } catch (err) {
      console.log("Reject error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="donor-container">

      <h2>📢 Receiver Requests for Your Food</h2>

      {/* LOADING */}
      {loading && <p>Loading requests...</p>}

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* EMPTY */}
      {!loading && requests.length === 0 && (
        <p>No receivers have requested your food yet</p>
      )}

      {/* LIST */}
      {!loading && requests.length > 0 && (
        <div className="request-list">

          {requests.map((req) => (
            <div key={req.id} className="request-card">

              <h3>🍲 {req.foodTitle}</h3>

              <p><strong>Requested By:</strong> {req.receiverName}</p>
              <p><strong>Email:</strong> {req.receiverEmail}</p>
              <p><strong>Quantity:</strong> {req.quantity}</p>
              <p><strong>Location:</strong> {req.location}</p>

              <p>
                <strong>Status:</strong>{" "}
                <b>{req.status}</b>
              </p>

              <p>
                <strong>Requested At:</strong>{" "}
                {req.createdAt
                  ? new Date(req.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* ACTION BUTTONS */}
              <div className="action-buttons">

                <button
                  className="accept-btn"
                  onClick={() => handleAccept(req.id)}
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleReject(req.id)}
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default DonorRequests;   