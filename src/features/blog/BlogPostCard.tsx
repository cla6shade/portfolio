import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const cardVariants = cva('block group bg-background transition-all duration-300 overflow-hidden', {
  variants: {
    variant: {
      vertical: '',
      horizontal: 'flex flex-col tablet:flex-row gap-6 w-full',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

const thumbnailVariants = cva('relative overflow-hidden rounded-md shadow-lg', {
  variants: {
    variant: {
      vertical: 'w-full h-60',
      horizontal: 'w-full h-60 tablet:w-60 tablet:h-48 lg-desktop:w-80 tablet:flex-shrink-0',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

const contentVariants = cva('', {
  variants: {
    variant: {
      vertical: 'pt-6',
      horizontal: 'flex-1 py-2',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

interface BlogPostCardProps extends VariantProps<typeof cardVariants> {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  className?: string;
}

export default function BlogPostCard({
  slug,
  title,
  description,
  date,
  tags,
  thumbnail,
  variant,
  className,
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className={cn(cardVariants({ variant }), className)}>
      {thumbnail && (
        <div className={thumbnailVariants({ variant })}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className={contentVariants({ variant })}>
        <h2 className="text-2xl font-bold mb-2 group-hover:text-sandy-brown transition-colors">
          {title}
        </h2>

        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={date}>{new Date(date).toLocaleDateString('ko-KR')}</time>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-sandy-brown" />
            {tags.map((tag, index) => (
              <Badge key={`blog-tag-${index}`} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
