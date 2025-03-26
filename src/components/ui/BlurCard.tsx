
import React from "react";
import { cn } from "@/lib/utils";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  variant?: "default" | "elevated" | "bordered";
  children: React.ReactNode;
}

const BlurCard = React.forwardRef<HTMLDivElement, BlurCardProps>(
  ({ className, as: Component = "div", variant = "default", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "rounded-xl backdrop-blur-md transition-all duration-300 animate-in", 
          variant === "default" && "bg-white/60 shadow-sm",
          variant === "elevated" && "bg-white/70 shadow-glass",
          variant === "bordered" && "bg-white/40 border border-white/40",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BlurCard.displayName = "BlurCard";

export { BlurCard };
