import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from '../../components/firebase';

export function Login() {
  return (
    <Center p={8}>
      <Button
        w="sm"
        maxW="md"
        variant="outline"
        leftIcon={<FcGoogle />}
        onClick={signInWithGoogle}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default Login;
