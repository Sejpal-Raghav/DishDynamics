
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import CombinedMenuForm from "@/components/forms/CombinedMenuForm";

const MenuSelection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-1 container px-4 pt-28 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto">
          <CombinedMenuForm />
        </div>
      </motion.main>
    </div>
  );
};

export default MenuSelection;
