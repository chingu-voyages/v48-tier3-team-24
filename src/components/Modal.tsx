import { ReactNode, useState } from "react";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  buttonType: "variant" | "outline";
  buttonColor: "primary" | "warning" | "danger" | "info";
  buttonText: string;
  header?: ReactNode;
  onModalConfirm?: () => void;
}

export default function Model(props: ModalProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onSetModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const ButtonComponent = () => {
    if (props.buttonType === "variant") {
      return (
        <Button variant={props.buttonColor} onClick={onSetModalOpen}>
          {props.buttonText}
        </Button>
      );
    }
    if (props.buttonType === "outline") {
      return (
        <Button outline={props.buttonColor} onClick={onSetModalOpen}>
          {props.buttonText}
        </Button>
      );
    }
  };

  return (
    <div>
      <ButtonComponent />
      {modalOpen && (
        <div className="absolute right-0 top-0 h-full w-full bg-black bg-opacity-50 bg-blend-color-burn">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border bg-white py-10 shadow-lg">
              <div className="p-10">{props.children}</div>
              <hr className="pt-5" />
              <div className="flex justify-between gap-5 px-10">
                <Button outline="info" onClick={onSetModalOpen}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={props.onModalConfirm}>Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
