import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../context/auth-context/AuthContextProvider";
import avatarFallback from "../../assets/images/avatar-generations_rpge.jpg";
import { useQuery } from "@tanstack/react-query";
import { $Services } from "../../services/services-repository";
import { $QUERY_KEYS } from "../../query-keys/queryKeys";

export default function MainNavBar() {
  const { logout, userProfile } = useAuth();

  const {
    data: unreadNotificationsData,
    isLoading: unreadNotificationsLoading,
  } = useQuery({
    queryKey: $QUERY_KEYS.notifications.unreadCount ,
    queryFn: () => $Services.NOTIFICATIONS_REPOSITORY.getUnreadCount(),
  });
  console.log("unreadNotificationsData:", unreadNotificationsData);

  return (
    <Navbar isBordered variant="floating" className="bg-white py-3 ">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit text-md lg:text-2xl">
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent">
            Social
          </span>
          <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            App
          </span>
        </p>
      </NavbarBrand>

      <NavbarContent
        justify="center"
        className="flex gap-5 lg:gap-8 ms-4 md:ms-0 me-0 md:me-20  lg:me-12 xxl:me-35 lg:ms-0"
      >
        <div className="bg-gray-100 rounded-xl px-5  lg:px-8 py-5 flex gap-4 lg:gap-9 items-center">
          <NavbarItem className="flex items-center gap-0 lg:gap-2 font-semibold ">
            <NavLink
              to="feed"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
              }
            >
              <i className="fa-regular fa-house"></i>
              <span className="hidden sm:flex">Feed</span>
            </NavLink>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-0 lg:gap-2 font-semibold">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
              }
            >
              <i className="fa-regular fa-user"></i>
              <span className="hidden sm:flex">Profile</span>
            </NavLink>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-0 lg:gap-2 font-semibold">
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
              }
            >
              <div className="relative">
                <i className="fa-regular fa-bell"></i>
                <span className="absolute bottom-4 right-2 bg-red-500 text-white rounded-full px-2 min-w-6 max-w-fit h-6 text-xs flex items-center justify-center">
                  {unreadNotificationsData?.unreadCount > 99
                    ? "99+"
                    : unreadNotificationsData?.unreadCount || 0}
                </span>
              </div>
              <span className="hidden sm:flex">Notifications</span>
            </NavLink>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="flex items-center gap-2 cursor-pointer">
              <Avatar
                isBordered
                className="transition-transform"
                color="secondary"
                name={userProfile?.name || "User"}
                size="sm"
                src={
                  userProfile?.photo &&
                  !userProfile?.photo.includes("undefined")
                    ? userProfile?.photo
                    : avatarFallback
                }
              />
              <span className="hidden md:block ms-1 sm:text-[12px] lg:text-md font-medium">
                {userProfile?.name}
              </span>
              <i className="fa-solid fa-bars"></i>
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" as={Link} to="/profile">
              Profile
            </DropdownItem>
            <DropdownItem key="settings" as={Link} to="/settings">
              Settings
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
