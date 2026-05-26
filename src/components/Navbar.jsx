import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/navbar.css';
import {
  UtensilsCrossed,
  PlusCircle,
  Package,
  History,
  ShoppingBag,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';

const Navbar = () => {

  const { user, isLoggedIn, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const close = () => setOpen(false);

  const isActive = (path) =>
    location.pathname === path ? 'nb-link nb-link-active' : 'nb-link';

  // =========================================
  // ROLE LINKS CONFIG
  // =========================================

  const donorLinks = [
    { to: '/donor/dashboard',    label: 'Dashboard',        Icon: LayoutDashboard },
    { to: '/donor/add-food',     label: 'Add Food',         Icon: PlusCircle      },
    { to: '/donor/my-donations', label: 'My Donations',     Icon: Package         },
    { to: '/donor/history',      label: 'History',          Icon: History         },
  ];

  const receiverLinks = [
    { to: '/receiver/dashboard',       label: 'Dashboard',       Icon: LayoutDashboard },
    { to: '/receiver/available-foods', label: 'Available Foods', Icon: ShoppingBag     },
    { to: '/receiver/requests',        label: 'My Requests',     Icon: ClipboardList   },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Dashboard', Icon: Shield },
  ];

  const roleLinks =
    user?.role === 'DONOR'    ? donorLinks    :
    user?.role === 'RECEIVER' ? receiverLinks :
    user?.role === 'ADMIN'    ? adminLinks    : [];

  // =========================================
  // RENDER
  // =========================================

  return (
    <nav className="nb-nav">
      <div className="nb-container">

        {/* LOGO */}
        <Link to="/" className="nb-logo" onClick={close}>
          <div className="nb-logo-icon">
            <UtensilsCrossed size={18} strokeWidth={2} />
          </div>
          <span>Waste2Serve</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nb-links-wrap">
          {isLoggedIn && roleLinks.map(({ to, label, Icon }) => (
            <Link key={to} to={to} className={isActive(to)} onClick={close}>
              <Icon size={15} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="nb-right">
          {!isLoggedIn ? (
            <>
              <Link to="/login"    className="nb-link"        onClick={close}>Login</Link>
              <Link to="/register" className="nb-btn-register" onClick={close}>Register</Link>
            </>
          ) : (
            <>
              <div className="nb-user-chip">
                <div className="nb-user-avatar">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </div>
                <span className="nb-user-name">
                  {user?.name?.split(' ')[0] || user?.email?.split('@')[0]}
                </span>
              </div>
              <button className="nb-btn-logout" onClick={handleLogout}>
                <LogOut size={15} strokeWidth={2} />
                <span>Logout</span>
              </button>
            </>
          )}

          {/* HAMBURGER */}
          <button
            className="nb-hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open
              ? <X    size={22} strokeWidth={2} />
              : <Menu size={22} strokeWidth={2} />
            }
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="nb-drawer">

          {!isLoggedIn ? (
            <>
              <Link to="/login"    className="nb-drawer-link" onClick={close}>Login</Link>
              <Link to="/register" className="nb-drawer-link nb-drawer-register" onClick={close}>Register</Link>
            </>
          ) : (
            <>
              <div className="nb-drawer-user">
                <div className="nb-user-avatar lg">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </div>
                <div>
                  <p className="nb-drawer-name">{user?.name || user?.email}</p>
                  <p className="nb-drawer-role">{user?.role}</p>
                </div>
              </div>

              <div className="nb-drawer-divider" />

              {roleLinks.map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nb-drawer-link ${location.pathname === to ? 'nb-drawer-active' : ''}`}
                  onClick={close}
                >
                  <Icon size={16} strokeWidth={2} />
                  <span>{label}</span>
                </Link>
              ))}

              <div className="nb-drawer-divider" />

              <button className="nb-drawer-logout" onClick={handleLogout}>
                <LogOut size={16} strokeWidth={2} />
                <span>Logout</span>
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;
