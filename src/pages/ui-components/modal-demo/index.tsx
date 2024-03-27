import { useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Button";
import Modal from "~/components/Modal";

export default function ModalDemo() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const onSetModalOpen = () => {
    setModalOpen(!modalOpen);
  };
  const onConfirm = () => {
    toast.success("Clicked confirm button");
  };
  return (
    <div className="p-20">
      <Button variant="primary" onClick={onSetModalOpen}>
        Open Modal
      </Button>
      <Modal modalOpen={modalOpen}>
        <p className="mb-5 text-lg">This is a title</p>
        <p className="mb-5">Custom Layout here</p>
        <hr />
        <div className="mt-5 flex justify-between gap-5">
          <Button outline="info" onClick={onSetModalOpen}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}
