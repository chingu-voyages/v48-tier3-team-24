interface NumberInputProps {
  label?: string;
  id: string;
  defaultValue?: string | number | undefined;
  readonly?: boolean;
  disable?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
}

export const NumberInput = (props: NumberInputProps) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={props.id} className="text-sm">
        {props.label}
      </label>
      <input
        id={props.id}
        type="number"
        name={props.id}
        defaultValue={props.defaultValue}
        readOnly={props.readonly}
        disabled={props.disable}
        required={props.required}
        className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"
        min={props.min}
        max={props.max}
      />
    </div>
  );
};
