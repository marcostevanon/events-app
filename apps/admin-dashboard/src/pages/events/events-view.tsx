import {
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { EventItem } from '@events-app/models';
import React from 'react';
import { BiCalendarPlus } from 'react-icons/bi';
import { CgEye } from 'react-icons/cg';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useEventsController } from './events-controller';

export default function Events() {
  const params = useParams();
  const cityId = params['cityId'];

  if (!cityId) {
    return <Loading />;
  }

  return <EventsView cityId={cityId} />;
}

interface EventsViewProps {
  cityId: string;
}

function EventsView({ cityId }: EventsViewProps) {
  const {
    city,
    events: eventsRaw,
    isLoading,
    navigateToEventDetail,
    navigateNewEvent,
    navigateBack,
  } = useEventsController({ cityId });

  const events: (EventItem & { dateTimeFormatted: string })[] =
    React.useMemo(() => {
      return eventsRaw.map((evt) => {
        const date = evt.dateTime.toLocaleString('en-UK', {
          dateStyle: 'short',
        });
        const time = evt.dateTime.toLocaleString('en-UK', {
          hour12: false,
          timeStyle: 'short',
        });
        return { ...evt, dateTimeFormatted: `${date} ${time}` };
      });
    }, [eventsRaw]);

  if (isLoading || !city) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Flex justifyContent="space-between">
        <Text fontSize="3xl" mb="5" ml="1">
          <IconButton
            onClick={navigateBack}
            icon={<MdOutlineKeyboardBackspace />}
            variant="ghost"
            aria-label="event detail"
            size="lg"
            mr="2"
          />
          <u>{city.cityName}</u> events
        </Text>

        <IconButton
          display={{ base: 'flex', sm: 'none' }}
          mr="5"
          onClick={navigateNewEvent}
          icon={<BiCalendarPlus />}
          variant="outline"
          aria-label="add new event"
        />
        <Button
          display={{ base: 'none', sm: 'flex' }}
          onClick={navigateNewEvent}
          leftIcon={<BiCalendarPlus />}
          variant="outline"
          aria-label="add new event"
        >
          Add Event
        </Button>
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Event Name</Th>
            <Th>Organizer</Th>
            <Th>Date Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td py="0">
                <IconButton
                  onClick={navigateToEventDetail.bind(null, {
                    cityId,
                    eventId: event.id,
                  })}
                  variant="ghost"
                  icon={<CgEye />}
                  aria-label="event detail"
                />
              </Td>
              <Td>{event.name}</Td>
              <Td>{event.organizer}</Td>
              <Td>{event.dateTimeFormatted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}
