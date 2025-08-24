import { getServerSession } from '@/lib/server-api';
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await getServerSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return <SignUpView />;
};

export default SignUpPage;
