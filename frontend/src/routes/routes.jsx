import { createBrowserRouter } from "react-router-dom";

import SignUp from "../routes/SignUp/SignUp";
import SignIn from "../routes/SignIn/SignIn";
import Upload from "../routes/Upload/Upload";
import FileInfo from "./FileInfo/FileInfo.jsx";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const routesConfig = [
    {
        path: "/",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/upload",
        element: <ProtectedRoute element={<Upload />} />,
    },
    {
        path: "/file-info",
        element: <ProtectedRoute element={<FileInfo />} />,
    },
];
