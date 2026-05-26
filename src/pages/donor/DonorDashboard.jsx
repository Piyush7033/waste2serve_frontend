import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/donorDashboard.css";
import {
  UtensilsCrossed,
  PlusCircle,
  ClipboardList,
  History,
  CheckCircle2,
  Timer,
  Package,
  ArrowRight,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const DonorDashboard = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    accepted: 0,
    requested: 0,
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

        const res = await API.get(`/donations/history/${user?.id}`, { headers });
        const donations = res.data || [];

        setStats({
          total:     donations.length,
          available: donations.filter((d) => d.status === "AVAILABLE").length,
          accepted:  donations.filter((d) => d.status === "ACCEPTED").length,
          requested: donations.filter((d) => d.status === "REQUESTED").length,
        });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchStats();
    else setLoading(false);
  }, [user]);

  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "Donor";

  // =========================================
  // ACTION CARDS CONFIG
  // =========================================

  const actions = [
    {
      to:      "/donor/add-food",
      title:   "Add Food",
      desc:    "Post extra food for donation and help someone in need today.",
      Icon:    PlusCircle,
      iconCls: "dd-icon-add",
      barCls:  "dd-bar-add",
      chips:   [{ Icon: UtensilsCrossed, label: "New listing" }, { Icon: Heart, label: "Help someone" }],
      delay:   "0s",
    },
    {
      to:      "/donor/my-donations",
      title:   "My Donations",
      desc:    "Track, edit and manage all your active food donation listings.",
      Icon:    Package,
      iconCls: "dd-icon-donations",
      barCls:  "dd-bar-donations",
      chips:   [
        { Icon: Timer,        label: loading ? "..." : `${stats.available} active` },
        { Icon: CheckCircle2, label: loading ? "..." : `${stats.accepted} accepted` },
      ],
      delay:   "0.07s",
    },
    {
      to:      "/donor/history",
      title:   "Donation History",
      desc:    "View a complete record of all food donations you have submitted.",
      Icon:    History,
      iconCls: "dd-icon-history",
      barCls:  "dd-bar-history",
      chips:   [
        { Icon: ClipboardList, label: loading ? "..." : `${stats.total} total` },
        { Icon: TrendingUp,    label: "All time" },
      ],
      delay:   "0.14s",
    },
  ];

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="dd-page">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div className="dd-hero">
        <div className="dd-hero-shapes">
          <div className="dd-shape dd-shape-1" />
          <div className="dd-shape dd-shape-2" />
          <div className="dd-shape dd-shape-3" />
        </div>

        <div className="dd-hero-content">
          <div className="dd-hero-text">
            <div className="dd-welcome-chip">
              <Sparkles size={13} strokeWidth={2} />
              <span>Donor Dashboard</span>
            </div>
            <h1 className="dd-hero-title">
              Hello, {firstName} 👋
            </h1>
            <p className="dd-hero-sub">
              Your generosity makes a difference. Manage your food donations
              and track the impact you're creating every day.
            </p>
            <div className="dd-hero-actions">
              <Link to="/donor/add-food" className="dd-hero-btn dd-hero-btn-primary">
                <PlusCircle size={16} strokeWidth={2} />
                Add Food
              </Link>
              <Link to="/donor/my-donations" className="dd-hero-btn dd-hero-btn-outline">
                <Package size={16} strokeWidth={2} />
                My Donations
              </Link>
            </div>
          </div>
          <div className="dd-hero-illustration">
            <div className="dd-hero-icon-ring">
              <UtensilsCrossed size={56} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="dd-stats">
          {[
            { label: "Total Donations", count: stats.total,     Icon: ClipboardList, cls: "dds-total"     },
            { label: "Available",       count: stats.available, Icon: Package,       cls: "dds-available" },
            { label: "Requested",       count: stats.requested, Icon: Timer,         cls: "dds-requested" },
            { label: "Accepted",        count: stats.accepted,  Icon: CheckCircle2,  cls: "dds-accepted"  },
          ].map(({ label, count, Icon, cls }) => (
            <div className={`dd-stat ${cls}`} key={label}>
              <Icon size={20} strokeWidth={1.8} className="dd-stat-icon" />
              <span className="dd-stat-count">
                {loading ? <span className="dd-stat-skeleton" /> : count}
              </span>
              <span className="dd-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <div className="dd-body">

        {/* SECTION HEADER */}
        <div className="dd-section-header">
          <h2 className="dd-section-title">Quick Actions</h2>
          <p className="dd-section-sub">Everything you need in one place</p>
        </div>

        {/* ACTION CARDS */}
        <div className="dd-action-grid">
          {actions.map(({ to, title, desc, Icon, iconCls, barCls, chips, delay }) => (
            <Link
              to={to}
              className="dd-action-card"
              key={to}
              style={{ animationDelay: delay }}
            >
              <div className="dd-action-card-inner">
                <div className={`dd-action-icon-wrap ${iconCls}`}>
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <div className="dd-action-text">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="dd-action-meta">
                    {chips.map(({ Icon: ChipIcon, label }) => (
                      <span className="dd-meta-chip" key={label}>
                        <ChipIcon size={12} strokeWidth={2} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="dd-action-arrow">
                  <ArrowRight size={20} strokeWidth={2} />
                </div>
              </div>
              <div className={`dd-action-bar ${barCls}`} />
            </Link>
          ))}
        </div>

        {/* INFO BANNER */}
        <div className="dd-banner">
          <div className="dd-banner-icon">
            <Heart size={22} strokeWidth={1.8} />
          </div>
          <div className="dd-banner-text">
            <strong>Your impact matters</strong>
            <p>Add food → Receivers browse & request → You accept → They pick up. Simple, fast, impactful.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;
