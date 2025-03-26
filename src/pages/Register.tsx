
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StudentForm from "@/components/forms/StudentForm";
import "../styles/Page.css";

const Register = () => {
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
      <main className="page-main">
        <div className="max-width-2xl">
          <StudentForm />
        </div>
      </main>
    </div>
  );
};

export default Register;
