import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <h1>Dashboard</h1>
        },
        {
          path: "/categories",
          element: <h1>Categories</h1>
        },
        {
          path: "/add-movies",
          element: <h1>Add Movies</h1>
        },
        {
          path: "/showtime",
          element: <h1>Show time Managment</h1>
        },
        {
          path: "/users",
          element: <h1>Manage Users</h1>
        },
        {
          path: "/admins",
          element: <h1>Manage Admins</h1>
        },
        {
          path: "/landing",
          element: <h1>Landing Page</h1>
        },
        {
          path: "/login",
          element: <h1>Login Page</h1>
        },
        {
          path: "/register",
          element: <h1>Register Admin</h1>
        },
        {
          path: "/forgot-password",
          element: <h1>Forgot Password</h1>
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;