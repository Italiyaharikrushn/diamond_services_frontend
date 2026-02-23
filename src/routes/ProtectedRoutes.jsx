import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashbord';
import Settings from '../pages/settings';
import MainLayout from '../layout/MainLayout';

function ProtectedRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/stones" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/stones" replace />} />
        <Route path="*" element={<Navigate to="/stones" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default ProtectedRoutes;
