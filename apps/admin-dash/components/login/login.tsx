import { Button, Center, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { db, signInWithGoogle } from '../../components/firebase';

export function Login() {
  const signInWithGoogleWrapper = React.useCallback(async () => {
    const user = await signInWithGoogle();

    // const usersRef = collection(db, 'users', user.email, 'authorizedChannels');
    // console.log('signInWithGoogleWrapper ~ usersRef', usersRef);
    // const docSnap = await getDocs(usersRef);

    // Create a query against the collection.
    // const q = query(usersRef, where("state", "==", "CA"));

    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.metadata);
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.data());
    console.log('signInWithGoogleWrapper ~ docSnap', docSnap.ref);

    // const docRef = doc(db, 'users', res.user.email);
    // const docSnap = await getDoc(docRef);
    // console.log('signInWithGoogle ~ user', docSnap.data());

    // if (docs.docs.length === 0) {
    //   throw new Error('Not Authorized');
    // await addDoc(collection(db, 'users'), {
    //   uid: user.uid,
    //   name: user.displayName,
    //   authProvider: 'google',
    //   email: user.email,
    // });
    // }
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
