import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { EventItemCreate } from '@events-app/models';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useEventAddController } from './event-add-controller';

export const EventAdd = () => {
  const params = useParams();
  const cityId = params['cityId'];

  if (!cityId) {
    return <Loading />;
  }

  return <EventAddView cityId={cityId} />;
};

interface EventAddViewProps {
  cityId: string;
}

function EventAddView({ cityId }: EventAddViewProps) {
  const { isLoading, city, createEvent, navigateBack } = useEventAddController({
    cityId,
  });

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

      <Formik
        initialValues={{
          name: '',
          organizer: '',
          dateTime: new Date(),
          description: '',
          externalLink: '',
        }}
        onSubmit={(values: EventItemCreate, actions) => {
          createEvent(values).then(() => {
            actions.setSubmitting(false);
            navigateBack();
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="name">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Event Name</FormLabel>
                  <Input {...field} placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="organizer">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Organizer</FormLabel>
                  <Input {...field} placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
