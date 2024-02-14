import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import { lazy } from "react";

const Categories = lazy(() => import('./pages/Categories'));

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "categories",
        element: <Categories />
      }
    ]
  }
])

export default router