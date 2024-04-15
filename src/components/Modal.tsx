import type { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  modalOpen: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      {props.modalOpen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-3 bg-black bg-opacity-50 bg-blend-color-burn z-50">
          <div className="rounded-lg max-h-full w-full sm:w-1/3 border bg-white shadow-lg p-5 overflow-auto">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
