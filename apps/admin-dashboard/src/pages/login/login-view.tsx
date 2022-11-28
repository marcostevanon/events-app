import { Box, Button, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { Loading } from '../../components/loading/loading';
import { useLoginController } from './login-controller';

export default function Login() {
  const { loginFunction, isLoading } = useLoginController();

  if (isLoading) {
    return <Loading isFullscreen text="Authorizing..." />;
  }

  return (
    <Box textAlign="center" py={20} px={6}>
      <Button
        w="sm"
        maxW="md"
        variant="outline"
        leftIcon={<FcGoogle size="20" />}
        onClick={loginFunction}
      >
        <Box textAlign="center">
          <Text fontSize="xl">Sign in with Google</Text>
        </Box>
      </Button>
    </Box>
  );
}
