import {
  City,
  CityDto,
  eventConverter,
  EventItem,
  EventItemCreate,
} from '@events-app/models';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../app/firebase';

interface EventAddControllerProps {
  cityId: string;
  eventId?: string;
}

interface EventEditHook {
  isLoading: boolean;
  city?: City;
  event?: EventItem;
  createEvent: (event: EventItemCreate) => Promise<void>;
  navigateBack: () => void;
}

export const useEventEditController = ({
  cityId,
  eventId,
}: EventAddControllerProps): EventEditHook => {
  const navigate = useNavigate();

  const [user, isAuthloading, errorAuth] = useAuthState(auth);

  const [cityValue, isCityLoading, errorCity] = useDocument(
    doc(db, 'cities', cityId)
  );

  const [{ eventValue, isEventLoading, errorEvent }, setEvent] =
    React.useState<{
      eventValue?: EventItem;
      isEventLoading: boolean;
      errorEvent?: string;
    }>({ isEventLoading: false });

  React.useEffect(() => {
    // TODO manage error
    if (errorAuth) console.log('useCities ~ errorAuth', errorAuth);
    if (errorCity) console.log('useCities ~ cityError', errorCity);
    if (errorEvent) console.log('useCities ~ errorEvent', errorEvent);
  }, [errorAuth, errorCity, errorEvent]);

  const city = React.useMemo(() => {
    if (!cityValue) {
      return undefined;
    }

    const city = new City(cityValue.data() as CityDto);
    city.id = cityValue.id;
    return city;
  }, [cityValue]);

  const getEvent = React.useCallback(
    async (eventId: string) => {
      try {
        setEvent({ isEventLoading: true });

        const docRef = doc(db, 'cities', cityId, 'events', eventId);
        const eventValue = await getDoc(docRef);

        if (!eventValue?.exists()) {
          return setEvent({
            eventValue: undefined,
            isEventLoading: false,
          });
        }
        const evtItem = eventConverter.fromFirestore(eventValue, {});
        evtItem.id = eventValue.id;
        setEvent({
          eventValue: evtItem,
          isEventLoading: false,
        });
      } catch (err) {
        console.log('error', err);
        setEvent({
          eventValue: undefined,
          isEventLoading: false,
          errorEvent: err as string,
        });
      }
    },
    [cityId]
  );

  React.useEffect(() => {
    if (!eventId) {
      return;
    }

    getEvent(eventId);
  }, [cityId, eventId, getEvent]);

  const createEvent = React.useCallback(
    async (event: EventItemCreate) => {
      if (!user || !user.email) {
        logout();
        throw new Error('Authentication error - No user or email provided');
      }

      const dateTime = new Date(
        new Date(event.date).setHours(
          event.time.getHours(),
          event.time.getMinutes(),
          event.time.getSeconds()
        )
      );
      const now = new Date();
      const newEvent = new EventItem({
        ...event,
        id: event.id ? event.id : '',
        cityId,
        dateTime,
        createdAt: event.id && event.createdAt ? event.createdAt : now,
        updatedAt: now,
        createdBy: event.id && event.createdBy ? event.createdBy : user.email,
      });

      if (event.id) {
        // update
        await updateDoc(
          doc(db, 'cities', cityId, 'events', event.id),
          eventConverter.toFirestore(newEvent)
        );
      } else {
        // create
        await addDoc(
          collection(db, 'cities', cityId, 'events'),
          eventConverter.toFirestore(newEvent)
        );
      }
    },
    [cityId, user]
  );

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`, { replace: true });
  }, [cityId, navigate]);

  return {
    city,
    event: eventValue,
    isLoading: isAuthloading || isCityLoading || isEventLoading,
    createEvent,
    navigateBack,
  };
};
