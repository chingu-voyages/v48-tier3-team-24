import React, { type ReactNode } from "react";

type IconTooltipProps = {
  tooltip?: string;
  position?: "left" | "right" | "bottom";
  children: ReactNode;
};

const IconTooltip = ({ tooltip, position, children }: IconTooltipProps) => {
  let tooltipPosition = "";
  switch (position) {
    case "left": {
      tooltipPosition = "right-10 top-0";
      break;
    }
    case "right": {
      tooltipPosition = "left-10 top-0";
      break;
    }
    case "bottom": {
      tooltipPosition = "top-10";
      break;
    }
    default: {
      tooltipPosition = "bottom-10";
      break;
    }
  }

  const tooltipStyles = `absolute ${tooltipPosition} transition-all scale-0 rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100`

  return (
    <div className="group relative cursor-pointer">
      {children}
      {tooltip && (
        <span className={tooltipStyles}>
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default IconTooltip;
