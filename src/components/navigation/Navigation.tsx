'use client';

import { useState, type ReactNode } from 'react';
import DefaultPad from '@/components/container/DefaultPad';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
}

interface NavigationProps {
  items: NavigationItem[];
  navChild?: ReactNode;
  sheetChild?: ReactNode;
  className?: string;
}

export default function Navigation({
  items,
  navChild,
  sheetChild,
  className = '',
}: NavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full font-roboto bg-background dark:border-none border border-b-border',
        className,
      )}
    >
      <DefaultPad className="py-4">
        <div className="flex items-center justify-between">
          <Link
            className="text-xl font-playwrite font-thin hover:text-light-peru transition-colors duration-200"
            href="/"
          >
            Clavishade
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu className="gap-4">
              <NavigationMenuList>
                {items.map((item) => (
                  <NavigationMenuItem key={`navigation-item-${item.href}`}>
                    <a
                      href={item.href}
                      className="px-4 py-2 relative inline-block transition-colors duration-300 hover:text-sandy-brown after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-sandy-brown after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.label}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
              {navChild}
            </NavigationMenu>
          </div>

          <div className="block md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-black dark:text-white" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-background border-l border-white/10 w-[280px] pt-4">
                <div className="flex flex-col gap-8 pt-8">
                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <a
                        key={`mobile-nav-${item.href}`}
                        href={item.href}
                        className="text-base font-roboto  hover:text-sandy-brown hover:bg-white/5 transition-all py-3 px-6 rounded-lg"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    {sheetChild}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </DefaultPad>
    </nav>
  );
}
