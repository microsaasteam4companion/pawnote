import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PawIconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "brown" | "yellow" | "mint" | "white";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const variantClasses = {
  blue: "text-paw-blue",
  brown: "text-paw-brown",
  yellow: "text-paw-yellow",
  mint: "text-paw-mint",
  white: "text-white",
};

export const PawIcon = forwardRef<SVGSVGElement, PawIconProps>(
  ({ className, size = "md", variant = "brown", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {/* Main pad */}
        <ellipse cx="12" cy="16" rx="5" ry="4" />
        {/* Top left toe */}
        <ellipse cx="6" cy="9" rx="2.5" ry="3" />
        {/* Top right toe */}
        <ellipse cx="18" cy="9" rx="2.5" ry="3" />
        {/* Bottom left toe */}
        <ellipse cx="8" cy="6" rx="2" ry="2.5" />
        {/* Bottom right toe */}
        <ellipse cx="16" cy="6" rx="2" ry="2.5" />
      </svg>
    );
  }
);

PawIcon.displayName = "PawIcon";

export default PawIcon;
