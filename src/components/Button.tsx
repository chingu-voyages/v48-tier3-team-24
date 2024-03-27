"use client";

import { type FC, type ReactNode, type ComponentProps } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/utils/components";

const buttonVariants = cva("px-10 py-3 cursor-pointer font-bold h-fit", {
  variants: {
    variant: {
      default: "",
      primary:
        "border border-[#0A2A75] text-white bg-[#0A2A75] hover:bg-[#0A2A75] hover:text-white hover:shadow-xl",
      warning:
        "border border-[#F2B705] text-white bg-[#F2B705] hover:bg-[#F2B705]  hover:text-white hover:shadow-lg",
      danger:
        "border border-[#F20505] text-white bg-[#F20505] hover:bg-[#F20505]  hover:text-white hover:shadow-lg",
      info: "border border-[#8C8C8C] text-white bg-[#8C8C8C] hover:bg-[#8C8C8C]  hover:text-white hover:shadow-lg",
    },
    outline: {
      default: "",
      primary:
        "border border-[#5865F2] text-[#5865F2] hover:text-[#FFFFFF] hover:bg-[#5865F2]",
      warning:
        "border border-[#F2B705] text-[#F2B705] hover:text-[#FFFFFF] hover:bg-[#F2B705]",
      danger:
        "border border-[#F20505] text-[#F20505] hover:text-[#FFFFFF] hover:bg-[#F20505]",
      info: "border border-[#8C8C8C] text-[#8C8C8C] hover:text-[#FFFFFF] hover:bg-[#8C8C8C]",
    },
    width: {
      default: "",
      full: "w-full",
      lg: "w-3/4",
      md: "w-1/2",
      sm: "w-1/4",
    },
    size: {
      default: "text-base",
      sm: "text-base",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
    rounded: {
      default: "rounded",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    outline: "default",
    size: "default",
    rounded: "default",
    width: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  type,
  icon,
  onClick,
  variant,
  size,
  rounded,
  outline,
  ...props
}) => {
  return (
    <>
      <button
        type={type ? type : "button"}
        className={cn(
          buttonVariants({ variant, size, rounded, outline, className }),
        )}
        onClick={onClick}
        {...props}
      >
        <span className="flex flex-row items-center justify-center gap-3">
          {icon}
          {children}
        </span>
      </button>
    </>
  );
};

export default Button;
