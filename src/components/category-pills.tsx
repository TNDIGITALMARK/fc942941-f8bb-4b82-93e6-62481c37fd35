'use client';

import { Badge } from '@/components/ui/badge';
import { gameCategories, GameCategory } from '@/lib/games';
import { cn } from '@/lib/utils';

interface CategoryPillsProps {
  selectedCategory: GameCategory;
  onCategoryChange: (category: GameCategory) => void;
  className?: string;
}

export function CategoryPills({
  selectedCategory,
  onCategoryChange,
  className
}: CategoryPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {gameCategories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className={cn(
            "cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105",
            selectedCategory === category
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}