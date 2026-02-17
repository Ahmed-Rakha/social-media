import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <h1>About</h1>,
  },
  {
    path: "/signup",
    element: <h1>Register</h1>,
  },
  {
    path: "/profile",
    element: <h1>Profile</h1>,
  },
  {
    path: "/saved-posts",
    element: <h1>Saved Posts</h1>,
  },
  {
    path: "/friends",
    element: <h1>Friends</h1>,
  },
  {
    path: "/events",
    element: <h1>Events</h1>,
  },
  {
    path: "/settings",
    element: <h1>Settings</h1>,
  },
  {
    path: "/post/:id",
    element: <h1>Single Post</h1>,
  },
  {
    path: "*",
    element: <h1>404 Not Found!</h1>,
  },
]);
