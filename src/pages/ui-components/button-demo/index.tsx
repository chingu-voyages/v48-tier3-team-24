"use client";

import { FaDiscord } from "react-icons/fa";
import Button, { ButtonProps } from "~/components/Button";

const ButtonDemo = (props: ButtonProps) => {
  const onClick = () => {
    console.log("I do nothing");
  };
  return (
    <>
      <div className="p-20">
        <h1 className="mb-10 text-3xl font-bold">Components</h1>
        <h2 className="mb-2 text-xl font-bold">Button</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button variant="primary">This is a button</Button>
          <Button variant="warning">This is a button</Button>
          <Button variant="danger">This is a button</Button>
          <Button variant="info">This is a button</Button>
        </div>

        <h2 className="mb-2 text-xl font-bold">Button with Icon</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button variant="primary" icon={<FaDiscord className="text-3xl" />}>
            This is a button
          </Button>
        </div>

        <h2 className="mb-2 text-xl font-bold">Outline Button</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button outline="primary" icon={<FaDiscord className="text-3xl" />}>
            This is a button
          </Button>
          <Button outline="warning" icon={<FaDiscord className="text-3xl" />}>
            This is a button
          </Button>
          <Button outline="danger" icon={<FaDiscord className="text-3xl" />}>
            This is a button
          </Button>
          <Button outline="info" icon={<FaDiscord className="text-3xl" />}>
            This is a button
          </Button>
        </div>

        <h2 className="mb-2 text-xl font-bold">Button with Text Size</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button
            outline="primary"
            size="sm"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            size="md"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            size="lg"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            size="xl"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
        </div>

        <h2 className="mb-2 text-xl font-bold">Button with Border Radio</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button
            outline="primary"
            rounded="sm"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            rounded="md"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            rounded="lg"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
          <Button
            outline="primary"
            rounded="xl"
            icon={<FaDiscord className="text-3xl" />}
          >
            This is a button
          </Button>
        </div>

        <h2 className="mb-2 text-xl font-bold">Button OnClick</h2>
        <div className="mb-5 flex flex-wrap gap-5">
          <Button
            outline="primary"
            rounded="sm"
            icon={<FaDiscord className="text-3xl" />}
            onClick={onClick}
          >
            This is a button
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonDemo;
