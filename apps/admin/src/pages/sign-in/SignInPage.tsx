import { SignIn } from '@clerk/react';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={styles['sign-in-wrapper']}>
      <SignIn
        path="/sign-in"
        routing="path"
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
