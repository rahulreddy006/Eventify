import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Eventify
      </Link>
      
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/create">Create Event</Link>
            <Link to="/my-events">My Events</Link>
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
