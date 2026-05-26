import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, LogOut, Search } from 'lucide-react';

import './Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();
  

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    // REMOVE STORED DATA
    localStorage.removeItem('token');

    localStorage.removeItem('role');

    localStorage.removeItem('user');

    // REDIRECT TO LOGIN
    navigate('/login');
  };

  

  return (
    <div className="admin-navbar">
      <div className="navbar-left">
        <div>
          <p className="navbar-eyebrow">Admin Console</p>
          <h1 className="admin-navbar-title">Food Donation Admin</h1>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="search-toggle" type="button">
          <Search size={16} />
          <span>Search</span>
        </button>

        <button className="icon-btn" type="button">
          <Bell size={18} />
        </button>

        <div className="profile-pill">
          <UserCircle size={18} />
          <span>Admin</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;