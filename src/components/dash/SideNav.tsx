import React, { MouseEventHandler } from "react";
import { Button } from "../Button";

interface SideNavProps {}

export const SideNav = ({}: SideNavProps) => {
  return (
    <div className="flex flex-col gap-2 w-">
      <Button buttonType="button" buttonText="Button 1" />
      <Button buttonType="button" buttonText="Button 2" />
      <Button buttonType="button" buttonText="Button 3" />
      <Button buttonType="button" buttonText="Button 4" />
    </div>
  );
};
