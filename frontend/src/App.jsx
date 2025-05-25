import Layout from "./Layout"
import { CreateToken } from "./components/CreateToken";
import Home from "./components/Home";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';



function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "createToken", element: <CreateToken /> }
      ]
    }
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
