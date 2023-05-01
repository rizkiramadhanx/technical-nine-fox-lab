import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
