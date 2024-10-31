import { createBrowserRouter } from "react-router-dom";

import SignIn from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";

export const routesConfig = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
];
export const router = createBrowserRouter(routesConfig);