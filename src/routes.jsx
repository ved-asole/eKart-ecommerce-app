import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Categories from "./components/home/Categories";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: <Loader />,
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  }
])

export default router