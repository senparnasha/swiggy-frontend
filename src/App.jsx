

import Form from './components/Form.jsx';
import Error from './components/Error.jsx';
import Admin from './components/Admin.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";



// const AppLayout = () => {
//   return (
//     <div >
//      <Header/>
//       <Outlet />
//     </div>
//   );
// };

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Form />,
//       },
//       {
//         path: "/admin",
//         element: <Admin />,
//       },
     
//     ],
//     errorElement: <Error />,
//   },
// ]);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter} />);


// export default AppLayout;




const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/error',
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
