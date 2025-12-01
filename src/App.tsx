import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner} from "sonner"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  }
])

function App() {
  return (
    <>
      <div className='flex h-full w-full'>
        <RouterProvider router={router} />
        <Sonner />
      </div>
    </>
  )
}

export default App;
