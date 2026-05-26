import { Link } from 'react-router-dom';
import { Home, Package, Users, ShieldCheck } from 'lucide-react';

import './Sidebar.css';

const Sidebar = () => {

  return (

    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">A</div>
        <div>
          <h1 className="sidebar-title">Admin Panel</h1>
          <p className="sidebar-tagline">Manage donations, users, and receivers with clarity.</p>
        </div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard" className="sidebar-link">
            <span className="sidebar-icon blue-bg"><Home size={18} /></span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/donations" className="sidebar-link">
            <span className="sidebar-icon teal-bg"><Package size={18} /></span>
            Donations
          </Link>
        </li>
        <li>
          <Link to="/admin/receivers" className="sidebar-link">
            <span className="sidebar-icon cyan-bg"><Users size={18} /></span>
            Receivers
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="sidebar-link">
            <span className="sidebar-icon navy-bg"><ShieldCheck size={18} /></span>
            Users
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <p>Quick actions in a calm blue workspace.</p>
      </div>
    </div>
  );
};

export default Sidebar;