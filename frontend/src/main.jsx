import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routesConfig } from "./routes/routes";

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  </React.StrictMode>
);
