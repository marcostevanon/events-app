import { eventConverter, EventItem } from '@events-app/models';
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
  navigateBack: () => void;
}

export const useEventDetailController = ({
  cityId,
  eventId,
}: EventDetailControllerProps): EventDetailHook => {
  const navigate = useNavigate();

  const [value, isLoading, error] = useDocument(
    doc(db, 'cities', cityId, 'events', eventId)
  );

  React.useEffect(() => {
    // TODO manage error
    if (error) console.log('useCities ~ error', error);
  }, [error]);

  const event = React.useMemo(() => {
    if (!value?.exists()) {
      return undefined;
    }
    const evtItem = eventConverter.fromFirestore(value, {});
    evtItem.id = value.id;
    return evtItem;
  }, [value]);

  const navigateBack = React.useCallback(() => {
    navigate(`/dashboard/cities/${cityId}/events`);
  }, [cityId, navigate]);

  return { isLoading, event, navigateBack };
};
