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
import { CityTenant } from '@events-app/models';
import { collection } from 'firebase/firestore';
import { CityTenantDTO } from 'libs/models/src/admin/cityTenantDTO.model';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { CgEye } from 'react-icons/cg';
import { db } from '../firebase';

export function Cities() {
  const [value, loading, error] = useCollection(collection(db, 'cities'));
  console.log('Cities ~ error', error);

  const cities: CityTenant[] = React.useMemo(() => {
    if (!value) {
      return null;
    }
    const cityList: CityTenant[] = [];
    value.forEach((a) => {
      const city = new CityTenant({ id: a.id, ...(a.data() as CityTenantDTO) });
      cityList.push(city);
    });
    return cityList;
  }, [value]);
  console.log('constcities:CityTenant[]=React.useMemo ~ cities', cities);

  return (
    <Container maxW="container.lg">
      <Flex>
        <Text fontSize="3xl" as="b" mb="5">
          Cities
        </Text>
      </Flex>

      {loading ? (
        <div>loading...</div>
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
                    <Link href={`cities/${city.telegramChatId}`}>
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
  );
}

export default Cities;
