import { createBrowserRouter } from "react-router-dom";
import SignUp from "../routes/SignUp/SignUp";
import SignIn from "../routes/SignIn/SignIn";
import Home from "../routes/Home/Home";
import Upload from "../routes/Upload/Upload";
import Hello from "../routes/Hello/Hello";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import FileInfo from "./FileInfo/FileInfo.jsx";

export const routesConfig = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/register",
        element: <SignUp />,
    },
    // {
    //   path: "/upload",
    //   element: <ProtectedRoute element={<Upload />} />,
    // },
    {
        path: "/upload",
        element: <Upload />,
    },
    {
        path: "/file-info",
        element: <FileInfo />,
    },
    {
        path: "/hello",
        element: <ProtectedRoute element={<Hello />} />,
    },
];
