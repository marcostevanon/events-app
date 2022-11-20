import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Channels from '../../components/channels/channels';
import { auth } from '../../components/firebase';
import FullpageLoading from '../../components/fullpage-loading/fullpage-loading';
import Settings from '../../components/settings/settings';
import SidebarWithHeader from '../../components/sidebar/sidebar';

const routes = [
  {
    slug: 'channels',
    label: 'Channel List',
    component: <Channels />,
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
    if (currentPath && !matchCmp) router.push('channels');
  }, [currentPath, matchCmp, router]);

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