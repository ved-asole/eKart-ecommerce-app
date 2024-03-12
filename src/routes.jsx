import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const RouteLoadError = lazy(() => import('./pages/RouteLoadError'));
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