import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  color: "default" | "primary" | "warning" | "danger" | "info";
  icon?: ReactNode;
  link?: boolean;
  outline?: boolean;
  rounded?: boolean;
  styles?: string;
  onClick: MouseEventHandler;
}

export default function Button(props: ButtonProps) {
  let baseColor = "transparent";
  let baseBgColor = "transparent";
  let hoverBgColor = "#5865F2";
  let baseTextColor = "#5865F2";
  let hoverTextColor = "text-white";
  let baseBorderColor = "#5865F2";
  let hoverBorderColor = "#5865F2";
  switch (props.color) {
    case "primary":
      baseColor = "#5865F2";
    case "danger":
      baseColor = "#1865F2";
  }

  baseBgColor = baseColor;
  hoverBgColor = "transparent";
  baseTextColor = "text-white";
  hoverTextColor = baseColor;
  baseBorderColor = baseColor;
  hoverBorderColor = baseColor;

  if (props.outline) {
    baseBgColor = "transparent";
    hoverBgColor = baseColor;
    baseTextColor = baseColor;
    hoverTextColor = "text-white";
    baseBorderColor = baseColor;
  }

  const baseStyle = `${props.rounded ? "rounded" : ""} border border-[${baseBorderColor}] hover:border-[${hoverBorderColor}] px-10 py-3 text-[${baseTextColor}] font-bold w-full sm:w-96 bg-[${baseBgColor}] hover:bg-[${hoverBgColor}] hover:text-[${hoverTextColor}] cursor-pointer ${props.styles}`;

  return (
    <>
      <button
        type={props.type ? props.type : "button"}
        className={baseStyle}
        onClick={props.onClick}
      >
        <span className="flex flex-row items-center justify-center gap-3 text-xs sm:text-base">
          {props.icon}
          {props.children}
        </span>
      </button>
    </>
  );
}
