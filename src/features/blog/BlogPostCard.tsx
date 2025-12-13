import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function BlogPostCard({ slug, title, description, date, tags }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block group p-6 rounded-lg border border-sandy-brown/20 hover:border-sandy-brown/50 bg-background hover:shadow-lg transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-2 text-sandy-brown group-hover:text-peru transition-colors">
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
            <Badge
              key={`blog-tag-${index}`}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
