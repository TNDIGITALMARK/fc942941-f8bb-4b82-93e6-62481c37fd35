'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Eye, Star } from 'lucide-react';
import { Game, formatPlayCount } from '@/lib/games';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  variant?: 'default' | 'featured';
  className?: string;
}

export function GameCard({ game, variant = 'default', className }: GameCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg",
      variant === 'featured' && "ring-2 ring-primary/50",
      className
    )}>
      <Link href={`/games/${game.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Button
            size="sm"
            className="absolute top-2 right-2 bg-primary/90 hover:bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={handlePlayClick}
          >
            <Play className="w-4 h-4" />
          </Button>

          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-secondary/90 text-secondary-foreground"
          >
            {game.category}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
              {game.title}
            </h3>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatPlayCount(game.plays)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{game.rating}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {game.description}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}