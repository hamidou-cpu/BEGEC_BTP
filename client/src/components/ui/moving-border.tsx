"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface MovingBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  variant?: "secondary" | "dark" | "glass" | "primary" | "default";
  size?: "sm" | "default" | "lg";
  [key: string]: any;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2800,
  className,
  variant = "secondary",
  size = "lg",
  disabled,
  ...otherProps
}: MovingBorderButtonProps) {
  const variantStyles = {
    secondary: {
      container: "shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40",
      border: "bg-[radial-gradient(#FFFFFF_30%,#FDE047_55%,hsl(var(--secondary))_75%,transparent_85%)]",
      inner: "bg-secondary hover:bg-secondary/90 text-white font-heading font-bold border-transparent",
    },
    dark: {
      container: "shadow-lg shadow-black/40 hover:shadow-secondary/20",
      border: "bg-[radial-gradient(hsl(var(--secondary))_40%,transparent_60%)]",
      inner: "bg-slate-950/90 hover:bg-slate-900 border border-secondary/40 text-white font-heading font-bold backdrop-blur-xl",
    },
    glass: {
      container: "shadow-lg shadow-black/20",
      border: "bg-[radial-gradient(hsl(var(--secondary))_45%,transparent_65%)]",
      inner: "bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-white text-white font-heading font-bold",
    },
    primary: {
      container: "shadow-lg shadow-primary/25",
      border: "bg-[radial-gradient(#60A5FA_40%,transparent_65%)]",
      inner: "bg-primary hover:bg-primary/90 text-white font-heading font-bold border-transparent",
    },
    default: {
      container: "",
      border: "bg-[radial-gradient(var(--sky-500,#0ea5e9)_40%,transparent_60%)]",
      inner: "bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white font-sans",
    },
  }[variant] || {
    container: "",
    border: "bg-[radial-gradient(hsl(var(--secondary))_40%,transparent_60%)]",
    inner: "bg-secondary text-white font-heading font-bold",
  };

  const sizeStyles = {
    sm: {
      container: "h-11 min-w-[130px]",
      inner: "px-5 py-2 text-xs md:text-sm",
    },
    default: {
      container: "h-13 min-w-[160px]",
      inner: "px-6 py-2.5 text-sm md:text-base",
    },
    lg: {
      container: "h-14 min-w-[180px]",
      inner: "px-8 py-3 text-base md:text-lg",
    },
  }[size] || {
    container: "h-14 min-w-[180px]",
    inner: "px-8 py-3 text-base md:text-lg",
  };

  return (
    <Component
      disabled={disabled}
      className={cn(
        "bg-transparent relative p-[1.5px] overflow-hidden inline-flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        sizeStyles.container,
        variantStyles.container,
        disabled && "opacity-60 pointer-events-none cursor-not-allowed",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-24 w-24 opacity-[0.9]",
              variantStyles.border,
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-center gap-2 w-full h-full antialiased transition-colors duration-200",
          sizeStyles.inner,
          variantStyles.inner,
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    try {
      const el = pathRef.current;
      if (!el) return;
      const length = el.getTotalLength?.();
      if (length && length > 0) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    } catch {
      // Element is hidden or SVG path is empty (e.g. mobile display: none or initial layout)
    }
  });

  const x = useTransform(progress, (val) => {
    try {
      const el = pathRef.current;
      if (!el) return 0;
      return el.getPointAtLength?.(val)?.x ?? 0;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    try {
      const el = pathRef.current;
      if (!el) return 0;
      return el.getPointAtLength?.(val)?.y ?? 0;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MovingBorderButton = Button;
export default Button;
