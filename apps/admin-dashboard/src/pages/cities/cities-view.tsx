import {
  Badge,
  Flex,
  IconButton,
  Link,
  Stack,
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
import { BiCalendarEvent } from 'react-icons/bi';
import { Loading } from '../../app/loading/loading';
import { useCities } from './cities-controller';

export default function Cities() {
  const { isLoading, cities, navigateToCityEvents } = useCities();

  return (
    <React.Fragment>
      <Flex>
        <Text fontSize="3xl" as="b" mb="5" ml="5">
          Cities
        </Text>
      </Flex>

      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer whiteSpace="nowrap">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Events</Th>
                <Th>City</Th>
                <Th>Channel Link</Th>
                <Th>Status</Th>
                {/* <Th isNumeric>Subscriber Count</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {cities.map((city) => (
                <Tr key={city.id}>
                  <Td py="0">
                    <IconButton
                      onClick={navigateToCityEvents.bind(null, {
                        cityId: city.id,
                      })}
                      variant="outline"
                      icon={<BiCalendarEvent />}
                      aria-label="city detail"
                    />
                  </Td>
                  <Td>{city.cityName}</Td>
                  <Td>
                    <Text>
                      <Link href={city.telegramChatLink}>
                        {city.telegramChatLink}
                      </Link>
                    </Text>
                  </Td>
                  <Td>
                    <Stack direction="row">
                      {city.status === 'active' && (
                        <Badge colorScheme="green">Active</Badge>
                      )}
                      {city.status === 'not_active' && (
                        <Badge colorScheme="red">Not Active</Badge>
                      )}
                      {city.status !== 'active' &&
                        city.status !== 'not_active' && <Badge>N/A</Badge>}
                    </Stack>
                  </Td>
                  {/* <Td isNumeric>
                      {Intl.NumberFormat('id').format(ch.subscriberCount)}
                    </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
}
