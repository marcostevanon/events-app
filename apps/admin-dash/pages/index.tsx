import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledPage = styled.h1``;

export function Index() {
  return (
    <StyledPage>
      <Box w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)">
        <div>Index!</div>
        <Link href="/login">Go to login</Link>
      </Box>
    </StyledPage>
  );
}

export default Index;
