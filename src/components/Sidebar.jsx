import React, { useState } from 'react';
// NavLink ઇમ્પોર્ટ કરો
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Diamond UI</h2>
          <button className="close-btn" onClick={toggleSidebar}>✕</button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                to="/stones"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="label">Stones</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="label">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="label">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
