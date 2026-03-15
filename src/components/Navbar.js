import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-indigo-700 text-white" : "text-gray-300 hover:text-white hover:bg-indigo-700"
    }`;

  return (
    <nav className="bg-indigo-600 px-6 py-3 flex items-center justify-between shadow">
      <span className="text-white font-bold text-lg">🏦 PayApp</span>

      <div className="flex items-center gap-2">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/send"      className={linkClass}>Send Money</NavLink>
        <NavLink to="/statement" className={linkClass}>Statement</NavLink>
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
