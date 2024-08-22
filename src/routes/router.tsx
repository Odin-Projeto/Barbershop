import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/sign-in/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
]);
