import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { TbHandStop } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <Box textAlign="center" py={20} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="red.500"
          rounded="50px"
          w="60px"
          h="60px"
          textAlign="center"
        >
          <TbHandStop size="30" color="white" />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        403 | Not Authorized
      </Heading>
      <Text color={'gray.500'}>You are not allowed to access this page</Text>
      <Text color={'gray.500'}>Contact the admin</Text>

      <Button variant="outline" my="5" onClick={goToLogin}>
        Go to Login
      </Button>
    </Box>
  );
}
