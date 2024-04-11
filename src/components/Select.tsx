import { ChangeEvent, useEffect, useState } from "react";

interface SelectProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | number;
  readonly?: boolean;
  disable?: boolean;
  required?: boolean;
  data: Array<SelectItemProps>;
}

export interface SelectItemProps {
  label: string;
  value: string;
}

export const Select = (props: SelectProps) => {
  const [value, setValue] = useState<string | number | undefined>("");
  const [options, setOptions] = useState<Array<SelectItemProps>>([]);
  const [isShowSelectItems, setIsShowSelectItems] = useState<boolean>(false);

  useEffect(() => {
    setValue(props.defaultValue);
    setOptions(props.data);
    return;
  }, []);

  const onSelectItem = (item: SelectItemProps) => {
    console.log(item);
    setValue(item.value);
    setIsShowSelectItems(false);
  };
  const onFocusInput = () => {
    setIsShowSelectItems(true);
  };
  const onFocusOutInput = () => {
    setIsShowSelectItems(false);
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setOptions(
      props.data.filter((item: SelectItemProps) => {
        console.log(item, event.target.value);
        return item.label
          .toString()
          .toLowerCase()
          .includes(event.target.value.toString().toLowerCase());
      }),
    );
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-sm">
        {props.label}
      </label>
      <div className="relative">
        <input
          id={props.id}
          type="text"
          name={props.id}
          value={value}
          readOnly={props.readonly}
          disabled={props.disable}
          required={props.required}
          className="w-full border py-3 pl-10 pr-5 text-base sm:w-96"
          onFocus={onFocusInput}
          // onBlur={onFocusOutInput}
          onChange={onInputChange}
        />
        {isShowSelectItems ? (
          <div className="top-15  absolute right-0 z-50 w-full bg-white shadow">
            {options.map((item: SelectItemProps) => {
              return (
                <div
                  className="px-5 py-5 hover:cursor-pointer hover:bg-slate-500 hover:text-white"
                  key={item.value}
                  onClick={() => {
                    onSelectItem(item);
                  }}
                >
                  <p className="mb-4">{item.label}</p>
                  <hr />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
