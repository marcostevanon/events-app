import { Center } from '@chakra-ui/react';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from '../../components/firebase';

export function Login() {
  return (
    <Center marginY="10">
      <GoogleButton onClick={signInWithGoogle} />
    </Center>
  );
}

export default Login;
