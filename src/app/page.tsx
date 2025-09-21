'use client';

import { useState, useEffect } from 'react';
import { NavigationBar } from '@/components/navigation-bar';
import { HeroBanner } from '@/components/hero-banner';
import { GameCard } from '@/components/game-card';
import { CategoryPills } from '@/components/category-pills';
import { Footer } from '@/components/footer';
import { getTrendingGames, getNewReleases, getGamesByCategory, getRecentlyPlayed, GameCategory, Game } from '@/lib/games';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('All');
  const [recentlyPlayed, setRecentlyPlayed] = useState<Game[]>([]);

  const trendingGames = getTrendingGames();
  const newReleases = getNewReleases();
  const filteredGames = getGamesByCategory(selectedCategory);

  useEffect(() => {
    setRecentlyPlayed(getRecentlyPlayed());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <HeroBanner />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Recently Played Section */}
        {recentlyPlayed.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">RECENTLY PLAYED</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recentlyPlayed.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          </section>
        )}

        {/* Trending Games Section */}
        <section id="trending" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">TRENDING GAMES</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                variant="featured"
              />
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">NEW RELEASES</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newReleases.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        </section>

        {/* All Games with Category Filter */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">ALL GAMES</h2>
            <CategoryPills
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}