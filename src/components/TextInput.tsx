interface TextInputProps {
  type: "text" | "textArea" | "number";
  label: string;
  id: string;
  required?: boolean
  min?: number
  max?: number
  placeholder?: string
  onChange?: (event: any) => void
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={props.id} className="text-sm">
        {props.label}
      </label>
      {/* <FiLock className="absolute left-4 top-9 text-blue-800" /> */}
      {props.type === "textArea" ? (
        <textarea
          name={props.id}
          {...props}
          className="w-full border-b-2 border-r-2 p-3 rounded-lg text-base sm:w-96 resize-none overflow-hidden"
          
        ></textarea>
      ) : (
        <input
          name={props.id}
          {...props}
          className="w-full border p-3 text-base sm:w-96"
        />
      )}
    </div>
  );
};
