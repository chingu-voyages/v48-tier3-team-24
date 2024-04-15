import React from "react";

interface CheckboxProps {
  id: string;
  name?: string;
  label?: string;
  defaultValue?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <input
        id={props.id}
        name={props.name}
        type="checkbox"
        defaultChecked={props.defaultValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange ? props.onChange(event) : undefined;
        }}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
