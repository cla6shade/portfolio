'use client';

import DefaultPad from '@/components/DefaultPad';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <DefaultPad className="py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-playwrite font-thin">Cla6shade</div>
          <div className="flex gap-8 items-center">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </DefaultPad>
    </nav>
  );
}
