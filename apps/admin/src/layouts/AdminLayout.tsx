import { Show, SignOutButton } from '@clerk/react';
import { Link, NavLink, Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div>
      <header>
        <NavLink to="/" end>
          Store administration
        </NavLink>
        <Show when="signed-in">
          <SignOutButton />
        </Show>
        <Show when="signed-out">
          <Link className="text-blue-800 underline" to="/sign-in">
            Sign In
          </Link>
        </Show>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
