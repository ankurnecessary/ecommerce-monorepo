import { useAuth } from '@clerk/react';
import { Outlet, Navigate, useLocation, createPath } from 'react-router';

const RequireAuth = () => {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <main className="grid min-h-screen place-items-center" aria-busy="true">
        <p>Checking authentication…</p>
      </main>
    );
  }

  if (!isSignedIn) {
    const returnTo = createPath(location);
    const signInSearch = new URLSearchParams({
      redirect_url: returnTo,
    }).toString();

    return <Navigate to={`/sign-in?${signInSearch}`} replace />;
  }

  if (sessionClaims?.metadata?.role !== 'dashboardUser') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
