
import React, { HTMLAttributes, ReactNode } from "react";
import "../../styles/StyledCard.css";

interface StyledCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  children: ReactNode;
}

const StyledCard = ({
  children,
  variant = "default",
  className = "",
  ...props
}: StyledCardProps) => {
  return (
    <div
      className={`styled-card ${variant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default StyledCard;
