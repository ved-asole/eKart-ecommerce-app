import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
const PaymentConfirmation = lazy(() => import('./pages/PaymentConfirmation'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const RouteLoadError = lazy(() => import('./pages/RouteLoadError'));
const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Auth = lazy(() => import('./pages/Auth'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));
const Orders = lazy(() => import('./pages/Orders'));

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
        path: "categories/:categoryId",
        element: <Products />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/:productId",
        element: <ProductDetails />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "auth",
        element: <Auth />
      },
      {
        path: "paymentConfirmation",
        element: <ProtectedRoute> <PaymentConfirmation /> </ProtectedRoute>
      },
      {
        path: "orders",
        element: <ProtectedRoute> <Orders /> </ProtectedRoute>
      },
      {
        path: "*",
        element: <RouteLoadError />
      }
    ]
  }
])

export default router