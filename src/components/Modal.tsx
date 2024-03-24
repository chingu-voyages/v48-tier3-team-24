import { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  children?: ReactNode;
  header?: ReactNode;
  modalOpen?: boolean;
  onModalConfirm?: () => void;
  onCloseModal?: () => void;
}

export default function Model(props: ModalProps) {
  return (
    <div>
      {props.modalOpen && (
        <div className="absolute right-0 top-0 h-full w-full bg-black bg-opacity-50 bg-blend-color-burn">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border bg-white py-10 shadow-lg">
              <div className="px-10">{props.children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
