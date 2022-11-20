import Link from 'next/link';
import styled from 'styled-components';

const StyledPage = styled.h1``;

export function Index() {
  return (
    <StyledPage>
      <div>Index!</div>
      <Link href="/login">Go to login</Link>
    </StyledPage>
  );
}

export default Index;
