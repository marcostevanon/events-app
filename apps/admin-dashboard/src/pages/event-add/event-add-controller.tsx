import {
  City,
  CityDto,
  eventConverter,
  EventItem,
  EventItemCreate,
} from '@events-app/models';
import { addDoc, collection, doc } from 'firebase/firestore';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../app/firebase';

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

  const [cityValue, isLoading, error] = useDocument(doc(db, 'cities', cityId));

  React.useEffect(() => {
    // TODO manage error
    if (error) console.log('useCities ~ error', error);
  }, [error]);

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
      console.log('event', event);
      const now = new Date();
      const newEvent = new EventItem({
        ...event,
        id: '', // TODO firebase should create it
        cityId: cityId,
        createdAt: now,
        updatedAt: now,
        // TODO update createdBy
        createdBy: 'me',
      });
      console.log('event', newEvent);
      await addDoc(
        collection(db, 'cities', cityId, 'events'),
        eventConverter.toFirestore(newEvent)
      );
    },
    [cityId]
  );

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`, { replace: true });
  }, [cityId, navigate]);

  return { city, isLoading, createEvent, navigateBack };
};
