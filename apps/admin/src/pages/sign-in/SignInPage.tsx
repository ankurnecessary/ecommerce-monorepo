import { SignIn } from '@clerk/react';
import styles from './SignInPage.module.scss';
import { useLocation, createPath } from 'react-router';

const SignInPage = () => {
  const location = useLocation();

  const requestedLocation = location.state?.from;
  const returnTo = requestedLocation
    ? createPath(requestedLocation)
    : undefined;

  return (
    <div className={styles['sign-in-wrapper']}>
      <SignIn
        path="/sign-in"
        routing="path"
        forceRedirectUrl={returnTo}
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            socialButtonsRoot: {
              display: 'none',
            },
            dividerRow: {
              display: 'none',
            },
            lastAuthenticationStrategyBadge: {
              display: 'none',
            },
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
