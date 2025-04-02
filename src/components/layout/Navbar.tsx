
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import "../../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define links based on authentication state
  const getLinks = () => {
    const commonLinks = [
      { name: "Home", path: "/" },
    ];

    const guestLinks = [
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ];

    const userLinks = [
      { name: "Menu Selection", path: "/menu-selection" },
      { name: "Dashboard", path: "/dashboard" },
    ];

    const adminLinks = [
      { name: "Admin Dashboard", path: "/admin" },
    ];

    if (!isAuthenticated) {
      return [...commonLinks, ...guestLinks];
    }

    return isAdmin 
      ? [...commonLinks, ...userLinks, ...adminLinks]
      : [...commonLinks, ...userLinks];
  };

  const links = getLinks();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Dish Dynamics
        </Link>
        
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.name} className="navbar-link">
              <Link
                to={link.path}
                className={location.pathname === link.path ? "navbar-link-active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
          
          {isAuthenticated && (
            <li className="navbar-link">
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </li>
          )}
        </ul>

        <button className="navbar-mobile-button" aria-label="Open Menu">
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
