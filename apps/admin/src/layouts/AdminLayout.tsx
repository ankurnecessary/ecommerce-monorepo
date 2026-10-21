import { Show } from '@clerk/react';
import { NavLink, Outlet, useNavigate } from 'react-router';

const AdminLayout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <NavLink to="/" end>
          Store administration
        </NavLink>
        <Show when="signed-in">
          <button
            type="button"
            onClick={() => navigate('/sign-out', { replace: true })}
          >
            Sign out
          </button>
        </Show>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
