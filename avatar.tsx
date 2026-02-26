import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  fallbackClassName?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  shape?: 'circle' | 'square';
}

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  className,
  fallbackClassName,
  status,
  shape = 'circle',
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const showFallback = !src || error;

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'relative overflow-hidden bg-gray-200 flex items-center justify-center',
          sizeClasses[size],
          shapeClasses[shape]
        )}
      >
        {showFallback ? (
          <span
            className={cn(
              'font-medium text-gray-600 select-none',
              fallbackClassName
            )}
          >
            {initials || alt.charAt(0).toUpperCase() || '?'}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

// Avatar group
interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    initials?: string;
  }>;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
  overlap?: boolean;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
  overlap = true,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const overlapClasses = {
    xs: '-space-x-1',
    sm: '-space-x-2',
    md: '-space-x-2',
    lg: '-space-x-3',
    xl: '-space-x-4',
    '2xl': '-space-x-5',
  };

  return (
    <div className={cn('flex items-center', overlap && overlapClasses[size], className)}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className={cn(
            'border-2 border-white',
            overlap && 'hover:z-10 hover:scale-110 transition-transform'
          )}
        />
      ))}
      {remaining > 0 && (
        <Avatar
          initials={`+${remaining}`}
          size={size}
          className="border-2 border-white bg-gray-800 text-white"
          fallbackClassName="text-white"
        />
      )}
    </div>
  );
}

// User info with avatar
interface UserInfoProps {
  name: string;
  email?: string;
  role?: string;
  avatar?: {
    src?: string;
    initials?: string;
  };
  size?: AvatarProps['size'];
  className?: string;
  showAvatar?: boolean;
}

export function UserInfo({
  name,
  email,
  role,
  avatar,
  size = 'md',
  className,
  showAvatar = true,
}: UserInfoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {showAvatar && (
        <Avatar
          src={avatar?.src}
          alt={name}
          initials={avatar?.initials || name.split(' ').map(n => n[0]).join('').toUpperCase()}
          size={size}
        />
      )}
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{name}</span>
        {email && <span className="text-sm text-gray-500">{email}</span>}
        {role && <span className="text-xs text-gray-400">{role}</span>}
      </div>
    </div>
  );
}

// Profile card
interface ProfileCardProps {
  name: string;
  title?: string;
  company?: string;
  avatar?: {
    src?: string;
    initials?: string;
  };
  coverImage?: string;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  actions?: React.ReactNode;
  className?: string;
}

export function ProfileCard({
  name,
  title,
  company,
  avatar,
  coverImage,
  stats,
  actions,
  className,
}: ProfileCardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      {coverImage && (
        <div className="h-24 bg-gradient-to-r from-gray-400 to-gray-500">
          <img src={coverImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className={cn('p-6', coverImage && '-mt-12')}>
        <Avatar
          src={avatar?.src}
          alt={name}
          initials={avatar?.initials || name.split(' ').map(n => n[0]).join('').toUpperCase()}
          size="2xl"
          className={cn('border-4 border-white', coverImage && 'mx-auto')}
        />
        <div className={cn('mt-4', coverImage && 'text-center')}>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {title && <p className="text-sm text-gray-600">{title}</p>}
          {company && <p className="text-sm text-gray-500">{company}</p>}
        </div>
        {stats && stats.length > 0 && (
          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {actions && <div className="mt-6 flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

// Team member card
interface TeamMemberProps {
  name: string;
  role: string;
  bio?: string;
  avatar?: {
    src?: string;
    initials?: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  className?: string;
}

export function TeamMember({
  name,
  role,
  bio,
  avatar,
  social,
  className,
}: TeamMemberProps) {
  return (
    <div className={cn('text-center', className)}>
      <Avatar
        src={avatar?.src}
        alt={name}
        initials={avatar?.initials || name.split(' ').map(n => n[0]).join('').toUpperCase()}
        size="xl"
        className="mx-auto"
      />
      <h4 className="mt-4 text-lg font-medium text-gray-900">{name}</h4>
      <p className="text-sm text-[#C9A962]">{role}</p>
      {bio && <p className="mt-2 text-sm text-gray-600">{bio}</p>}
      {social && (
        <div className="mt-4 flex justify-center gap-3">
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
