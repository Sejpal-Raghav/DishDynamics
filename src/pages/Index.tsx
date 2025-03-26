
import React from "react";
import Navbar from "@/components/layout/Navbar";
import StyledButton from "@/components/ui/StyledButton";
import StyledCard from "@/components/ui/StyledCard";
import { Download, ArrowRight, Heart } from "lucide-react";
import "../styles/Page.css";

const Index = () => {
  return (
    <div className="page">
      <Navbar />
      <main className="page-main container">
        <div className="welcome-section">
          <h1 className="heading-1">Welcome to Dish Dynamics</h1>
          <p className="body-text">
            Your complete solution for mess menu management and student preferences.
          </p>
          
          <div className="button-showcase">
            <h2 className="heading-3">Button Examples</h2>
            <div className="button-grid">
              <StyledButton>Default Button</StyledButton>
              <StyledButton variant="secondary">Secondary</StyledButton>
              <StyledButton variant="outline">Outline</StyledButton>
              <StyledButton variant="ghost">Ghost</StyledButton>
              <StyledButton size="sm">Small</StyledButton>
              <StyledButton size="lg">Large</StyledButton>
              <StyledButton icon={<Download size={16} />}>With Icon</StyledButton>
              <StyledButton fullWidth>Full Width</StyledButton>
            </div>
          </div>
          
          <div className="card-showcase">
            <h2 className="heading-3">Card Examples</h2>
            <div className="card-grid">
              <StyledCard>
                <h3 className="heading-4">Default Card</h3>
                <p>This is a simple card with default styling.</p>
              </StyledCard>
              
              <StyledCard variant="bordered">
                <h3 className="heading-4">Bordered Card</h3>
                <p>This card has a more visible border.</p>
              </StyledCard>
              
              <StyledCard variant="elevated">
                <h3 className="heading-4">Elevated Card</h3>
                <p>This card has elevation and hover effects.</p>
                <StyledButton className="card-button" size="sm" icon={<ArrowRight size={14} />}>
                  Learn More
                </StyledButton>
              </StyledCard>
              
              <StyledCard variant="elevated" className="feature-card">
                <div className="feature-icon">
                  <Heart size={24} color="#3a86ff" />
                </div>
                <h3 className="heading-4">Feature Card</h3>
                <p>A specialized card for highlighting features.</p>
                <StyledButton className="card-button" variant="ghost" size="sm">
                  Explore
                </StyledButton>
              </StyledCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
