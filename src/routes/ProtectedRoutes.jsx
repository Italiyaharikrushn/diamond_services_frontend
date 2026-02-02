import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/dashbord';
import Settings from '../pages/settings';
import Token from '../pages/token';

function ProtectedRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <div className="app-container">
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/stones" /> : <Token />}
          />

          {/* Protected dashboard routes */}
          <Route
            path="/stones"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />

          {/* Protected settings route */}
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
          />

          {/* Redirect all unmatched routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/stones" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default ProtectedRoutes;
