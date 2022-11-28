import {
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
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
    events,
    isLoading,
    navigateToEventDetail,
    navigateNewEvent,
    navigateBack,
  } = useEventsController({ cityId });

  if (isLoading || !city) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Flex justifyContent="space-between">
        <Text fontSize="3xl" as="b" mb="5" ml="1">
          <IconButton
            onClick={navigateBack}
            icon={<MdOutlineKeyboardBackspace />}
            variant="ghost"
            aria-label="event detail"
            size="lg"
            mr="2"
          />
          <u>{city.cityName}</u> Events
        </Text>
        <Button
          onClick={navigateNewEvent}
          leftIcon={<BiCalendarPlus />}
          variant="outline"
        >
          Add Event
        </Button>
      </Flex>

      <TableContainer whiteSpace="nowrap">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Event Name</Th>
              <Th>Organizer</Th>
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
                    variant="outline"
                    icon={<CgEye />}
                    aria-label="event detail"
                  />
                </Td>
                <Td>{event.name}</Td>
                <Td>{event.organizer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
