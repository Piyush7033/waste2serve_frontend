import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "../../styles/availableFoods.css";
import {
  UtensilsCrossed,
  MapPin,
  Package,
  Clock,
  Search,
  SendHorizonal,
  X,
  AlertTriangle,
  MailOpen,
  RefreshCw,
  ShoppingBag,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const AvailableFoods = () => {

  const [foods, setFoods]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [openFormId, setOpenFormId] = useState(null);
  const [message, setMessage]       = useState("");
  const [requestingId, setRequestingId] = useState(null);
  const [successId, setSuccessId]   = useState(null);
  const [reqError, setReqError]     = useState("");

  const navigate = useNavigate();

  // =========================================
  // FETCH
  // =========================================

  useEffect(() => { fetchFoods(); }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/food/available");
      setFoods(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load available foods.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // REQUEST FORM
  // =========================================

  const openRequestForm = (foodId) => {
    setOpenFormId(foodId);
    setMessage("");
    setReqError("");
    setSuccessId(null);
  };

  const closeForm = () => {
    setOpenFormId(null);
    setMessage("");
    setReqError("");
  };

  const handleRequest = async (foodId) => {
    if (!message.trim()) {
      setReqError("Please write a message to the donor.");
      return;
    }
    try {
      setRequestingId(foodId);
      setReqError("");
      const token = localStorage.getItem("token");
      await API.post(`/request/create/${foodId}`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccessId(foodId);
      closeForm();
      fetchFoods();
      setTimeout(() => navigate("/my-requests"), 1200);
    } catch (err) {
      setReqError(err.response?.data || "Failed to send request.");
    } finally {
      setRequestingId(null);
    }
  };

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filtered = foods.filter(
    (f) =>
      f.title?.toLowerCase().includes(search.toLowerCase()) ||
      f.location?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="av-page">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div className="av-hero">
        <div className="av-hero-shapes">
          <div className="av-shape av-shape-1" />
          <div className="av-shape av-shape-2" />
        </div>

        <div className="av-hero-content">
          <div className="av-hero-text">
            <span className="av-eyebrow">Food Available Near You</span>
            <h1 className="av-hero-title">Available Foods</h1>
            <p className="av-hero-sub">
              Browse food donations listed by generous donors. Request what you need and we'll connect you.
            </p>
          </div>
          <div className="av-hero-icon-wrap">
            <ShoppingBag size={68} strokeWidth={1.2} />
          </div>
        </div>

        {/* HERO BOTTOM PADDING */}
        <div className="av-hero-pad" />
      </div>

      {/* SEARCH BAR STRIP */}
      <div className="av-search-strip">
        <div className="av-search-strip-inner">
          <div className="av-stat-chip">
            <UtensilsCrossed size={15} strokeWidth={2} />
            <span><strong>{foods.length}</strong> items available</span>
          </div>
          <div className="av-search-wrap">
            <Search size={15} strokeWidth={2} className="av-search-icon" />
            <input
              className="av-search"
              type="text"
              placeholder="Search by food name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="av-search-clear" onClick={() => setSearch("")}>
                <X size={13} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <div className="av-body">

        {/* LOADING */}
        {loading && (
          <div className="av-state">
            <div className="av-state-icon-wrap">
              <RefreshCw size={32} className="av-spin" />
            </div>
            <p className="av-state-title">Loading available foods...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="av-state av-state-error">
            <div className="av-state-icon-wrap error-wrap">
              <AlertTriangle size={30} strokeWidth={1.8} />
            </div>
            <p className="av-state-title">{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && foods.length === 0 && (
          <div className="av-state">
            <div className="av-state-icon-wrap">
              <MailOpen size={32} strokeWidth={1.5} />
            </div>
            <p className="av-state-title">No food available right now</p>
            <p className="av-state-hint">Check back later — donors are always adding new items.</p>
          </div>
        )}

        {/* NO SEARCH RESULTS */}
        {!loading && !error && foods.length > 0 && filtered.length === 0 && (
          <div className="av-state">
            <div className="av-state-icon-wrap">
              <Search size={30} strokeWidth={1.5} />
            </div>
            <p className="av-state-title">No results for "{search}"</p>
            <p className="av-state-hint">Try a different food name or location.</p>
          </div>
        )}

        {/* RESULTS COUNT */}
        {!loading && !error && filtered.length > 0 && (
          <p className="av-results-count">
            Showing <strong>{filtered.length}</strong> of {foods.length} items
            {search && <> matching "<strong>{search}</strong>"</>}
          </p>
        )}

        {/* GRID */}
        {!loading && !error && filtered.length > 0 && (
          <div className="av-grid">
            {filtered.map((food, i) => {
              const isExpired = food.expiryTime && new Date(food.expiryTime) < new Date();
              const isOpen    = openFormId === food.id;
              const isDone    = successId === food.id;

              return (
                <div
                  className={`av-card ${isOpen ? "av-card-open" : ""}`}
                  key={food.id}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >

                  {/* CARD HEADER */}
                  <div className="av-card-header">
                    <div className="av-card-icon">
                      <UtensilsCrossed size={22} strokeWidth={1.8} />
                    </div>
                    <div className="av-card-title-block">
                      <h3 className="av-card-title">{food.title || "Food Donation"}</h3>
                      <span className="av-card-id">ID #{food.id}</span>
                    </div>
                    <span className="av-badge-available">
                      <span className="av-badge-dot" /> Available
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  {food.description && (
                    <p className="av-card-desc">{food.description}</p>
                  )}

                  <hr className="av-divider" />

                  {/* INFO GRID */}
                  <div className="av-info-grid">

                    <div className="av-info-cell">
                      <MapPin size={15} strokeWidth={2} className="av-info-icon" />
                      <div>
                        <span className="av-info-label">Location</span>
                        <span className="av-info-val">{food.location || "N/A"}</span>
                      </div>
                    </div>

                    <div className="av-info-cell">
                      <Package size={15} strokeWidth={2} className="av-info-icon" />
                      <div>
                        <span className="av-info-label">Quantity</span>
                        <span className="av-info-val">{food.quantity || "N/A"}</span>
                      </div>
                    </div>

                    <div className="av-info-cell av-info-full">
                      <Clock size={15} strokeWidth={2} className={`av-info-icon ${isExpired ? "icon-expired" : ""}`} />
                      <div>
                        <span className="av-info-label">Expiry</span>
                        <span className={`av-info-val ${isExpired ? "av-expired" : ""}`}>
                          {food.expiryTime
                            ? new Date(food.expiryTime).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "N/A"}
                          {isExpired && <span className="av-expired-tag"> · Expired</span>}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* STATUS BAR */}
                  <div className="av-status-bar" />

                  {/* SUCCESS STATE */}
                  {isDone && (
                    <div className="av-success-row">
                      <CheckCircle2 size={16} strokeWidth={2} />
                      <span>Request sent! Redirecting...</span>
                    </div>
                  )}

                  {/* REQUEST FORM */}
                  {isOpen && (
                    <div className="av-request-form">
                      <div className="av-request-form-header">
                        <MessageSquare size={15} strokeWidth={2} />
                        <span>Message to Donor</span>
                        <button className="av-close-btn" onClick={closeForm}>
                          <X size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                      <textarea
                        className="av-textarea"
                        placeholder="Introduce yourself and explain why you need this food..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                      />
                      {reqError && (
                        <div className="av-req-error">
                          <AlertTriangle size={13} strokeWidth={2} /> {reqError}
                        </div>
                      )}
                      <div className="av-request-actions">
                        <button className="av-btn av-btn-cancel" onClick={closeForm}>
                          <X size={14} strokeWidth={2} /> Cancel
                        </button>
                        <button
                          className="av-btn av-btn-send"
                          onClick={() => handleRequest(food.id)}
                          disabled={requestingId === food.id}
                        >
                          {requestingId === food.id ? (
                            <><span className="av-spinner" /> Sending...</>
                          ) : (
                            <><SendHorizonal size={14} strokeWidth={2} /> Send Request</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* REQUEST BUTTON */}
                  {!isOpen && !isDone && (
                    <div className="av-card-footer">
                      <button
                        className="av-btn av-btn-request"
                        onClick={() => openRequestForm(food.id)}
                      >
                        <SendHorizonal size={15} strokeWidth={2} /> Request Food
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

export default AvailableFoods;
