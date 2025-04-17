'use client';
import { ChevronUp, Leaf, Moon, Sun, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';


const themes = {
  light: {
    label: 'light',
    icon: <Sun className="mr-2 h-4 w-4" />,
  },
  dark: {
    label: 'dark',
    icon: <Moon className="mr-2 h-4 w-4" />,
  },
  environmental: {
    label: 'environmental',
    icon: <Leaf className="mr-2 h-4 w-4" />,
  },
  admin: {
    label: 'admin',
    icon: <ShieldCheck className="mr-2 h-4 w-4" />,
  },
} as const;

export function SidebarUserNav({ user }: { user: User }) {
  const { setTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10">
              <Image
                src={`https://avatar.vercel.sh/${user.email}`}
                alt={user.email ?? 'User Avatar'}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="truncate">{user?.email}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {Object.entries(themes).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                className="cursor-pointer"
                onSelect={() => setTheme(value.label)}
              >
                {value.icon}
                <span className="capitalize">{value.label}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => {
                  signOut({
                    redirectTo: '/',
                  });
                }}
              >
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
