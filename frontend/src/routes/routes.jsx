import { createBrowserRouter } from "react-router-dom";
import SignUp from "../routes/SignUp/SignUp";
import SignIn from "../routes/SignIn/SignIn";
import Home from "../routes/Home/Home";
import Hello from "./Hello/Hello.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const routesConfig = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/upload",
    element: <ProtectedRoute element={<Hello />} />,
  },
];
