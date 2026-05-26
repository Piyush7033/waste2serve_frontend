import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/receiverDashboard.css";
import {
  ShoppingBag,
  ClipboardList,
  UtensilsCrossed,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Heart,
  Sparkles,
  MapPin,
} from "lucide-react";

const ReceiverDashboard = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    available: 0,
    myRequests: 0,
    accepted: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH STATS
  // =========================================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [foodsRes, reqRes] = await Promise.all([
          API.get("/food/available"),
          API.get("/request/my", { headers }),
        ]);

        const requests = reqRes.data || [];

        setStats({
          available: (foodsRes.data || []).length,
          myRequests: requests.length,
          accepted:  requests.filter((r) => r.status === "ACCEPTED").length,
          cancelled: requests.filter((r) => r.status === "CANCELLED").length,
        });
      } catch {
        // silently fail — stats just show 0
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "Receiver";

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="rd-page">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div className="rd-hero">
        <div className="rd-hero-shapes">
          <div className="rd-shape rd-shape-1" />
          <div className="rd-shape rd-shape-2" />
          <div className="rd-shape rd-shape-3" />
        </div>

        <div className="rd-hero-content">
          <div className="rd-hero-text">
            <div className="rd-welcome-chip">
              <Sparkles size={13} strokeWidth={2} />
              <span>Welcome back</span>
            </div>
            <h1 className="rd-hero-title">
              Hello, {firstName} 👋
            </h1>
            <p className="rd-hero-sub">
              Find available food donations near you and request what you need.
              Every meal matters.
            </p>
            <div className="rd-hero-actions">
              <Link to="/receiver/available-foods" className="rd-hero-btn rd-hero-btn-primary">
                <ShoppingBag size={16} strokeWidth={2} />
                Browse Foods
              </Link>
              <Link to="/receiver/requests" className="rd-hero-btn rd-hero-btn-outline">
                <ClipboardList size={16} strokeWidth={2} />
                My Requests
              </Link>
            </div>
          </div>
          <div className="rd-hero-illustration">
            <div className="rd-hero-icon-ring">
              <UtensilsCrossed size={56} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="rd-stats">
          {[
            { label: "Available Foods", count: stats.available, Icon: ShoppingBag,  cls: "rds-available", loading },
            { label: "My Requests",     count: stats.myRequests,Icon: ClipboardList, cls: "rds-requests",  loading },
            { label: "Accepted",        count: stats.accepted,  Icon: CheckCircle2,  cls: "rds-accepted",  loading },
            { label: "Cancelled",       count: stats.cancelled, Icon: XCircle,       cls: "rds-cancelled", loading },
          ].map(({ label, count, Icon, cls, loading }) => (
            <div className={`rd-stat ${cls}`} key={label}>
              <Icon size={20} strokeWidth={1.8} className="rd-stat-icon" />
              <span className="rd-stat-count">
                {loading ? <span className="rd-stat-skeleton" /> : count}
              </span>
              <span className="rd-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <div className="rd-body">

        {/* SECTION TITLE */}
        <div className="rd-section-header">
          <h2 className="rd-section-title">Quick Actions</h2>
          <p className="rd-section-sub">Everything you need in one place</p>
        </div>

        {/* ACTION CARDS */}
        <div className="rd-action-grid">

          {/* AVAILABLE FOODS */}
          <Link to="/receiver/available-foods" className="rd-action-card rd-card-foods">
            <div className="rd-action-card-inner">
              <div className="rd-action-icon-wrap foods-icon">
                <ShoppingBag size={28} strokeWidth={1.6} />
              </div>
              <div className="rd-action-text">
                <h3>Available Foods</h3>
                <p>Browse fresh food donations from generous donors near you. Request what you need instantly.</p>
                <div className="rd-action-meta">
                  <span className="rd-meta-chip">
                    <UtensilsCrossed size={12} strokeWidth={2} />
                    {loading ? "..." : `${stats.available} items`}
                  </span>
                  <span className="rd-meta-chip">
                    <MapPin size={12} strokeWidth={2} />
                    Near you
                  </span>
                </div>
              </div>
              <div className="rd-action-arrow">
                <ArrowRight size={20} strokeWidth={2} />
              </div>
            </div>
            <div className="rd-action-bar foods-bar" />
          </Link>

          {/* MY REQUESTS */}
          <Link to="/receiver/requests" className="rd-action-card rd-card-requests">
            <div className="rd-action-card-inner">
              <div className="rd-action-icon-wrap requests-icon">
                <ClipboardList size={28} strokeWidth={1.6} />
              </div>
              <div className="rd-action-text">
                <h3>My Requests</h3>
                <p>Track the status of all your food requests in real time. Cancel pending ones if needed.</p>
                <div className="rd-action-meta">
                  <span className="rd-meta-chip">
                    <Timer size={12} strokeWidth={2} />
                    {loading ? "..." : `${stats.myRequests} total`}
                  </span>
                  <span className="rd-meta-chip">
                    <CheckCircle2 size={12} strokeWidth={2} />
                    {loading ? "..." : `${stats.accepted} accepted`}
                  </span>
                </div>
              </div>
              <div className="rd-action-arrow">
                <ArrowRight size={20} strokeWidth={2} />
              </div>
            </div>
            <div className="rd-action-bar requests-bar" />
          </Link>

        </div>

        {/* INFO BANNER */}
        <div className="rd-banner">
          <div className="rd-banner-icon">
            <Heart size={22} strokeWidth={1.8} />
          </div>
          <div className="rd-banner-text">
            <strong>How it works</strong>
            <p>Browse available food → Send a request with a message → Donor accepts → Pick up your meal</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReceiverDashboard;
