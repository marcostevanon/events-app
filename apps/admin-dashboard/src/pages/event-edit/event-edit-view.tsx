import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { EventItemCreate } from '@events-app/models';
import { ConfigProvider, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import merge from 'lodash/merge';
import React from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { BiRename } from 'react-icons/bi';
import { FaUserCog } from 'react-icons/fa';
import { MdLink, MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useEventEditController } from './event-edit-controller';

export const EventEdit = () => {
  const params = useParams();
  const cityId = params['cityId'];
  const eventId = params['eventId'];

  if (!cityId) {
    return <Loading />;
  }

  return <EventEditForm cityId={cityId} eventId={eventId} />;
};

interface EventAddViewProps {
  cityId: string;
  eventId?: string;
}

function EventEditForm({ cityId, eventId }: EventAddViewProps) {
  const inputBorderColor = useColorModeValue('#B3B3B3', '#E0E1E7');

  const { isLoading, city, event, createEvent, navigateBack } =
    useEventEditController({ cityId, eventId });

  const [submitting, setSubmitting] = React.useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventItemCreate>();

  React.useEffect(() => {
    if (!event) {
      return;
    }
    const evt: EventItemCreate = {
      id: event.id,
      cityId: event.cityId,
      name: event.name,
      organizer: event.organizer,
      date: event.dateTime,
      time: event.dateTime,
      description: event.description,
      externalLink: event.externalLink,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
    Object.entries(evt).forEach(([id, val]) =>
      setValue(id as keyof EventItemCreate, val)
    );
  }, [event, setValue]);

  console.log(errors);

  const onCreate: SubmitHandler<EventItemCreate> = React.useCallback(
    (data) => {
      setSubmitting(true);
      createEvent(merge(event, data)).then(() => {
        setSubmitting(false);
        navigateBack();
      });
    },
    [createEvent, event, navigateBack]
  );
  const onInvalid: SubmitErrorHandler<EventItemCreate> = React.useCallback(
    (err) => console.error(err),
    []
  );

  const onSubmit = handleSubmit(onCreate, onInvalid);

  if (isLoading || !city) {
    return <Loading />;
  }

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
          {eventId ? (
            <React.Fragment>
              Add Event in <u>{city?.cityName}</u>
            </React.Fragment>
          ) : (
            <React.Fragment>Edit Event</React.Fragment>
          )}
        </Text>
      </Flex>
      <form onSubmit={onSubmit}>
        <Box m={8}>
          <VStack spacing={5}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <InputGroup borderColor={inputBorderColor}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiRename color="gray.800" />}
                />
                <Input
                  type="text"
                  size="md"
                  disabled={submitting}
                  {...register('name', { required: true, maxLength: 200 })}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="organizer">
              <FormLabel>Organizer</FormLabel>
              <InputGroup borderColor={inputBorderColor}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserCog color="gray.800" />}
                />
                <Input
                  type="text"
                  size="md"
                  disabled={submitting}
                  {...register('organizer', {
                    required: true,
                    maxLength: 120,
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <InputGroup borderColor={inputBorderColor}>
                <Textarea
                  rows={4}
                  size="md"
                  disabled={submitting}
                  {...register('description', { maxLength: 120 })}
                />
              </InputGroup>
            </FormControl>

            <HStack width="100%">
              <ConfigProvider
                theme={{
                  token: {
                    // colorBgBase: 'gray.700',
                    // colorTextBase: '#fafafa',
                  },
                }}
              >
                <FormControl id="date">
                  <FormLabel>Date</FormLabel>
                  <InputGroup borderColor={inputBorderColor}>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          onChange={(date) => field.onChange(date?.toDate())}
                          value={field.value ? dayjs(field.value) : undefined}
                        />
                      )}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="time">
                  <FormLabel>Time</FormLabel>
                  <InputGroup borderColor={inputBorderColor}>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          onChange={(time) => field.onChange(time?.toDate())}
                          value={field.value ? dayjs(field.value) : undefined}
                        />
                      )}
                    />
                  </InputGroup>
                </FormControl>
              </ConfigProvider>
            </HStack>

            <FormControl id="externalLink">
              <FormLabel>Source Link</FormLabel>
              <InputGroup borderColor={inputBorderColor}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLink color="gray.800" />}
                />
                <Input
                  type="text"
                  size="md"
                  disabled={submitting}
                  {...register('externalLink')}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Button variant="solid" bg="#0D74FF" color="white" type="submit">
                Validate and Create
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </form>
    </React.Fragment>
  );
}
