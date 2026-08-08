import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "../../css/app.css";
import '../react/vendor/fontawesome/css/all.min.css';
import "../react/vendor/fontawesome/js/all.min.js";


import LoginPage from "./views/LoginPage";
import DashboardView from "./views/DashboardView";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "view/records",
        element: <DashboardView />,
    }
]);

const container = document.getElementById("react-root");

if (container) {
    createRoot(container).render(<RouterProvider router={router} />);
}