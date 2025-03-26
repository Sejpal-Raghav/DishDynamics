
import Navbar from "@/components/layout/Navbar";
import StudentForm from "@/components/forms/StudentForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          <StudentForm />
        </div>
      </main>
    </div>
  );
};

export default Register;
