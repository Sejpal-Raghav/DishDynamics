
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import useAuth from "@/hooks/useAuth";
import "../styles/Page.css";
import "../styles/Dashboard.css";

const MenuSelection = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("breakfast");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectionDate, setSelectionDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchMenuItems();
  }, [token, activeTab]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/menu-items?mealType=${activeTab}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      
      const data = await response.json();
      setMenuItems(data);
      
      // Get user's previous selections for this meal type and date
      await fetchUserSelections();
    } catch (error: any) {
      toast.error(error.message || "Error fetching menu items");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSelections = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/menu-selections/my-selections?mealType=${activeTab}&date=${selectionDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        return; // It's okay if there are no previous selections
      }
      
      const data = await response.json();
      
      if (data.length > 0) {
        const selectedIds = data[0].selectedItems.map((item: any) => item._id);
        
        setSelectedItems((prev) => ({
          ...prev,
          [activeTab]: selectedIds,
        }));
      }
    } catch (error) {
      console.error("Error fetching previous selections:", error);
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      const currentSelected = [...prev[activeTab]];
      
      if (currentSelected.includes(itemId)) {
        return {
          ...prev,
          [activeTab]: currentSelected.filter((id) => id !== itemId),
        };
      } else {
        return {
          ...prev,
          [activeTab]: [...currentSelected, itemId],
        };
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedItems[activeTab].length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/menu-selections/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mealType: activeTab,
          date: selectionDate,
          selectedItems: selectedItems[activeTab],
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit selection");
      }
      
      toast.success(data.message || "Menu selection submitted successfully");
    } catch (error: any) {
      toast.error(error.message || "Error submitting menu selection");
    } finally {
      setSubmitting(false);
    }
  };

  // Add a fade-in effect when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("animate-in");
    
    return () => {
      document.body.classList.remove("animate-in");
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="page">
      <Navbar />
      <main className="page-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Menu Selection</h1>
          
          <div className="dashboard-filters">
            <div className="filter-group">
              <label htmlFor="selectionDate">Selection Date</label>
              <input
                type="date"
                id="selectionDate"
                value={selectionDate}
                onChange={(e) => setSelectionDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="tabs-container">
            <div className="tabs-list">
              {["breakfast", "lunch", "snacks", "dinner"].map((tab) => (
                <div
                  key={tab}
                  className={`tab-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>
            
            <div className={`tab-content ${activeTab ? "active" : ""}`}>
              {loading ? (
                <div className="dashboard-loading">Loading menu items...</div>
              ) : menuItems.length === 0 ? (
                <div className="dashboard-empty">No menu items available for {activeTab}</div>
              ) : (
                <>
                  <div className="menu-grid">
                    {menuItems.map((item: any) => (
                      <div key={item._id} className="menu-item">
                        <div className="menu-item-header">
                          <div className="menu-item-name">{item.name}</div>
                          <div className={`menu-item-badge ${item.dietaryType}`}>
                            {item.dietaryType}
                          </div>
                        </div>
                        {item.description && (
                          <div className="menu-item-description">{item.description}</div>
                        )}
                        <div className="menu-item-actions">
                          <label className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={selectedItems[activeTab].includes(item._id)}
                              onChange={() => handleItemSelect(item._id)}
                              className="checkbox-input"
                            />
                            <span className="checkbox-label">Select</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSubmit}
                      className="dashboard-button"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Selection"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuSelection;
