import { createBrowserRouter } from "react-router-dom";

import Login from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";
import Hello from "./Hello/Hello.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const routesConfig = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/hello",
    element: <ProtectedRoute element={<Hello />} />,
  },
];
export const router = createBrowserRouter(routesConfig);
