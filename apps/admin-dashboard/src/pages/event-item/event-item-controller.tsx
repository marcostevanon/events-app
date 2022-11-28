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
  event?: EventItem;
  city?: City;
  navigateBack: () => void;
}

export const useEventDetailController = ({
  cityId,
  eventId,
}: EventDetailControllerProps): EventDetailHook => {
  const navigate = useNavigate();

  const [cityValue, isCityLoading, cityError] = useDocument(
    doc(db, 'cities', cityId)
  );

  const [eventsValue, isEventsLoading, eventsError] = useDocument(
    doc(db, 'cities', cityId, 'events', eventId)
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

  const event = React.useMemo(() => {
    if (!eventsValue?.exists()) {
      return undefined;
    }
    const evtItem = eventConverter.fromFirestore(eventsValue, {});
    evtItem.id = eventsValue.id;
    return evtItem;
  }, [eventsValue]);

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`, { replace: true });
  }, [cityId, navigate]);

  return {
    isLoading: isCityLoading || isEventsLoading,
    event,
    city,
    navigateBack,
  };
};
