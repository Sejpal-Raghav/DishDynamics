
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import useAuth from "@/hooks/useAuth";
import "../styles/Page.css";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [menuSelections, setMenuSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMealType, setFilterMealType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchMenuSelections();
  }, [token, filterMealType, filterDate]);

  const fetchMenuSelections = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/menu-selections/all";
      const queryParams = [];
      
      if (filterMealType) {
        queryParams.push(`mealType=${filterMealType}`);
      }
      
      if (filterDate) {
        queryParams.push(`date=${filterDate}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch menu selections");
      }
      
      const data = await response.json();
      setMenuSelections(data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching menu selections");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    // Create CSV string
    let csvContent = "Username,Email,Meal Type,Date,Selected Items\n";
    
    menuSelections.forEach((selection: any) => {
      const username = selection.userId.username;
      const email = selection.userId.email;
      const mealType = selection.mealType;
      const date = new Date(selection.date).toLocaleDateString();
      const items = selection.selectedItems.map((item: any) => item.name).join(", ");
      
      csvContent += `"${username}","${email}","${mealType}","${date}","${items}"\n`;
    });
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `menu-selections-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="page">
      <Navbar />
      <main className="page-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          
          <div className="dashboard-filters">
            <div className="filter-group">
              <label htmlFor="mealType">Filter by Meal Type</label>
              <select
                id="mealType"
                value={filterMealType}
                onChange={(e) => setFilterMealType(e.target.value)}
                className="form-select"
              >
                <option value="">All Meal Types</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snacks">Snacks</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="date">Filter by Date</label>
              <input
                type="date"
                id="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="form-input"
              />
            </div>
            
            <button
              onClick={downloadReport}
              className="dashboard-button"
              disabled={menuSelections.length === 0}
            >
              Download Report
            </button>
          </div>
          
          {loading ? (
            <div className="dashboard-loading">Loading selections...</div>
          ) : menuSelections.length === 0 ? (
            <div className="dashboard-empty">No menu selections found</div>
          ) : (
            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Meal Type</th>
                    <th>Date</th>
                    <th>Selected Items</th>
                  </tr>
                </thead>
                <tbody>
                  {menuSelections.map((selection: any) => (
                    <tr key={selection._id}>
                      <td>{selection.userId.username}</td>
                      <td>{selection.userId.email}</td>
                      <td className="capitalize">{selection.mealType}</td>
                      <td>{new Date(selection.date).toLocaleDateString()}</td>
                      <td>
                        <ul className="selection-items-list">
                          {selection.selectedItems.map((item: any) => (
                            <li key={item._id}>{item.name}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
