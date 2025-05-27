import Layout from "./Layout"
import  CreateToken  from "./components/CreateToken";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Web3Provider } from "./components/Web3Provider";




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

    <Web3Provider>
          <RouterProvider router={router} />
      </Web3Provider>

  );
}

export default App;