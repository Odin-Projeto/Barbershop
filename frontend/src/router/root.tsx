import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/sign-in/login';
import { ScheduleForm } from '../pages/schedule/schedule-form';
import { ScheduleHome } from '../pages/schedule/schedule-home';
import { ProfileSettings } from '../pages/settings/profile-settings';
import { ConfirmSchedule } from '../pages/schedule/confirm-schedule';
import { ConfirmedSchedule } from '../pages/schedule/confirmed-schedule';
import { Search } from '../pages/schedule/search';
import { Professionals } from '../pages/settings/professionals';
import { ProfessionalForm } from '../pages/settings/professional-form';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      {
        path: '/settings',
        element: <ProfileSettings />,
      },
      {
        path: '/confirm-schedule',
        element: <ConfirmSchedule />,
      },
      {
        path: '/confirmed-schedule',
        element: <ConfirmedSchedule />,
      },
      {
        path: '/search-schedules',
        element: <Search />,
      },
      {
        path: '/professionals',
        element: <Professionals />,
      },
      {
        path: '/professional-form',
        element: <ProfessionalForm />,
      },
    ],
  },
]);
