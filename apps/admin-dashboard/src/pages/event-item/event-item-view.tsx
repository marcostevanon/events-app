import {
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { MdModeEdit, MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useEventDetailController } from './event-item-controller';

export default function EventDetails() {
  const params = useParams();
  const cityId = params['cityId'];
  const eventId = params['eventId'];

  if (!cityId || !eventId) {
    return <Loading />;
  }

  return <EventDetailsView cityId={cityId} eventId={eventId} />;
}

interface EventsDetailsProps {
  cityId: string;
  eventId: string;
}

function EventDetailsView({ cityId, eventId }: EventsDetailsProps) {
  const { isLoading, event, city, editEvent, navigateBack } =
    useEventDetailController({ cityId, eventId });

  if (isLoading || !event || !city) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Flex mb="5" ml="1">
        <IconButton
          onClick={navigateBack}
          icon={<MdOutlineKeyboardBackspace />}
          variant="ghost"
          aria-label="event detail"
          size="lg"
          mr="2"
        />
        <Flex flexDirection="column">
          <Text fontSize="3xl">{event.name}</Text>
          <Text fontSize="sm">{city.cityName}</Text>
        </Flex>
      </Flex>

      <Center px="2">
        <Card maxW="sm">
          <CardBody>
            {/* <Image src={event.imageLink} alt="Event image" borderRadius="lg" /> */}
            <Flex justifyContent="space-between">
              <Flex>
                <IconButton
                  onClick={editEvent}
                  icon={<MdModeEdit />}
                  variant="outline"
                  aria-label="event detail"
                  size="sm"
                  mr="3"
                  mt="1"
                />
                <Flex flexDirection="column">
                  <Text fontSize="2xl">{event.name}</Text>
                  <Text fontSize="sm" as="u">
                    {event.organizer}
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDirection="column" alignItems="flex-end" minW="30%">
                <Text fontSize="sm">
                  {event.dateTime.toLocaleString('en-UK', {
                    weekday: 'long',
                  })}
                </Text>
                <Text fontSize="sm">
                  {event.dateTime.toLocaleString('en-UK', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Flex>
            </Flex>
            <Stack mt="3">
              <Text>{event.description}</Text>
            </Stack>
            <Stack spacing="1" mt="4">
              <Text fontSize="sm" color="gray.500">
                Created at:{' '}
                {event.createdAt.toLocaleString('en-UK', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              {event.createdAt.getTime() !== event.updatedAt.getTime() && (
                <Text fontSize="sm" color="gray.500">
                  Updated at:{' '}
                  {event.updatedAt.toLocaleString('en-UK', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              )}
              <Text fontSize="sm" color="gray.500">
                Created by: {event.createdBy}
              </Text>
            </Stack>
          </CardBody>
          {event.externalLink && (
            <React.Fragment>
              <Divider />
              <CardFooter>
                <Link href={event.externalLink} target="_blank">
                  <Flex gap="2" alignItems="center">
                    <BiLinkExternal aria-label="open external event link" />
                    <Text>{new URL(event.externalLink).host}</Text>
                  </Flex>
                </Link>
              </CardFooter>
            </React.Fragment>
          )}
        </Card>
      </Center>
    </React.Fragment>
  );
}
