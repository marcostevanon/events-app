import { Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Cities from '../pages/cities/cities-view';
import EventDetails from '../pages/event-item/event-item-view';
import Events from '../pages/events/events-view';
import Login from '../pages/login/login-view';
import Settings from '../pages/settings/settings';
import UnauthorizedPage from '../pages/unauthorized/unauthorized';
import { auth } from './firebase';
import { Loading } from './loading/loading';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/dashboard" element={<RequireAuth />}>
        <Route index element={<Navigate to="cities" />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cities/:cityId/events" element={<Events />} />
        <Route
          path="cities/:cityId/events/:eventId"
          element={<EventDetails />}
        />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function RequireAuth() {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading isFullscreen />;
  }

  if (error) {
    return <Text fontSize="md">{error.message}</Text>;
  }

  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
