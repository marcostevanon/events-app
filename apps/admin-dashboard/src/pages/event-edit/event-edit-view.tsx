import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { EventAddView } from '../event-add/event-add-view';
import { useEventEditController } from './event-edit-controller';

export const EventEdit = () => {
  const params = useParams();
  const cityId = params['cityId'];
  const eventId = params['eventId'];

  if (!cityId) {
    return <Loading />;
  }

  if (eventId) {
    return <EventEditView cityId={cityId} eventId={eventId} />;
  }

  return <EventAddView cityId={cityId} />;
};

interface EventEditViewProps {
  cityId: string;
  eventId: string;
}

function EventEditView({ cityId, eventId }: EventEditViewProps) {
  const { isLoading, city, createEvent, navigateBack } = useEventEditController(
    { cityId, eventId }
  );

  if (isLoading || !city) {
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
          Edit Event
        </Text>
      </Flex>
      <div>edit form todo</div>
    </React.Fragment>
  );
}
