"use client";

import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message: string;
  variant?: "primary" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function WhatsAppButton({
  message,
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message);

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-300";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: "bg-julia-blue text-white hover:bg-julia-charcoal",
    gold: "bg-julia-gold text-white hover:bg-julia-gold/90",
    outline:
      "border-2 border-julia-gold text-julia-gold hover:bg-julia-gold hover:text-white",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
}
