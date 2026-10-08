import { NavLink, Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div>
      <header>
        <NavLink to="/" end>
          Store administration
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
