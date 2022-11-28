import { Box, Center, CircularProgress, Text } from '@chakra-ui/react';

interface LoadingProps {
  isFullscreen?: boolean;
  text?: string;
}

function LoadingProgress() {
  return <CircularProgress isIndeterminate color="blue.300" />;
}

export const Loading = (props: LoadingProps) => {
  return props.isFullscreen ? (
    <Center height="100vh" bg="blackAlpha.300">
      <Box display="block" textAlign="center">
        <LoadingProgress />
        <Text py="2" color="gray.700" fontWeight="semibold">
          {props.text}
        </Text>
      </Box>
    </Center>
  ) : (
    <Box textAlign="center">
      <LoadingProgress />
    </Box>
  );
};
