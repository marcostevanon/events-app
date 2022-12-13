import { City, CityDto, eventConverter, EventItem } from '@events-app/models';
import { doc } from 'firebase/firestore';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../app/firebase';

interface EventDetailControllerProps {
  cityId: string;
  eventId: string;
}

interface EventDetailHook {
  isLoading: boolean;
  city?: City;
  event?: EventItem;
  editEvent: () => void;
  navigateBack: () => void;
}

export const useEventDetailController = ({
  cityId,
  eventId,
}: EventDetailControllerProps): EventDetailHook => {
  const navigate = useNavigate();

  const [cityValue, isCityLoading, errorCity] = useDocument(
    doc(db, 'cities', cityId)
  );

  const [eventsValue, isEventsLoading, eventsError] = useDocument(
    doc(db, 'cities', cityId, 'events', eventId)
  );

  React.useEffect(() => {
    // TODO manage error
    if (errorCity) console.log('useCities ~ errorCity', errorCity);
    if (eventsError) console.log('useCities ~ eventsError', eventsError);
  }, [eventsError, errorCity]);

  const city = React.useMemo(() => {
    if (!cityValue) {
      return undefined;
    }

    const city = new City(cityValue.data() as CityDto);
    city.id = cityValue.id;
    return city;
  }, [cityValue]);

  const event = React.useMemo(() => {
    if (!eventsValue?.exists()) {
      return undefined;
    }
    const evtItem = eventConverter.fromFirestore(eventsValue, {});
    evtItem.id = eventsValue.id;
    return evtItem;
  }, [eventsValue]);

  const editEvent = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events/${eventId}/edit`);
  }, [cityId, eventId, navigate]);

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`, { replace: true });
  }, [cityId, navigate]);

  return {
    isLoading: isCityLoading || isEventsLoading,
    event,
    city,
    editEvent,
    navigateBack,
  };
};
