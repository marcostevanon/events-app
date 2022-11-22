import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cities from '../../components/cities/cities';
import { auth } from '../../components/firebase';
import FullpageLoading from '../../components/fullpage-loading/fullpage-loading';
import Settings from '../../components/settings/settings';
import SidebarWithHeader from '../../components/sidebar/sidebar';

const routes = [
  {
    slug: 'cities',
    label: 'Cities',
    component: <Cities />,
  },
  {
    slug: 'settings',
    label: 'Settings',
    component: <Settings />,
  },
];

const Dashboard = () => {
  const router = useRouter();
  const currentPath = router.query.route;
  const [user, loading] = useAuthState(auth);

  const matchCmp = React.useMemo(() => {
    return routes.find((cmp) => cmp.slug === currentPath);
  }, [currentPath]);

  React.useEffect(() => {
    if (currentPath && !matchCmp) router.push('cities');
  }, [currentPath, matchCmp, router]);

  // const testDb = React.useCallback(async () => {
  //   const docRef = doc(db, 'users', 's0CmiSQWw3ZtbsmAe0xP4nNSnr83');
  //   const docSnap = await getDoc(docRef);

  //   console.log('testDb ~ user', docSnap.data());
  // }, []);

  // React.useEffect(() => {
  //   testDb().then();
  // }, [testDb]);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, router, loading]);

  if (!user) {
    return <FullpageLoading />;
  }

  return (
    <SidebarWithHeader>{matchCmp && matchCmp.component}</SidebarWithHeader>
  );
};

export default Dashboard;
