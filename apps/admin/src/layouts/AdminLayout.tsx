import { Show, SignOutButton } from '@clerk/react';
import { NavLink, Outlet } from 'react-router';

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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
