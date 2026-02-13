import { cn } from "@/lib/utils";
import PawIcon from "./PawIcon";
import { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  variant: "blue" | "yellow" | "mint" | "beige" | "dark";
  style?: React.CSSProperties;
  icon?: LucideIcon;
  pawVariant?: "blue" | "brown" | "yellow" | "mint" | "white";
  className?: string;
}

const variantClasses = {
  blue: "card-blue",
  yellow: "card-yellow",
  mint: "card-mint",
  beige: "card-beige",
  dark: "card-dark",
};

const FeatureCard = ({ 
  title, 
  description, 
  variant, 
  icon: Icon,
  pawVariant = "brown",
  className,
  style
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-card transition-transform hover:scale-[1.02] duration-300",
        variantClasses[variant],
        className
      )}
      style={style}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {Icon ? (
            <Icon className={cn(
              "w-8 h-8",
              variant === "dark" ? "text-white" : "text-paw-brown"
            )} />
          ) : (
            <PawIcon 
              size="lg" 
              variant={variant === "dark" ? "white" : pawVariant} 
            />
          )}
        </div>
        <div>
          <h3 className={cn(
            "text-xl font-bold mb-2",
            variant === "dark" ? "text-white" : "text-foreground"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-sm leading-relaxed",
            variant === "dark" ? "text-white/80" : "text-muted-foreground"
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
