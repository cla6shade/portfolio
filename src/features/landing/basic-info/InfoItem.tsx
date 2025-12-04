import { cn } from '@/lib/utils';
import Image from 'next/image';
import Flex from '@/components/container/Flex';

interface InfoItemProps {
  content: string;
  description: string;
  className?: string;
  icon?: string;
}

export default function InfoItem({ content, description, className, icon }: InfoItemProps) {
  return (
    <div className="group">
      <Flex align="center" className="gap-3">
        {icon && (
          <Image
            src={icon}
            alt={content}
            width={32}
            height={32}
            className="flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <p
            className={cn(
              'text-base tablet:text-lg font-medium text-white transition-colors',
              className,
            )}
          >
            {content}
          </p>
          <p className="text-sm tablet:text-base text-gray-400 mt-1">{description}</p>
        </div>
      </Flex>
    </div>
  );
}