import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { lazy } from "react";
import RouteLoadError from "./pages/RouteLoadError";

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const Products = lazy(() => import('./pages/Products'));

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
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "*",
        element: <RouteLoadError />
      }
    ]
  }
])

export default router