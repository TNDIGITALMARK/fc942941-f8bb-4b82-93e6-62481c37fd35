'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/navigation-bar';
import { Footer } from '@/components/footer';
import { GameCard } from '@/components/game-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid3X3, List, ChevronRight, Gamepad2 } from 'lucide-react';
import { gameCategories, getGamesByCategory, GameCategory, mockGames } from '@/lib/games';
import { cn } from '@/lib/utils';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryStats = gameCategories.slice(1).map(category => {
    const games = getGamesByCategory(category);
    const totalPlays = games.reduce((sum, game) => sum + game.plays, 0);
    const avgRating = games.reduce((sum, game) => sum + game.rating, 0) / games.length;

    return {
      category,
      gameCount: games.length,
      totalPlays,
      avgRating: Math.round(avgRating * 10) / 10,
      games: games.slice(0, 3),
      thumbnail: games[0]?.thumbnail || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop'
    };
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Action': '⚡',
      'Adventure': '🗺️',
      'Puzzle': '🧩',
      'Racing': '🏎️',
      'Shooter': '🎯',
      'Sports': '⚽',
      'Strategy': '♟️'
    };
    return icons[category] || '🎮';
  };

  if (selectedCategory) {
    const games = getGamesByCategory(selectedCategory);
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              Categories
            </Button>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <span>{getCategoryIcon(selectedCategory)}</span>
              {selectedCategory}
            </h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {games.length} games found
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-4",
            viewMode === 'grid'
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}>
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="w-10 h-10 text-primary" />
            Game Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of games organized by genre. From action-packed adventures to mind-bending puzzles, find your perfect game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryStats.map((stat) => (
            <Card
              key={stat.category}
              className="group cursor-pointer overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50"
              onClick={() => setSelectedCategory(stat.category as GameCategory)}
            >
              <div className="relative h-32 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${stat.thumbnail})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4 text-3xl">
                  {getCategoryIcon(stat.category)}
                </div>

                <Badge
                  variant="secondary"
                  className="absolute top-4 right-4 bg-secondary/90 text-secondary-foreground"
                >
                  {stat.gameCount} games
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {stat.category}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="text-foreground font-medium">{stat.totalPlays.toLocaleString()}</span>
                    <br />Total Plays
                  </div>
                  <div>
                    <span className="text-foreground font-medium">{stat.avgRating}★</span>
                    <br />Avg Rating
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Popular games:</p>
                  <div className="space-y-1">
                    {stat.games.map((game, index) => (
                      <div key={game.id} className="text-sm text-foreground truncate">
                        {index + 1}. {game.title}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-primary hover:text-primary-foreground hover:bg-primary mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                >
                  Browse {stat.category} Games
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-card border-border">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-4xl">🎮</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Can't find what you're looking for?</h3>
                <p className="text-muted-foreground">Browse all {mockGames.length} games in our collection</p>
              </div>
            </div>
            <Button
              onClick={() => setSelectedCategory('All')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View All Games
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}