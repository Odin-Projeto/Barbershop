import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/sign-in/login';
import { ScheduleForm } from '../pages/schedule/schedule-form';
import { PageNotFound } from '../pages/error/page-not-found';
import { ScheduleHome } from '../pages/schedule/schedule-home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/new-schedule',
        element: <ScheduleForm />,
      },
      {
        path: '/update-schedule',
        element: <ScheduleForm />,
      },
      {
        path: '/home',
        element: <ScheduleHome />,
      },
    ],
  },
]);
