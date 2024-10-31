import { createBrowserRouter } from "react-router-dom";

<<<<<<< HEAD
import SignUp from "../routes/SignUp/SignUp";
import SignIn from "../routes/SignIn/SignIn";
import Home from "../routes/Home/Home";

export const routesConfig = [
  {
    path: "/",
    element: <Home />,
=======
import Login from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";
import Hello from "./Hello/Hello.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const routesConfig = [
  {
    path: "/login",
    element: <Login />,
>>>>>>> 0b674568a6d81082e20d6e0cd0829a7be86fba88
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
