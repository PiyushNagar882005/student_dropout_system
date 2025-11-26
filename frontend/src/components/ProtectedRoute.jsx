import { Navigate } from 'react-router-dom'
import useAuth from '../store/useAuth'

export function ProtectedRoute({ children, requiredRole = null }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const userRole = useAuth((state) => state.role)

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check role requirement
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/'} replace />
  }

  return children
}

export default ProtectedRoute
