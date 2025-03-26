
import React from "react";
import "../../styles/globals.css";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  variant?: "default" | "elevated" | "bordered";
  children: React.ReactNode;
}

const BlurCard = React.forwardRef<HTMLDivElement, BlurCardProps>(
  ({ className, as: Component = "div", variant = "default", children, ...props }, ref) => {
    const cardClass = `glass-card ${className || ""}`;
    
    return (
      <Component ref={ref} className={cardClass} {...props}>
        {children}
      </Component>
    );
  }
);

BlurCard.displayName = "BlurCard";

export { BlurCard };
