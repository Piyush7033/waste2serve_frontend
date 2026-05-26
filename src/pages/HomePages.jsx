import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/home.css";
import heroImg from "../utils/ChatGPT Image May 19, 2026, 10_43_24 PM.png";
import {
  UtensilsCrossed,
  Heart,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Users,
  ShoppingBag,
  Leaf,
  Star,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  BadgeCheck,
  Zap,
} from "lucide-react";

const HomePage = () => {

  const { isLoggedIn } = useAuth();

  // =========================================
  // DATA
  // =========================================

  const stats = [
    { count: "2,400+", label: "Meals Donated",    Icon: UtensilsCrossed },
    { count: "850+",   label: "Active Donors",    Icon: Heart           },
    { count: "1,200+", label: "Families Helped",  Icon: Users           },
    { count: "98%",    label: "Satisfaction",     Icon: Star            },
  ];

  const steps = [
    { step: "01", title: "Donor Lists Food",   desc: "Post surplus food with quantity, location and expiry details in seconds.",  Icon: UtensilsCrossed, cls: "hp-step-blue"   },
    { step: "02", title: "Receiver Requests",  desc: "Browse available food nearby and send a request with a personal message.",  Icon: ShoppingBag,     cls: "hp-step-green"  },
    { step: "03", title: "Donor Accepts",      desc: "The donor reviews and confirms the request to complete the donation.",      Icon: BadgeCheck,      cls: "hp-step-purple" },
    { step: "04", title: "Food Collected",     desc: "Receiver picks up the food from the listed location. Zero waste.",          Icon: MapPin,          cls: "hp-step-amber"  },
  ];

  const features = [
    {
      Icon: Heart, title: "For Donors", cls: "hp-feat-blue",
      desc: "Easily list surplus food, manage your donations, and track the impact you're creating every day.",
      points: ["Post food in seconds", "Track donation status", "View your impact history"],
    },
    {
      Icon: ShoppingBag, title: "For Receivers", cls: "hp-feat-green",
      desc: "Browse available food near you, send requests to donors, and get notified when accepted.",
      points: ["Browse available food", "Send requests instantly", "Real-time status updates"],
    },
    {
      Icon: BarChart3, title: "Smart Tracking", cls: "hp-feat-purple",
      desc: "Full transparency with real-time status updates, donation history, and request management.",
      points: ["Live status tracking", "Complete history logs", "Secure & reliable"],
    },
  ];

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="hp-page">

      {/* ══════════════════════════════════════
          HERO — FULL SCREEN BG IMAGE
      ══════════════════════════════════════ */}
      <section className="hp-hero">

        {/* BG IMAGE */}
        <div className="hp-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />

        {/* OVERLAYS */}
        <div className="hp-overlay-dark" />
        <div className="hp-overlay-blue" />

        {/* DECORATIVE RINGS */}
        <div className="hp-rings">
          <div className="hp-ring hp-ring-1" />
          <div className="hp-ring hp-ring-2" />
          <div className="hp-ring hp-ring-3" />
        </div>

        {/* CENTERED CONTENT */}
        <div className="hp-hero-content">

          <div className="hp-hero-chip">
            <Sparkles size={13} strokeWidth={2} />
            <span>Fighting Hunger Together</span>
          </div>

          <h1 className="hp-hero-title">
            Share Food,
            <br />
            <span className="hp-hero-gradient">Change Lives</span>
          </h1>

          <p className="hp-hero-sub">
            Connect food donors with people in need. Reduce waste, fight hunger,
            and build a stronger community — one meal at a time.
          </p>

          <div className="hp-hero-btns">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="hp-btn hp-btn-solid">
                  Get Started Free
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                <Link to="/login" className="hp-btn hp-btn-glass">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="hp-btn hp-btn-solid">
                Go to Dashboard
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            )}
          </div>

          {/* TRUST */}
          <div className="hp-trust">
            <div className="hp-avatars">
              {["D", "R", "A", "M"].map((l, i) => (
                <div className="hp-av" key={i}>{l}</div>
              ))}
            </div>
            <p>Trusted by <strong>2,400+</strong> donors & receivers</p>
          </div>

        </div>

        {/* FLOATING BADGES */}
        <div className="hp-badge hp-badge-1">
          <CheckCircle2 size={14} strokeWidth={2.5} />
          <span>Donation Accepted!</span>
        </div>
        <div className="hp-badge hp-badge-2">
          <Heart size={14} strokeWidth={2.5} />
          <span>12 meals shared today</span>
        </div>
        <div className="hp-badge hp-badge-3">
          <Zap size={14} strokeWidth={2.5} />
          <span>Live updates</span>
        </div>

        {/* SCROLL DOT */}
        <div className="hp-scroll">
          <div className="hp-scroll-dot" />
        </div>

      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="hp-stats">
        <div className="hp-stats-inner">
          {stats.map(({ count, label, Icon }) => (
            <div className="hp-stat" key={label}>
              <div className="hp-stat-icon">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <div className="hp-stat-count">{count}</div>
                <div className="hp-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="hp-section hp-how">
        <div className="hp-inner">

          <div className="hp-sec-head">
            <span className="hp-chip">Simple Process</span>
            <h2 className="hp-sec-title">How It Works</h2>
            <p className="hp-sec-sub">Four simple steps to connect food donors with receivers</p>
          </div>

          <div className="hp-steps">
            {steps.map(({ step, title, desc, Icon, cls }, i) => (
              <div
                className={`hp-step ${cls}`}
                key={step}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="hp-step-num">{step}</div>
                <div className="hp-step-icon">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="hp-section hp-feats">
        <div className="hp-inner">

          <div className="hp-sec-head">
            <span className="hp-chip">Features</span>
            <h2 className="hp-sec-title">Everything You Need</h2>
            <p className="hp-sec-sub">Built for donors and receivers with simplicity and impact in mind</p>
          </div>

          <div className="hp-feat-grid">
            {features.map(({ Icon, title, desc, cls, points }, i) => (
              <div
                className={`hp-feat ${cls}`}
                key={title}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="hp-feat-icon">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ul>
                  {points.map((pt) => (
                    <li key={pt}>
                      <CheckCircle2 size={14} strokeWidth={2.5} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — BG IMAGE AGAIN
      ══════════════════════════════════════ */}
      <section className="hp-cta">
        <div className="hp-cta-bg" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="hp-cta-overlay" />
        <div className="hp-cta-content">
          <span className="hp-chip hp-chip-light">Join Us Today</span>
          <h2>Ready to Make a Difference?</h2>
          <p>
            Join thousands of donors and receivers already using FoodDonate
            to fight hunger in their communities.
          </p>
          <div className="hp-cta-btns">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="hp-btn hp-btn-solid">
                  Start Donating <ChevronRight size={16} strokeWidth={2.5} />
                </Link>
                <Link to="/login" className="hp-btn hp-btn-glass">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="hp-btn hp-btn-solid">
                Go to Dashboard <ChevronRight size={16} strokeWidth={2.5} />
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
