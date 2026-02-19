import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

import RootLayout from "../layouts/RootLayout";
import Signin from "../pages/auth/signin/Signin";
import Signup from "../pages/auth/signup/Signup";
import FeedPage from "../pages/feed/FeedPage";

export const routes = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/change-password",
    element: <h1>Change Password</h1>,
  },
  {
    path: "/profile",
    element: <h1>My Profile </h1>,
  },
  {
    path: "/profile/:userId",
    element: <h1>User Profile </h1>,
  },
  {
    path: "/suggestions",
    element: <h1>Suggestions</h1>,
  },

  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path: ":postId",
        element: <h1>post details</h1>,
      },

      {
        path: "/feed",
        element: <FeedPage />,
        // children: [
        //   {
        //     path: "",
        //     element: <h1>Get Home Feed</h1>,
        //   },
        //   {
        //     path: "community",
        //     element: <h1>Get Community Feed</h1>,
        //   },
        //   {
        //     path: "saved",
        //     element: <h1>Get Saved Posts</h1>,
        //   },
        //   {
        //     path: "my-posts",
        //     element: <h1>Get my Posts Feed</h1>,
        //   },
        // ],
      },
    ],
  },
]);
