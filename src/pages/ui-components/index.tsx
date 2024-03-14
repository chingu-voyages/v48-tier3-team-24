"use client";

import Link from "next/link";

const UiComponents = () => {
  return (
    <>
      <div className="p-20">
        <h1 className="mb-5 text-xl font-bold">Components List</h1>
        <Link href="ui-components/button-demo">
          <p className="text-[#2245c6]">1. Go to Button Component Demo</p>
        </Link>
        <Link href="ui-components/event-components-demo">
          <p className="text-[#2245c6]">
            2. Go to Event List & Event Card Component Demo
          </p>
        </Link>
      </div>
    </>
  );
};

export default UiComponents;