import { getServerSession } from '@/lib/server-api';
import HomeView from '@/modules/home/ui/views/home-view';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getServerSession();

  if (!session.isAuthenticated) {
    redirect('/sign-in');
  }

  return <HomeView />;
};

export default Home;
