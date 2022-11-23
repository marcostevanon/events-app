import {
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
import { CgEye } from 'react-icons/cg';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../app/loading/loading';
import {
  useEventsController,
  useNavigateBackToCities,
} from './events-controller';

export default function Events() {
  const params = useParams();
  const cityId = params['cityId'];

  const { navigateBack } = useNavigateBackToCities();

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
          Events
        </Text>
      </Flex>

      {cityId && <CityEvents cityId={cityId} />}
    </React.Fragment>
  );
}

interface CityEventsProps {
  cityId: string;
}

function CityEvents({ cityId }: CityEventsProps) {
  const { isLoading, events, navigateToEventDetail } = useEventsController({
    cityId,
  });

  return isLoading ? (
    <Loading />
  ) : (
    <TableContainer whiteSpace="nowrap">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Event Name</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td>
                <IconButton
                  onClick={navigateToEventDetail.bind(null, {
                    cityId,
                    eventId: event.id,
                  })}
                  icon={<CgEye />}
                  aria-label="event detail"
                />
              </Td>
              <Td>{event.name}</Td>
              <Td>{new Date(event.createdAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
