import { Routes, Route, Navigate } from 'react-router-dom';
import Token from '../pages/token';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Token />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
