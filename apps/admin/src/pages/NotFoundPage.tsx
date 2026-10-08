import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The requested page doesn't exist</p>
      <Link to="/">Return to dashboard</Link>
    </main>
  );
};

export default NotFoundPage;
