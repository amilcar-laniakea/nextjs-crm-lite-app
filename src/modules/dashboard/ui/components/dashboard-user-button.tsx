'use client';

import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import { GeneratedAvatar } from '@/components/generated-avatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';

export const DashboardUserButton = () => {
  const isMobile = useIsMobile();

  const { user, isLoading, signOut } = useAuth();

  const onLogout = () => {
    signOut();
  };

  if (isLoading || !user) return null;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex gap-2 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
          {user?.avatar ? (
            <Avatar>
              <AvatarImage src={user.avatar} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={user?.name || 'Guest'}
              variant="initials"
              className="size-9"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{user?.name}t</p>
            <p className="text-xs truncate w-full">{user?.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{user?.name}</DrawerTitle>
            <DrawerDescription>{user?.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex gap-2 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {user?.avatar ? (
          <Avatar>
            <AvatarImage src={user.avatar} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={user?.name || 'Guest'}
            variant="initials"
            className="size-9"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{user?.name}</p>
          <p className="text-xs truncate w-full">{user?.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{user?.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
