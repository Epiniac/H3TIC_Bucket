// src/routes/routes.js
import Login from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";
import Hello from "../routes/Hello/Hello";
import ProtectedRoute from "../components/ProtectedRoute"; // Import de ProtectedRoute

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
    element: <ProtectedRoute element={<Hello />} />, // Route protégée
  },
];
