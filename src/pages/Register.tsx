import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { toast } from "sonner";
import apiClient from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import "../styles/Page.css";
import "../styles/Forms.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Add a fade-in effect when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("animate-in");
    
    return () => {
      document.body.classList.remove("animate-in");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);

    try {
      console.log("Attempting to register with:", {
        username: formData.username,
        email: formData.email,
        password: "********", // Don't log actual password
      });
      
      const response = await apiClient.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration response:", response.data);

      // Save token and user data using the Auth Context
      login(response.data.token, response.data.user);

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Registration failed";
                         
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <main className="page-main">
        <div className="max-width-2xl">
          <div className="form-container">
            <div className="form-header">
              <h2 className="heading-2">Create an Account</h2>
              <p className="body-text">Sign up to start using our services</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="form-button w-full"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
