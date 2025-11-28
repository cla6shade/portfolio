'use client';

import DefaultPad from '@/components/container/DefaultPad';
import MagicBento from '@/features/landing/techstacks/MagicBento';

export default function TechStacksSection() {
  return (
    <div className="relative min-h-screen bg-neutral-900 py-20">
      <DefaultPad className="w-full flex flex-col gap-12 items-center">
        <h2 className="text-7xl heading-gradient font-bold">TECH STACK</h2>
        <MagicBento
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={false}
          spotlightRadius={300}
        />
      </DefaultPad>
    </div>
  );
}
