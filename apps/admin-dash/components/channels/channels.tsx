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
import { Channel } from '@events-app/models';
import { CgEye } from 'react-icons/cg';

export function Channels() {
  // const events: Array<EventItem> = [
  //   {
  //     channelId: 'channels',
  //     createdAt: new Date(),
  //     createdBy: '',
  //     dateTime: new Date(),
  //     description: '',
  //     id: '',
  //     name: '',
  //     organizer: '',
  //     updatedAt: new Date(),
  //   },
  // ];

  const channels: Array<Channel> = [
    {
      id: 'channel1',
      name: 'Padova',
      telegramChatId: 11111111111,
      telegramChatLink: 'https://padova.t.me',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'channel1',
      name: 'Bologna',
      telegramChatId: 22222222222,
      telegramChatLink: 'https://bologna.t.me',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <Container maxW="container.lg">
      <Flex>
        <Text fontSize="3xl" as="b" mb="5">
          Channels
        </Text>
      </Flex>

      <TableContainer whiteSpace="nowrap">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Channel Name</Th>
              <Th>Telegram Link</Th>
              <Th>Created At</Th>
              <Th isNumeric>Subscriber Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {channels.map((ch) => (
              <Tr key={ch.id}>
                <Td py="0" px="2">
                  <Link href={`channels/${ch.telegramChatId}`}>
                    <IconButton icon={<CgEye />} aria-label="channel detail" />
                  </Link>
                </Td>
                <Td>{ch.name}</Td>
                <Td>
                  <Text>
                    <Link href={ch.telegramChatLink}>
                      {ch.telegramChatLink}
                    </Link>
                  </Text>
                </Td>
                <Td>{new Date(ch.createdAt).toLocaleString()}</Td>
                <Td isNumeric>{4.433}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Channels;
