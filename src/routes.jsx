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
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));

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
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "profile",
        element: <ProtectedRoute> <Profile /> </ProtectedRoute>
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
        path: "orders/:orderId",
        element: <ProtectedRoute> <OrderDetails /> </ProtectedRoute>
      },
      // Only users with the 'ADMIN' role can access the AdminPanel
      {
        path: "admin/:option?",
        element: <ProtectedRoute roles={['ADMIN']}> <AdminPanel /> </ProtectedRoute>
      },
      {
        path: "not-found",
        element: <RouteLoadError />
      },
      {
        path: "*",
        element: <RouteLoadError />
      }
    ]
  }
])

export default router