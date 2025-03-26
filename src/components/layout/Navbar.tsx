
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Menu Selection", path: "/menu-selection" },
    { name: "Dashboard", path: "/dashboard" }
  ];

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
        </ul>

        <button className="navbar-mobile-button" aria-label="Open Menu">
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
