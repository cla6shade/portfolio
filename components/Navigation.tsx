'use client';

import { useState } from 'react';
import DefaultPad from '@/components/container/DefaultPad';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const navigationItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <DefaultPad className="py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-playwrite font-thin">Cla6shade</div>

          <div className="hidden md:block">
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
