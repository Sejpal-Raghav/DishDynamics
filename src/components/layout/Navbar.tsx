
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    { name: "Suggestions", path: "/suggestion" },
    { name: "Dashboard", path: "/dashboard" }
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6", 
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-primary font-semibold text-xl hover:opacity-80 transition-opacity"
        >
          MessMaster
        </Link>
        
        <ul className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative px-1 py-2",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transform animate-scale-in" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80"
            aria-label="Open Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-foreground rounded-full" />
              <span className="w-full h-0.5 bg-foreground rounded-full" />
              <span className="w-full h-0.5 bg-foreground rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
