import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../components/firebase';
import FullpageLoading from '../../components/fullpage-loading/fullpage-loading';

export function Dashboard() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  React.useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return <FullpageLoading />;
  }

  return (
    <Flex direction="column" align="center">
      <h1>Welcome to Dashboard!</h1>
      <Text fontSize="xl" display="block">
        {user.email}
      </Text>
      <Button onClick={logout}>Log out</Button>
    </Flex>
  );
}

export default Dashboard;
