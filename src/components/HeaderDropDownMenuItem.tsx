import type { ReactNode } from "react";

interface itemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export default function HeaderDropDownMenuItem(props: itemProps) {
  return (
    <div
      className="hover:text-blue flex cursor-pointer items-center justify-between hover:text-cyan-600"
      onClick={props.onClick}
    >
      {props.icon}
      <p>{props.label}</p>
    </div>
  );
}
