import { getServerSession } from '@/lib/server-api';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getServerSession();

  if (!session.isAuthenticated) {
    redirect('/sign-in');
  }

  return <h1>Clients</h1>;
};

export default Home;
