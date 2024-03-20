interface TextInputProps {
  inputType: "text" | "textArea";
  label: string;
  id: string;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={props.id} className="text-sm">
        {props.label}
      </label>
      {/* <FiLock className="absolute left-4 top-9 text-blue-800" /> */}
      {props.inputType === "text" ? (
        <input
          id={props.id}
          type={props.inputType}
          name={props.id}
          required
          className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"
        />
      ) : (
        <textarea
          id={props.id}
          name={props.id}
          className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"
        ></textarea>
      )}
    </div>
  );
};
