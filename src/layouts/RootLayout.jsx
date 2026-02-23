import { Outlet } from "react-router";
import MainNavBar from "../components/main-navbar/MainNavBar";

export default function RootLayout() {
  return (
    <>
      <MainNavBar />
      <Outlet />
    </>
  );
}
