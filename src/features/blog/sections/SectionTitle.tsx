import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-4 border-l-light-peru pl-2">
      <h2 className="text-lg tablet:text-xl">{children}</h2>
    </div>
  );
}
