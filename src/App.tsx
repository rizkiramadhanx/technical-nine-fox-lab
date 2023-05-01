import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import ApiService from './service/ApiService';
import TokenService from './service/TokenService';

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

if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mount401Interceptor();
} else {
  ApiService.removeHeader();
  ApiService.unmount401Interceptor();
}

ApiService.init('http://localhost:3000/api/v1');

function App() {
  return <RouterProvider router={router} />;
}

export default App;
