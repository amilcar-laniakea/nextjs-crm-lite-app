'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const HomeView = () => {
  const { signOut } = useAuth();
  return (
    <>
      <div>Home View!</div>
      <Button className="w-full" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
};
export default HomeView;
