import { getSessionAPI, signInAPI, signOutAPI, signUpAPI } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: session,
    isLoading,
    error
  } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: getSessionAPI,
    staleTime: 5 * 60 * 1000
  });

  const signUpMutation = useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      router.push('/sign-in');
    }
  });

  const signInMutation = useMutation({
    mutationFn: signInAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
      router.push('/');
    }
  });

  const signOutMutation = useMutation({
    mutationFn: signOutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.push('/sign-in');
    }
  });

  return {
    user: session?.user || null,
    isAuthenticated: session?.isAuthenticated || false,
    isLoading,
    error,

    signUp: signUpMutation.mutate,
    signUpLoading: signUpMutation.isPending,
    signUpError: signUpMutation.error,

    signIn: signInMutation.mutate,
    signInLoading: signInMutation.isPending,
    signInError: signInMutation.error,

    signOut: signOutMutation.mutate,
    signOutLoading: signOutMutation.isPending
  };
}
