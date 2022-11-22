import { Button, Center, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { db, signInWithGoogle } from '../../components/firebase';

export function Login() {
  const signInWithGoogleWrapper = React.useCallback(async () => {
    const user = await signInWithGoogle();

    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.metadata);
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.data());
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.ref);
  }, []);

  return (
    <Center p={8}>
      <Button
        w="sm"
        maxW="md"
        variant="outline"
        leftIcon={<FcGoogle />}
        onClick={signInWithGoogleWrapper}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default Login;
