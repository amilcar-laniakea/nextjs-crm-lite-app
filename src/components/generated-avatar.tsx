import { botttsNeutral, initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant?: 'botttsNeutral' | 'initials';
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant = 'initials'
}: GeneratedAvatarProps) => {
  const s = (seed ?? '').trim() || 'U';

  const avatar = useMemo(() => {
    if (variant === 'botttsNeutral') {
      return createAvatar(botttsNeutral, { seed: s });
    }
    return createAvatar(initials, {
      seed: s,
      fontWeight: 500,
      fontSize: 42
    });
  }, [s, variant]);

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        className="w-[30px] sm:w-[30px]"
        src={avatar.toDataUri()}
        alt={`Avatar for ${s}`}
      />
      <AvatarFallback>{s.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
