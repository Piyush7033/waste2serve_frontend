import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/myRequests.css";

import {
  ClipboardList,
  UtensilsCrossed,
  MapPin,
  Package,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  Timer,
  RefreshCw,
  MailOpen,
  AlertTriangle,
  Ban,
} from "lucide-react";

// =========================================
// STATUS CONFIG
// =========================================

const STATUS_META = {
  REQUESTED: {
    label: "Requested",
    cls: "mr-badge-requested",
    bar: "mr-bar-requested",
    Icon: Timer,
  },

  ACCEPTED: {
    label: "Accepted",
    cls: "mr-badge-accepted",
    bar: "mr-bar-accepted",
    Icon: CheckCircle2,
  },

  CANCELLED: {
    label: "Cancelled",
    cls: "mr-badge-cancelled",
    bar: "mr-bar-cancelled",
    Icon: XCircle,
  },
};

const getStatus = (s) =>
  STATUS_META[s] ?? {
    label: s ?? "Unknown",
    cls: "mr-badge-unknown",
    bar: "",
    Icon: Timer,
  };

// =========================================
// COMPONENT
// =========================================

const MyRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [cancellingId, setCancellingId] = useState(null);

  // =========================================
  // FETCH REQUESTS
  // =========================================

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      console.log("TOKEN :", token);

      const res = await API.get(
        "/request/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "REQUESTS RESPONSE :",
        res.data
      );

      setRequests(res.data || []);

    } catch (err) {

      console.log(
        "FETCH ERROR :",
        err
      );

      console.log(
        "FETCH ERROR RESPONSE :",
        err.response
      );

      console.log(
        "FETCH ERROR DATA :",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load requests."
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // CANCEL REQUEST
  // =========================================

  const cancelRequest = async (id) => {

    // ================= CONFIRM =================

    const confirmCancel = window.confirm(
      "Cancel this request?"
    );

    if (!confirmCancel) {
      return;
    }

    try {

      // ================= START LOADING =================

      setCancellingId(id);

      // ================= TOKEN =================

      const token = localStorage.getItem("token");

      console.log("TOKEN :", token);

      console.log(
        "CANCELLING REQUEST ID :",
        id
      );

      // ================= API REQUEST =================

      const response = await API.put(

        `/request/${id}/cancel`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ================= SUCCESS LOGS =================

      console.log(
        "CANCEL SUCCESS :",
        response
      );

      console.log(
        "CANCEL RESPONSE DATA :",
        response.data
      );

      // ================= UPDATE UI =================

      setRequests((prev) =>

        prev.map((r) =>

          r.id === id

            ? {
                ...r,
                status: "CANCELLED",
              }

            : r
        )
      );

      // ================= SUCCESS ALERT =================

      alert(
        "Request cancelled successfully"
      );

    } catch (err) {

      // ================= ERROR DEBUG =================

      console.log(
        "FULL ERROR OBJECT :",
        err
      );

      console.log(
        "ERROR RESPONSE :",
        err.response
      );

      console.log(
        "ERROR STATUS :",
        err.response?.status
      );

      console.log(
        "ERROR DATA :",
        err.response?.data
      );

      console.log(
        "ERROR MESSAGE :",
        err.message
      );

      // ================= ALERT =================

      alert(

        err.response?.data ||

        err.response?.data?.message ||

        err.message ||

        "Failed to cancel request."
      );

    } finally {

      // ================= STOP LOADING =================

      setCancellingId(null);
    }
  };

  // =========================================
  // COUNTS
  // =========================================

  const counts = {
    ALL: requests.length,

    REQUESTED: requests.filter(
      (r) => r.status === "REQUESTED"
    ).length,

    ACCEPTED: requests.filter(
      (r) => r.status === "ACCEPTED"
    ).length,

    CANCELLED: requests.filter(
      (r) => r.status === "CANCELLED"
    ).length,
  };

  // =========================================
  // FILTER
  // =========================================

  const filtered =
    filter === "ALL"
      ? requests
      : requests.filter(
          (r) => r.status === filter
        );

  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="mr-page">

      {/* HERO */}
      <div className="mr-hero">

        <div className="mr-hero-shapes">
          <div className="mr-shape mr-shape-1" />
          <div className="mr-shape mr-shape-2" />
        </div>

        <div className="mr-hero-content">

          <div className="mr-hero-text">

            <span className="mr-eyebrow">
              Track Your Activity
            </span>

            <h1 className="mr-hero-title">
              My Requests
            </h1>

            <p className="mr-hero-sub">
              View and manage all the food requests
              you've submitted to donors.
            </p>

          </div>

          <div className="mr-hero-icon-wrap">
            <ClipboardList
              size={68}
              strokeWidth={1.2}
            />
          </div>

        </div>

      </div>

      {/* BODY */}
      <div className="mr-body">

        {/* LOADING */}
        {loading && (

          <div className="mr-state">

            <div className="mr-state-icon-wrap">
              <RefreshCw
                size={32}
                className="mr-spin"
              />
            </div>

            <p className="mr-state-title">
              Loading your requests...
            </p>

          </div>

        )}

        {/* ERROR */}
        {!loading && error && (

          <div className="mr-state mr-state-error">

            <div className="mr-state-icon-wrap error-wrap">
              <AlertTriangle
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <p className="mr-state-title">
              {error}
            </p>

          </div>

        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          requests.length === 0 && (

          <div className="mr-state">

            <div className="mr-state-icon-wrap">
              <MailOpen
                size={32}
                strokeWidth={1.5}
              />
            </div>

            <p className="mr-state-title">
              No requests yet
            </p>

            <p className="mr-state-hint">
              Browse available foods and send
              a request to a donor.
            </p>

          </div>

        )}

        {/* CONTENT */}
        {!loading &&
          !error &&
          requests.length > 0 && (

          <div className="mr-grid">

            {filtered.map((req, i) => {

              const meta =
                getStatus(req.status);

              const StatusIcon =
                meta.Icon;

              return (

                <div
                  className="mr-card"
                  key={req.id}
                  style={{
                    animationDelay:
                      `${i * 0.06}s`,
                  }}
                >

                  {/* HEADER */}
                  <div className="mr-card-header">

                    <div className="mr-card-icon">
                      <UtensilsCrossed
                        size={22}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="mr-card-title-block">

                      <h3 className="mr-card-title">
                        {req.food?.title ||
                          "Food Item"}
                      </h3>

                      <span className="mr-card-id">
                        Request #{req.id}
                      </span>

                    </div>

                    <span
                      className={`mr-badge ${meta.cls}`}
                    >

                      <StatusIcon
                        size={11}
                        strokeWidth={2.5}
                      />

                      {meta.label}

                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  {req.food?.description && (

                    <p className="mr-card-desc">
                      {req.food.description}
                    </p>

                  )}

                  <hr className="mr-divider" />

                  {/* INFO */}
                  <div className="mr-info-grid">

                    <div className="mr-info-cell">

                      <MapPin
                        size={15}
                        strokeWidth={2}
                        className="mr-info-icon"
                      />

                      <div>

                        <span className="mr-info-label">
                          Location
                        </span>

                        <span className="mr-info-val">
                          {req.food?.location ||
                            "N/A"}
                        </span>

                      </div>

                    </div>

                    <div className="mr-info-cell">

                      <Package
                        size={15}
                        strokeWidth={2}
                        className="mr-info-icon"
                      />

                      <div>

                        <span className="mr-info-label">
                          Quantity
                        </span>

                        <span className="mr-info-val">
                          {req.food?.quantity ||
                            "N/A"}
                        </span>

                      </div>

                    </div>

                    <div className="mr-info-cell mr-info-full">

                      <Clock
                        size={15}
                        strokeWidth={2}
                        className="mr-info-icon"
                      />

                      <div>

                        <span className="mr-info-label">
                          Requested At
                        </span>

                        <span className="mr-info-val">

                          {req.requestTime
                            ? new Date(
                                req.requestTime
                              ).toLocaleString(
                                "en-US",
                                {
                                  dateStyle:
                                    "medium",
                                  timeStyle:
                                    "short",
                                }
                              )
                            : "N/A"}

                        </span>

                      </div>

                    </div>

                    {req.message && (

                      <div className="mr-info-cell mr-info-full">

                        <FileText
                          size={15}
                          strokeWidth={2}
                          className="mr-info-icon"
                        />

                        <div>

                          <span className="mr-info-label">
                            Your Message
                          </span>

                          <span className="mr-info-val mr-message">
                            {req.message}
                          </span>

                        </div>

                      </div>

                    )}

                  </div>

                  {/* STATUS BAR */}
                  <div
                    className={`mr-status-bar ${meta.bar}`}
                  />

                  {/* CANCEL BUTTON */}
                  {req.status ===
                    "REQUESTED" && (

                    <div className="mr-card-footer">

                      <button
                        className="mr-btn mr-btn-cancel"
                        onClick={() =>
                          cancelRequest(req.id)
                        }
                        disabled={
                          cancellingId ===
                          req.id
                        }
                      >

                        {cancellingId ===
                        req.id ? (

                          <>
                            <span className="mr-spinner" />
                            {" "}
                            Cancelling...
                          </>

                        ) : (

                          <>
                            <Ban
                              size={15}
                              strokeWidth={2}
                            />
                            {" "}
                            Cancel Request
                          </>

                        )}

                      </button>

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyRequests;