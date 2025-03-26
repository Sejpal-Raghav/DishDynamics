
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";
import "../styles/Page.css";

const DashboardPage = () => {
  // Add a fade-in effect when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("animate-in");
    
    return () => {
      document.body.classList.remove("animate-in");
    };
  }, []);

  return (
    <div className="page">
      <Navbar />
      <main className="page-main container">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
