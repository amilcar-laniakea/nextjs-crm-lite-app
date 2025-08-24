import { getServerSession } from '@/lib/server-api';
import { SignInView } from '@/modules/auth/ui/views/sign-in-view';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
  const session = await getServerSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return <SignInView />;
};

export default SignInPage;
