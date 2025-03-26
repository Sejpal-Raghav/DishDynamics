
import Navbar from "@/components/layout/Navbar";
import CombinedMenuForm from "@/components/forms/CombinedMenuForm";

const MenuSelection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          <CombinedMenuForm />
        </div>
      </main>
    </div>
  );
};

export default MenuSelection;
