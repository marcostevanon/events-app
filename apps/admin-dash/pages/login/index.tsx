import React from 'react';
import styled from 'styled-components';
import { signInWithGoogle } from '../../components/firebase';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: pink;
`;

export function Login(props: LoginProps) {
  const loginWithGoogle = React.useCallback(() => signInWithGoogle(), []);
  return (
    <StyledLogin>
      <h1>Welcome to Login!</h1>
      <button onClick={loginWithGoogle}>login google</button>
    </StyledLogin>
  );
}

export default Login;
