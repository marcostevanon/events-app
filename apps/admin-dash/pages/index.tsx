import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../components/firebase';
import FullpageLoading from '../components/fullpage-loading/fullpage-loading';
import Login from '../components/login/login';

export function Index() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (user) {
      router.push('/channels');
    }
  }, [user, router]);

  if (loading) {
    return <FullpageLoading />;
  }

  if (error) {
    return <Text fontSize="md">{error.message}</Text>;
  }

  return <Login />;
}

export default Index;
