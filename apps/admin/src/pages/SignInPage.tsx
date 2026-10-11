import { SignIn } from '@clerk/react';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={styles['sign-in-wrapper']}>
      <SignIn />
    </div>
  );
};

export default SignInPage;
