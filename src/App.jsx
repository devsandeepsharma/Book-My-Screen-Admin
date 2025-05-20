import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import AddMovies from "./pages/AddMovies";
import ShowTimeManagement from "./pages/ShowTimeManagement";
import Login from "./pages/Login";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PublicRoute from "./components/layout/PublicRoute";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          )
        },
        {
          path: "/add-movies",
          element: (
            <ProtectedRoute>
              <AddMovies />
            </ProtectedRoute>
          )
        },
        {
          path: "/showtime",
          element: (
            <ProtectedRoute>
              <ShowTimeManagement />
            </ProtectedRoute>
          )
        },
        {
          path: "/landing",
          element: (
            <PublicRoute>
              <Landing />
            </PublicRoute>
          )
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          )
        }
      ]
    }
  ])

  return (
    <AuthLayout>
      <RouterProvider router={router} />
    </AuthLayout>
  )
}

export default App;