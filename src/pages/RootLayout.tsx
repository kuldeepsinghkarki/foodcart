import { Outlet } from "react-router-dom";

import AppLinks from "./AppLinks";

function RootLayout() {
  return (
    <>
      <AppLinks />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
