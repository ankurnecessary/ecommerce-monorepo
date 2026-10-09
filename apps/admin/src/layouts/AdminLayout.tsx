import { Link, NavLink, Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div>
      <header>
        <NavLink to="/" end>
          Store administration
        </NavLink>
        <Link className="text-blue-800 underline" to="/category">
          Category
        </Link>
        <Link className="text-blue-800 underline" to="/sign-in">
          Sign In
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
