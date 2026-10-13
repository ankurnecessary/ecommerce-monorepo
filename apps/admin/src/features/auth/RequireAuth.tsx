import { useAuth } from '@clerk/react';
import { Outlet, useNavigate } from 'react-router';

const RequireAuth = () => {
  const { isLoaded, isSignedIn } = useAuth();
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

  return <Outlet />;
};

export default RequireAuth;
