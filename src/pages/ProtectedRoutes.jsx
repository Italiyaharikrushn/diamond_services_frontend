import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './dashbord';
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
          element={isAuthenticated ? <Navigate to="/dashbord/diamonds" /> : <Token />}
        />

        {/* Protected diamonds route */}
        <Route
          path="/dashbord/diamonds"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path='/dashbord/gemstones'
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Redirect all unmatched routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashbord/diamonds" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default ProtectedRoutes;
