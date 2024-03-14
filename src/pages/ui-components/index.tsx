"use client";
import { FaDiscord } from "react-icons/fa";
import Button from "~/components/Button";

export default function UiComponents(props) {
  const onClick = () => {
    console.log("s");
  };
  return (
    <>
      <Button
        color="primary"
        onClick={onClick}
        icon={<FaDiscord className="text-3xl" />}
      >
        Hi, This is a button
      </Button>
    </>
  );
}
