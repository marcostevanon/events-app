import { Container, Flex, Text } from '@chakra-ui/react';
import { EventItem, EventItemDto } from '@events-app/models';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../../../components/firebase';
import Loading from '../../../../../components/loading/loading';
import SidebarWithHeader from '../../../../../components/sidebar/sidebar';

function EventDetail() {
  const router = useRouter();
  const cityId = router.query.cityId as string;
  const eventId = router.query.eventId as string;
  console.log('EventDetail ~ eventId', eventId);

  return (
    <SidebarWithHeader>
      <Container maxW="container.lg">
        <Flex>
          <Text fontSize="3xl" as="b" mb="5">
            Event
          </Text>
        </Flex>

        {cityId && eventId && (
          <EventDetailView cityId={cityId} eventId={eventId} />
        )}
      </Container>
    </SidebarWithHeader>
  );
}

function EventDetailView({
  cityId,
  eventId,
}: {
  cityId: string;
  eventId: string;
}) {
  const [value, loading, error] = useDocument(
    doc(db, 'cities', cityId, 'events', eventId)
  );
  console.log('CityDetail ~ value', value);
  console.log('CityDetail ~ error', error);

  const event: EventItem = React.useMemo(() => {
    if (!value) {
      return null;
    }
    const event = new EventItem({
      id: value.id,
      ...(value.data() as EventItemDto),
    });
    return event;
  }, [value]);
  console.log('constcities:CityTenant[]=React.useMemo ~ cities', event);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Flex key={event.id}>
          <Text>{event.name}</Text>
          <Text>{new Date(event.createdAt).toLocaleString()}</Text>
        </Flex>
      )}
    </>
  );
}

export default EventDetail;
