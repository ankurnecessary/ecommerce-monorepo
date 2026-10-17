import { useAuth } from '@clerk/react';
import { Outlet, useNavigate } from 'react-router';

const RequireAuth = () => {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <main className="grid min-h-screen place-items-center" aria-busy="true">
        <p>Checking authentication…</p>
      </main>
    );
  }

  if (!isSignedIn) {
    return navigate('/sign-in');
  }

  if (sessionClaims?.metadata?.role !== 'dashboardUser') {
    return navigate('/unauthorized');
  }

  return <Outlet />;
};

export default RequireAuth;
