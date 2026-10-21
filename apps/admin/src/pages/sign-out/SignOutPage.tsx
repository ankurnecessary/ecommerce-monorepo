import { useClerk } from '@clerk/react';
import { useEffect, useRef } from 'react';

const SignOutPage = () => {
  const { signOut } = useClerk();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    void signOut({ redirectUrl: '/sign-in' });
  }, [signOut]);

  return (
    <main className="grid min-h-screen place-items-center" aria-busy="true">
      <p>Signing out.</p>
    </main>
  );
};

export default SignOutPage;
