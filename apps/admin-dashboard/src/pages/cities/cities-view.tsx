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
import { BiCalendarEvent, BiLinkExternal } from 'react-icons/bi';
import { Loading } from '../../components/loading/loading';
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
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Events</Th>
                <Th>City</Th>
                <Th>Status</Th>
                <Th display={{ base: 'block', sm: 'none' }}>Ch. Link</Th>
                <Th display={{ base: 'none', sm: 'block' }}>Channel Link</Th>
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
                      variant="ghost"
                      icon={<BiCalendarEvent />}
                      aria-label="city detail"
                    />
                  </Td>
                  <Td>{city.cityName}</Td>
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
                  <Td>
                    <Link href={city.telegramChatLink} target="_blank">
                      <Flex gap="2">
                        <BiLinkExternal aria-label="open telegram channel link" />
                        <Text display={{ base: 'none', sm: 'block' }}>
                          {city.telegramChatLink}
                        </Text>
                        <Text display={{ base: 'block', sm: 'none' }}>
                          {new URL(city.telegramChatLink).host}
                        </Text>
                      </Flex>
                    </Link>
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
