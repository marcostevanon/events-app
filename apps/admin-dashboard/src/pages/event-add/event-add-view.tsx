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
import { Loading } from '../../components/loading/loading';
import { useEventAddController } from './event-add-controller';

interface EventAddViewProps {
  cityId: string;
}

export function EventAddView({ cityId }: EventAddViewProps) {
  const inputBorderColor = useColorModeValue('#B3B3B3', '#E0E1E7');

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
