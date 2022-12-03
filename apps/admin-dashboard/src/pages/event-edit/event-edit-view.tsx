import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { EventItemCreate } from '@events-app/models';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { BiCalendarEvent, BiRename } from 'react-icons/bi';
import { FaUserCog } from 'react-icons/fa';
import { MdLink, MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useEventAddController } from './event-add-controller';
import { useEventEditController } from './event-edit-controller';

export const EventEdit = () => {
  const params = useParams();
  const cityId = params['cityId'];
  const eventId = params['eventId'];

  if (!cityId) {
    return <Loading />;
  }

  if (eventId) {
    return <EventEditView cityId={cityId} eventId={eventId} />;
  }

  return <EventAddView cityId={cityId} />;
};

interface EventEditViewProps {
  cityId: string;
  eventId: string;
}

function EventEditView({ cityId, eventId }: EventEditViewProps) {
  const { isLoading, city, createEvent, navigateBack } = useEventEditController(
    { cityId, eventId }
  );

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
          Edit Event
        </Text>
      </Flex>
      <div>edit form todo</div>
    </React.Fragment>
  );
}

interface EventAddViewProps {
  cityId: string;
}

function EventAddView({ cityId }: EventAddViewProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const { isLoading, city, createEvent, navigateBack } = useEventAddController({
    cityId,
  });

  const {
    control,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<EventItemCreate>();

  console.log(errors);

  const onCreate: SubmitHandler<EventItemCreate> = React.useCallback(
    (data) => {
      setSubmitting(true);
      createEvent(data).then(() => {
        setSubmitting(false);
        navigateBack();
      });
    },
    [createEvent, navigateBack]
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
          Add Event in <u>{city?.cityName}</u>
        </Text>
      </Flex>
      <form onSubmit={onSubmit}>
        <Box m={8}>
          <VStack spacing={5}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <InputGroup borderColor="#E0E1E7">
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
              <InputGroup borderColor="#E0E1E7">
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
              <InputGroup borderColor="#E0E1E7">
                <Textarea
                  rows={4}
                  size="md"
                  disabled={submitting}
                  {...register('description', { maxLength: 120 })}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="dateTime">
              <FormLabel>Date and Time</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputRightElement
                  children={<BiCalendarEvent />}
                  color="gray.800"
                />
                <Controller
                  name="dateTime"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date: Date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  )}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="externalLink">
              <FormLabel>Source Link</FormLabel>
              <InputGroup borderColor="#E0E1E7">
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

            <FormControl id="name" float="right">
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
