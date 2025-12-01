'use client';

import { use, useState } from 'react';
import DefaultPad from '@/components/container/DefaultPad';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Github, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  followersPromise: Promise<number>;
}

export default function Navigation({ followersPromise }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const followers = use(followersPromise);

  const navigationItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full font-roboto">
      <DefaultPad className="py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-playwrite font-thin">Cla6shade</div>

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
            <a href="https://github.com/cla6shade" target="_blank" className="group">
              <Button className="py-2 bg-orange-300 rounded-full cursor-pointer hover:bg-peach-puff">
                Follow Me
                <div className="px-3 rounded-full bg-white py-1 translate-x-3 flex items-center gap-2">
                  {followers ?? 35} <Github fill="#000000" />
                </div>
              </Button>
            </a>
          </div>

          <div className="block md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </DefaultPad>
    </nav>
  );
}
