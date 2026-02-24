import { Outlet } from "react-router";
import MainNavBar from "../components/main-navbar/MainNavBar";

export default function RootLayout() {
  return (
    <>
      <MainNavBar />
      <div className=" bg-neutral-100 py-5">
        <Outlet />
      </div>
    </>
  );
}
