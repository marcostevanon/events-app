import { Center, CircularProgress } from '@chakra-ui/react';

export function FullpageLoading() {
  return (
    <Center height="100vh" bg="blackAlpha.300">
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  );
}

export default FullpageLoading;
