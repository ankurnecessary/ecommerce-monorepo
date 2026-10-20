import { SignIn } from '@clerk/react';
import { useLocation } from 'react-router';

import styles from './SignInPage.module.scss';

const getSafeRedirectUrl = (value: string | null) => {
  if (!value?.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  return value;
};

const SignInPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = getSafeRedirectUrl(searchParams.get('redirect_url'));

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
