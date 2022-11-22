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
import { City } from '@events-app/models';
import { collection } from 'firebase/firestore';
import { CityDto } from 'libs/models/src/admin/cityDto.model';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { CgEye } from 'react-icons/cg';
import { db } from '../../components/firebase';
import Loading from '../../components/loading/loading';
import SidebarWithHeader from '../../components/sidebar/sidebar';

const useCities = () => {
  const [value, loading, error] = useCollection(collection(db, 'cities'));
  console.log('useCities ~ error', error);

  const cities: City[] = React.useMemo(() => {
    if (!value) {
      return null;
    }
    const cityList: City[] = [];
    value.forEach((a) => {
      const city = new City({ id: a.id, ...(a.data() as CityDto) });
      cityList.push(city);
    });
    return cityList;
  }, [value]);

  return { loading, cities };
};

export function Cities() {
  const { loading, cities } = useCities();

  return (
    <SidebarWithHeader>
      <Container maxW="container.lg">
        <Flex>
          <Text fontSize="3xl" as="b" mb="5">
            Cities
          </Text>
        </Flex>

        {loading ? (
          <Loading />
        ) : (
          <TableContainer whiteSpace="nowrap">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>City</Th>
                  <Th>City Telegram Channel</Th>
                  <Th>Created At</Th>
                  <Th isNumeric>Subscriber Count</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cities.map((city) => (
                  <Tr key={city.id}>
                    <Td py="0" px="2">
                      <Link href={`/cities/${city.id}/events`}>
                        <IconButton icon={<CgEye />} aria-label="city detail" />
                      </Link>
                    </Td>
                    <Td>{city.cityName}</Td>
                    <Td>
                      <Text>
                        <Link href={city.telegramChatLink}>
                          {city.telegramChatLink}
                        </Link>
                      </Text>
                    </Td>
                    <Td>{new Date(city.createdAt).toLocaleString()}</Td>
                    <Td isNumeric>
                      {/* {Intl.NumberFormat('id').format(ch.subscriberCount)} */}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </SidebarWithHeader>
  );
}

export default Cities;
