import React from "react";
import Button from "../Button";

export const SideNav = () => {
  return (
    <div className="flex flex-col gap-2 w-48">
      <Button type="button">Button 1</Button>
      <Button type="button">Button 2</Button>
      <Button type="button">Button 3</Button>
      <Button type="button">Button 4</Button>
    </div>
  );
};
