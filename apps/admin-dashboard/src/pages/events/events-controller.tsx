import { EventItem, EventItemDto } from '@events-app/models';
import { collection } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
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
  navigateToEventDetail: (props: NavigateToEventDetailProps) => void;
}

export const useEventsController = ({
  cityId,
}: EventControllerProps): EventsHook => {
  const navigate = useNavigate();
  const [value, isLoading, error] = useCollection(
    // query(
    collection(db, 'cities', cityId, 'events')
    // orderBy('timestamp', 'asc')
    // )
  );

  React.useEffect(() => {
    // TODO manage error
    if (error) console.log('useCities ~ error', error);
  }, [error]);

  const events: EventItem[] = React.useMemo(() => {
    if (!value) {
      return [];
    }
    const eventList: EventItem[] = [];
    value.forEach((evt) => {
      const event = new EventItem(evt.data() as EventItemDto);
      event.id = evt.id;
      eventList.push(event);
    });
    return eventList;
  }, [value]);

  const navigateToEventDetail = React.useCallback(
    ({ cityId, eventId }: NavigateToEventDetailProps) => {
      navigate(`/dashboard/cities/${cityId}/events/${eventId}`);
    },
    [navigate]
  );

  return { events, isLoading, navigateToEventDetail };
};

interface NavigateBackHook {
  navigateBack: () => void;
}

export const useNavigateBackToCities = (): NavigateBackHook => {
  const navigate = useNavigate();

  const navigateBack = React.useCallback(() => {
    navigate('/dashboard/cities');
  }, [navigate]);

  return { navigateBack };
};
