import type { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  modalOpen: boolean;
}

export default function Model(props: ModalProps) {
  return (
    <div>
      {props.modalOpen && (
        <div className="absolute right-0 top-0 h-full w-full bg-black bg-opacity-50 bg-blend-color-burn">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border bg-white shadow-lg">
              {props.children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
