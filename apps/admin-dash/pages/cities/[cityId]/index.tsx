import { useRouter } from 'next/router';
import React from 'react';

export function Index() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/cities');
  }, [router]);

  return null;
}

export default Index;
