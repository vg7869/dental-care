import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;