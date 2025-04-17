'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Leaf, Moon } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const themes = {
  light: {
    label: 'light',
    icon: <Moon className="mr-2 h-4 w-4" />,
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
    icon: <span className="mr-2 h-4 w-4">Admin</span>,
  },
} as const;
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          {theme === 'environmental' ? (
            <Leaf className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themes).map(([key, value]) => (
          <DropdownMenuItem key={key} onClick={() => setTheme(value.label)}>
            {value.icon}
            <span>{value.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
