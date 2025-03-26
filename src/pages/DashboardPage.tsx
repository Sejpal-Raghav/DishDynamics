
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 pt-28 pb-16">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
