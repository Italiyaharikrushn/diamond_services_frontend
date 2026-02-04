import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/dashbord';
import Settings from '../pages/settings';

function ProtectedRoutes() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="app-container" style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/stones" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/stones" replace />} />
          <Route path="*" element={<Navigate to="/stones" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProtectedRoutes;
