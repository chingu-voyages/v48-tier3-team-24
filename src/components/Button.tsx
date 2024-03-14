import { MouseEventHandler } from "react";

interface ButtonProps {
  buttonType: "submit" | "reset" | "button";
  buttonText: string;
  onClick?: MouseEventHandler | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  color?: "primary" | "warning" | "cancel" | undefined;
  icon?: React.ReactNode | undefined;
}

export const Button = (props: ButtonProps) => {
  let buttonSchemeColor;

  switch (props.color) {
    case "primary":
      buttonSchemeColor = "border-[#7981da]";
    default:
      buttonSchemeColor = "border-black";
  }

  let tailwindCSS = `w-full cursor-pointer rounded border ${buttonSchemeColor} px-10 py-3 font-bold text-[#7981da] hover:bg-[#5865F2] hover:text-white`;

  return (
    <button
      type={props.buttonType}
      onClick={props.onClick}
      className={tailwindCSS}
    >
      <span className="flex flex-row items-center justify-center gap-3 text-xs sm:text-base">
        {props.icon} {props.buttonText}
      </span>
    </button>
  );
};
