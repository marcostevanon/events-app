import { City, CityDto, eventConverter, EventItem } from '@events-app/models';
import { collection, doc, orderBy, query, where } from 'firebase/firestore';
import React from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../app/firebase';

interface EventControllerProps {
  cityId: string;
}

interface NavigateToEventDetailProps {
  cityId: string;
  eventId: string;
}

interface EventsHook {
  isLoading: boolean;
  events: EventItem[];
  city?: City;
  navigateToEventDetail: (props: NavigateToEventDetailProps) => void;
  navigateNewEvent: () => void;
  navigateBack: () => void;
}

export const useEventsController = ({
  cityId,
}: EventControllerProps): EventsHook => {
  const navigate = useNavigate();

  const [cityValue, isCityLoading, cityError] = useDocument(
    doc(db, 'cities', cityId)
  );

  const [eventsValue, isEventsLoading, eventsError] = useCollection(
    query(
      collection(db, 'cities', cityId, 'events'),
      where('dateTime', '>=', new Date(new Date().setHours(0, 0, 0, 0))),
      orderBy('dateTime', 'asc')
    )
  );

  React.useEffect(() => {
    // TODO manage error
    if (cityError) console.log('useCities ~ error', cityError);
    if (eventsError) console.log('useCities ~ error', eventsError);
  }, [eventsError, cityError]);

  const city = React.useMemo(() => {
    if (!cityValue) {
      return undefined;
    }

    const city = new City(cityValue.data() as CityDto);
    city.id = cityValue.id;
    return city;
  }, [cityValue]);

  const events: EventItem[] = React.useMemo(() => {
    if (!eventsValue) {
      return [];
    }
    const eventList: EventItem[] = [];
    eventsValue.forEach((evt) => {
      const event = eventConverter.fromFirestore(evt, {});
      event.id = evt.id;
      eventList.push(event);
    });
    return eventList;
  }, [eventsValue]);

  const navigateToEventDetail = React.useCallback(
    ({ cityId, eventId }: NavigateToEventDetailProps) => {
      navigate(`/dashboard/cities/${cityId}/events/${eventId}`);
    },
    [navigate]
  );

  const navigateNewEvent = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/new`);
  }, [cityId, navigate]);

  const navigateBack = React.useCallback(() => {
    navigate('/dashboard/cities', { replace: true });
  }, [navigate]);

  return {
    city,
    events,
    isLoading: isCityLoading || isEventsLoading,
    navigateToEventDetail,
    navigateNewEvent,
    navigateBack,
  };
};
