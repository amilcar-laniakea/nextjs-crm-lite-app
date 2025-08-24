'use client';
import { Card, CardContent } from '@/components/ui/card';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, OctagonAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
});

export const SignInView = () => {
  const { signIn, signInLoading, signInError } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    signIn(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 w-full">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-4 pb-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Email:</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@example.com"
                            autoComplete="email"
                            disabled={signInLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Password:</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            autoComplete="current-password"
                            disabled={signInLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!signInError && (
                  <Alert
                    variant="destructive"
                    className="bg-destructive/10 border-none"
                  >
                    <OctagonAlertIcon className="h-4 w-4 !destructive" />
                    <AlertTitle>{signInError.message}</AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={signInLoading}
                  type="submit"
                  className="w-full"
                >
                  {signInLoading ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t pt-4">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4 text-blue-800"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center p-4">
            <p className="text-2xl font-semibold text-white">CRM Lite</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {' '}
        By clicking continue, you agree to our <a href="#">
          Terms of Service
        </a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
