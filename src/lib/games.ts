export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  plays: number;
  rating: number;
  description: string;
  gameUrl?: string;
  featured?: boolean;
}

export const gameCategories = [
  "All",
  "Action",
  "Adventure",
  "Puzzle",
  "Racing",
  "Shooter",
  "Sports",
  "Strategy"
] as const;

export type GameCategory = typeof gameCategories[number];

export const mockGames: Game[] = [
  {
    id: "1",
    title: "Epic Quest",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
    category: "Adventure",
    plays: 12543,
    rating: 4.8,
    description: "Embark on an epic adventure through mystical lands filled with treasures and dangers.",
    gameUrl: "/games/epic-quest",
    featured: true
  },
  {
    id: "2",
    title: "Speed Racer",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    category: "Racing",
    plays: 8921,
    rating: 4.5,
    description: "High-speed racing action with customizable cars and challenging tracks.",
    gameUrl: "/games/speed-racer"
  },
  {
    id: "3",
    title: "Puzzle Master",
    thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
    category: "Puzzle",
    plays: 15632,
    rating: 4.7,
    description: "Challenge your mind with hundreds of creative puzzles and brain teasers.",
    gameUrl: "/games/puzzle-master"
  },
  {
    id: "4",
    title: "Space Shooter",
    thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=300&h=200&fit=crop",
    category: "Shooter",
    plays: 22108,
    rating: 4.6,
    description: "Defend Earth from alien invasion in this action-packed space shooter.",
    gameUrl: "/games/space-shooter",
    featured: true
  },
  {
    id: "5",
    title: "Football Pro",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop",
    category: "Sports",
    plays: 7845,
    rating: 4.3,
    description: "Experience realistic football gameplay with advanced AI and stunning graphics.",
    gameUrl: "/games/football-pro"
  },
  {
    id: "6",
    title: "Castle Defense",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    category: "Strategy",
    plays: 11267,
    rating: 4.9,
    description: "Build and defend your castle against waves of enemies in this strategic tower defense game.",
    gameUrl: "/games/castle-defense"
  },
  {
    id: "7",
    title: "Ninja Strike",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=300&h=200&fit=crop",
    category: "Action",
    plays: 18493,
    rating: 4.4,
    description: "Master the art of stealth and combat as a deadly ninja warrior.",
    gameUrl: "/games/ninja-strike",
    featured: true
  },
  {
    id: "8",
    title: "Ocean Explorer",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    category: "Adventure",
    plays: 9876,
    rating: 4.5,
    description: "Dive deep into the ocean and discover hidden treasures and mysterious creatures.",
    gameUrl: "/games/ocean-explorer"
  }
];

export const getTrendingGames = (): Game[] => {
  return mockGames
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 6);
};

export const getNewReleases = (): Game[] => {
  return mockGames
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

export const getFeaturedGames = (): Game[] => {
  return mockGames.filter(game => game.featured);
};

export const getGamesByCategory = (category: GameCategory): Game[] => {
  if (category === "All") {
    return mockGames;
  }
  return mockGames.filter(game => game.category === category);
};

export const getGameById = (id: string): Game | undefined => {
  return mockGames.find(game => game.id === id);
};

export const formatPlayCount = (plays: number): string => {
  if (plays >= 1000000) {
    return (plays / 1000000).toFixed(1) + 'M';
  } else if (plays >= 1000) {
    return (plays / 1000).toFixed(1) + 'K';
  }
  return plays.toString();
};

export const getRecentlyPlayed = (): Game[] => {
  if (typeof window !== 'undefined') {
    const recentIds = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    return recentIds.map((id: string) => getGameById(id)).filter(Boolean);
  }
  return [];
};

export const addToRecentlyPlayed = (gameId: string): void => {
  if (typeof window !== 'undefined') {
    const recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    const updated = [gameId, ...recent.filter((id: string) => id !== gameId)].slice(0, 6);
    localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
  }
};