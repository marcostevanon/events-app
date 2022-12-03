import {
  City,
  CityDto,
  eventConverter,
  EventItem,
  EventItemCreate,
} from '@events-app/models';
import { addDoc, collection, doc } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../app/firebase';

interface EventAddControllerProps {
  cityId: string;
}

interface EventAddHook {
  isLoading: boolean;
  city?: City;
  createEvent: (event: EventItemCreate) => Promise<void>;
  navigateBack: () => void;
}

export const useEventAddController = ({
  cityId,
}: EventAddControllerProps): EventAddHook => {
  const navigate = useNavigate();

  const [user, isAuthloading, errorAuth] = useAuthState(auth);
  const [cityValue, isCityLoading, errorCity] = useDocument(
    doc(db, 'cities', cityId)
  );

  React.useEffect(() => {
    // TODO manage error
    if (errorAuth) console.log('useCities ~ errorAuth', errorAuth);
    if (errorCity) console.log('useCities ~ errorCity', errorCity);
  }, [errorAuth, errorCity]);

  const city = React.useMemo(() => {
    if (!cityValue) {
      return undefined;
    }

    const city = new City(cityValue.data() as CityDto);
    city.id = cityValue.id;
    return city;
  }, [cityValue]);

  const createEvent = React.useCallback(
    async (event: EventItemCreate) => {
      if (!user || !user.email) {
        logout();
        throw new Error('Authentication error - No user or email provided');
      }

      console.log('rawEvent', event);
      const now = new Date();
      const newEvent = new EventItem({
        ...event,
        id: '',
        cityId: cityId,
        createdAt: now,
        updatedAt: now,
        createdBy: user.email,
      });
      console.log('newEvent', newEvent);
      await addDoc(
        collection(db, 'cities', cityId, 'events'),
        eventConverter.toFirestore(newEvent)
      );
    },
    [cityId, user]
  );

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`, { replace: true });
  }, [cityId, navigate]);

  return {
    city,
    isLoading: isAuthloading || isCityLoading,
    createEvent,
    navigateBack,
  };
};
