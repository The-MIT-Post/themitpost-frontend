import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Content Manager</h2>
        <nav>
          <ul>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname.includes("/admin/new") ? "active" : ""
                }`}
                to="/admin/new"
              >
                Create Article
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname.includes("/admin/modify") ? "active" : ""
                }`}
                to="/admin/modify"
              >
                Edit/Delete Articles
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname.includes("/admin/statistics")
                    ? "active"
                    : ""
                }`}
                to="/admin/statistics"
              >
                View Statistics
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Go to Home
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>Logout (Admin)</button>
        </div>
      </aside>

      <main className="mainContent">
        <header className="header">
          <div>
            <h1>Admin Panel</h1>
            <p>Manage your Content</p>
          </div>
          <div className="userAvatar">
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
