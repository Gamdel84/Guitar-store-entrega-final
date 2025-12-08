// src/components/RutaProtegida.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, isAdmin } = useAuthContext();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (soloAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
