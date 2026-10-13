import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

const RouteErrorPage = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'The page could not be loaded.';

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2">{message}</p>

      <Link className="mt-4 inline-block underline" to="/">
        Return to dashboard
      </Link>
    </main>
  );
};

export default RouteErrorPage;
