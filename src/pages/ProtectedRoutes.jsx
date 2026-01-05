import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GetDiamond from './csvdiamond/get_diamond';
import Token from './token';

function ProtectedRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/diamonds" /> : <Token />}
        />

        {/* Protected diamonds route */}
        <Route
          path="/diamonds"
          element={isAuthenticated ? <GetDiamond /> : <Navigate to="/" />}
        />

        {/* Redirect all unmatched routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/diamonds" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default ProtectedRoutes;
