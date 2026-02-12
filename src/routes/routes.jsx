import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
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
