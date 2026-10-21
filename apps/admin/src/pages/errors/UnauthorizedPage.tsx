import { SignOutButton } from '@clerk/react';

const UnauthorizedPage = () => {
  return (
    <main>
      <h1>Access denied</h1>

      <p>
        Your account does not have permission to access the administration
        dashboard.
      </p>
      <SignOutButton redirectUrl="/sign-in">
        <button type="button">Sign out and use another account</button>
      </SignOutButton>
    </main>
  );
};

export default UnauthorizedPage;
