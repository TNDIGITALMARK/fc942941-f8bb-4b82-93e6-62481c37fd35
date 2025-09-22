'use client';

import { useState, useMemo } from 'react';
import { NavigationBar } from '@/components/navigation-bar';
import { GameCard } from '@/components/game-card';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Search, SortAsc, SortDesc } from 'lucide-react';
import { getNewReleases, gameCategories, Game, GameCategory } from '@/lib/games';

type SortOption = 'newest' | 'oldest' | 'rating' | 'plays' | 'name';
type SortDirection = 'asc' | 'desc';

export default function RealeasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const newReleases = getNewReleases();

  const filteredAndSortedGames = useMemo(() => {
    let filtered = newReleases;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
      );
    }

    // Sort games
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'newest':
        case 'oldest':
          // Since we don't have release dates, use ID as proxy (higher ID = newer)
          comparison = parseInt(b.id) - parseInt(a.id);
          if (sortBy === 'oldest') comparison = -comparison;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'plays':
          comparison = b.plays - a.plays;
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortDirection === 'desc' ? comparison : -comparison;
    });

    return sorted;
  }, [newReleases, selectedCategory, searchQuery, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Latest Releases</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              New Game Realeases
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest and greatest games that have just been released.
              Stay ahead of the curve with fresh content and exciting new adventures.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filters and Search Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Filter & Sort</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search releases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as GameCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {gameCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="plays">Popularity</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Direction */}
            <Button
              variant="outline"
              onClick={toggleSortDirection}
              className="flex items-center space-x-2"
            >
              {sortDirection === 'desc' ? (
                <SortDesc className="w-4 h-4" />
              ) : (
                <SortAsc className="w-4 h-4" />
              )}
              <span>{sortDirection === 'desc' ? 'Descending' : 'Ascending'}</span>
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="flex items-center space-x-2">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center space-x-2">
                <span>Search: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Releases
              <span className="ml-2 text-sm text-muted-foreground font-normal">
                ({filteredAndSortedGames.length} games)
              </span>
            </h2>
          </div>

          {filteredAndSortedGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredAndSortedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No games found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No releases match your current filters. Try adjusting your search criteria or clearing some filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}