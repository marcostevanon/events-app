import { Container, Flex } from '@chakra-ui/react';
import { EventItem } from '@events-app/models';

export function Channels() {
  const events: Array<EventItem> = [
    {
      channelId: 'channels',
      createdAt: new Date(),
      createdBy: '',
      dateTime: new Date(),
      description: '',
      id: '',
      name: '',
      organizer: '',
      updatedAt: new Date(),
    },
  ];

  return (
    <Container maxW="container.lg">
      <Flex>
        <h1>Welcome to Channels!</h1>
        {events.map((evt) => (
          <div key={evt.channelId}>{evt.name}</div>
        ))}
      </Flex>
    </Container>
  );
}

export default Channels;
