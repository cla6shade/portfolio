'use client';

import { useState, Suspense } from 'react';
import DefaultPad from '@/components/container/DefaultPad';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import GithubButton from '@/components/navigation/GithubButton';
import FollowerCount from '@/components/navigation/FollowerCount';

interface NavigationProps {
  followersPromise: Promise<number>;
}

export default function Navigation({ followersPromise }: NavigationProps) {
  const [open, setOpen] = useState(false);

  const navigationItems = [
    { href: '#basic-info', label: 'Basic Info' },
    { href: '#projects', label: 'Projects' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full font-roboto">
      <DefaultPad className="py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-playwrite font-thin">Clavishade</div>

          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={`navigation-item-${item.href}`}>
                    <NavigationMenuLink
                      href={item.href}
                      className="px-4 hover:bg-[rgba(255,255,255,.1)]"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="block md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-neutral-950 border-l border-white/10 w-[280px]">
                <div className="flex flex-col gap-8 pt-8">
                  <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <a
                        key={`mobile-nav-${item.href}`}
                        href={item.href}
                        className="text-lg font-roboto text-white hover:text-sandy-brown hover:bg-white/5 transition-all py-3 px-6 rounded-lg"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <GithubButton>
                    <Suspense fallback={<>33</>}>
                      <FollowerCount followersPromise={followersPromise} />
                    </Suspense>
                  </GithubButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </DefaultPad>
    </nav>
  );
}
