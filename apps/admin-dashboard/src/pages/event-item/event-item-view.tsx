import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../app/loading/loading';
import { useEventDetailController } from './event-item-controller';

export default function EventDetails() {
  const params = useParams();
  const cityId = params['cityId'];
  const eventId = params['eventId'];

  if (!cityId || !eventId) {
    return <Loading />;
  }

  return <EventDetailsView cityId={cityId} eventId={eventId} />;
}

interface EventsDetailsProps {
  cityId: string;
  eventId: string;
}

function EventDetailsView({ cityId, eventId }: EventsDetailsProps) {
  const { isLoading, event, navigateBack } = useEventDetailController({
    cityId,
    eventId,
  });

  if (isLoading || !event) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Flex>
        <Text fontSize="3xl" as="b" mb="5" ml="1">
          <IconButton
            onClick={navigateBack}
            icon={<MdOutlineKeyboardBackspace />}
            variant="ghost"
            aria-label="event detail"
            size="lg"
            mr="2"
          />
          {event.name}
        </Text>
      </Flex>

      {event.name}
    </React.Fragment>
  );
}
