
import Navbar from "@/components/layout/Navbar";
import SuggestionForm from "@/components/forms/SuggestionForm";

const Suggestion = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          <SuggestionForm />
        </div>
      </main>
    </div>
  );
};

export default Suggestion;
