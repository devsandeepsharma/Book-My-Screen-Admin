import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import AddMovies from "./pages/AddMovies";
import ShowTimeManagement from "./pages/ShowTimeManagement";
import Login from "./pages/Login";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/categories",
          element: <Categories />
        },
        {
          path: "/add-movies",
          element: <AddMovies />
        },
        {
          path: "/showtime",
          element: <ShowTimeManagement />
        },
        {
          path: "/landing",
          element: <Landing />
        },
        {
          path: "/login",
          element: <Login />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;