import {
  Container,
  Flex,
  IconButton,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { EventItem, EventItemDto } from '@events-app/models';
import Loading from '../../../../components/loading/loading';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { CgEye } from 'react-icons/cg';
import { db } from '../../../../components/firebase';
import SidebarWithHeader from '../../../../components/sidebar/sidebar';

function CityDetail() {
  const router = useRouter();
  const cityId = router.query.cityId as string;
  console.log('CityDetail ~ cityId', cityId);

  return (
    <SidebarWithHeader>
      <Container maxW="container.lg">
        <Flex>
          <Text fontSize="3xl" as="b" mb="5">
            Cities
          </Text>
        </Flex>

        {cityId && <CityEvents cityId={cityId} />}
      </Container>
    </SidebarWithHeader>
  );
}

function CityEvents({ cityId }: { cityId: string }) {
  const [value, loading, error] = useCollection(
    // query(
    collection(db, 'cities', cityId, 'events')
    // orderBy('timestamp', 'asc')
    // )
  );
  console.log('CityDetail ~ value', value);
  console.log('CityDetail ~ error', error);

  const events: EventItem[] = React.useMemo(() => {
    if (!value) {
      return null;
    }
    const eventList: EventItem[] = [];
    value.forEach((a) => {
      const event = new EventItem({ id: a.id, ...(a.data() as EventItemDto) });
      eventList.push(event);
    });
    return eventList;
  }, [value]);
  console.log('constcities:CityTenant[]=React.useMemo ~ cities', events);

  return (
    <>
      {loading ? (
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
                    <Link href={`/cities/${cityId}/events/${event.id}/`}>
                      <IconButton icon={<CgEye />} aria-label="event detail" />
                    </Link>
                  </Td>
                  <Td>{event.name}</Td>
                  <Td>{new Date(event.createdAt).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default CityDetail;
