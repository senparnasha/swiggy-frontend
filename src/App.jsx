

import Login from './components/Login.jsx';
import Error from './components/Error.jsx';
import Admin from './components/Admin.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SidebarWithContent from './components/SidebarComponent.jsx';
import ViewResturents from './components/ViewResturents.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <SidebarWithContent />, 
    children: [
      {
        path: '/admin/resturent',
        element: <Admin />,
      },
      {
        path: '/admin/resturent/viewall',
        element: <ViewResturents />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
