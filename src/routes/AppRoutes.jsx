import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}
    </Router>
  );
}

export default AppRoutes;
