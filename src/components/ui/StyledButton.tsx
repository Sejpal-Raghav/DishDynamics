
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "../../styles/StyledButton.css";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const StyledButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  icon,
  ...props
}: StyledButtonProps) => {
  return (
    <button
      className={`styled-button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </button>
  );
};

export default StyledButton;
