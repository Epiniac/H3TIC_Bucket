import { createBrowserRouter } from "react-router-dom";

import SignUp from "../routes/SignUp/SignUp";
import SignIn from "../routes/SignIn/SignIn";
import Home from "../routes/Home/Home";

export const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
];
export const router = createBrowserRouter(routesConfig);