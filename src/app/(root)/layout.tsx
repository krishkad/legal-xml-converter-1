import React, { ReactNode } from "react";

const RootMainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default RootMainLayout;
