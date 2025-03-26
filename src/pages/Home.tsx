
import { Button } from "@/components/ui/button";
import { BlurCard } from "@/components/ui/BlurCard";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 mt-20">
        <section className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
            <div className="chip">Digital Mess Management</div>
            <h1 className="heading-1">
              Smart Mess Menu <br />
              <span className="text-primary">Management System</span>
            </h1>
            <p className="body-text max-w-lg">
              A modern solution for efficient mess menu planning and management.
              Submit your preferences, make food suggestions, and access reports with ease.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="bg-primary hover:bg-primary/90 transition-all">
                <Link to="/register">Register Student</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse-soft"></div>
              <BlurCard className="p-6 relative animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                  alt="Dining hall" 
                  className="w-full h-auto rounded-lg shadow-sm object-cover aspect-[4/3]"
                />
              </BlurCard>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="text-center mb-12 space-y-3">
            <div className="chip mx-auto">Features</div>
            <h2 className="heading-2">Why Choose Our System?</h2>
            <p className="body-text max-w-xl mx-auto">
              Our mess management system is designed with both students and administrators in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <BlurCard 
                key={index} 
                className="p-6 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <p className="body-text">{feature.description}</p>
                </div>
              </BlurCard>
            ))}
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <BlurCard variant="elevated" className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3 space-y-4">
                <div className="chip">Get Started</div>
                <h2 className="heading-2">Ready to improve your mess experience?</h2>
                <p className="body-text">
                  Join our system today and contribute to better menu planning and food quality in your mess.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex justify-end">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all">
                  <Link to="/register">Register Now</Link>
                </Button>
              </div>
            </div>
          </BlurCard>
        </section>
      </main>
      
      <footer className="py-8 bg-secondary/50 backdrop-blur-sm">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Mess Menu Management System. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Features for the homepage
const features = [
  {
    title: "Easy Registration",
    description: "Simple and fast student registration process with all necessary details.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
  },
  {
    title: "Menu Customization",
    description: "Select meal preferences and suggest food items that you would like to see on the menu.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  },
  {
    title: "Comprehensive Reports",
    description: "Generate detailed reports in Excel or PDF format for efficient mess management.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  },
];

export default Home;
