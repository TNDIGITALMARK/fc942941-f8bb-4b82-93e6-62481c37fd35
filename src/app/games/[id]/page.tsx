'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationBar } from '@/components/navigation-bar';
import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Heart, Share2, Star, Eye, Users } from 'lucide-react';
import { Game, getGameById, getTrendingGames, formatPlayCount, addToRecentlyPlayed } from '@/lib/games';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const gameId = params.id as string;
  const relatedGames = getTrendingGames().filter(g => g.id !== gameId).slice(0, 4);

  useEffect(() => {
    if (gameId) {
      const gameData = getGameById(gameId);
      setGame(gameData || null);

      if (gameData) {
        addToRecentlyPlayed(gameData.id);
      }
    }
  }, [gameId]);

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Game Not Found</h1>
            <Button asChild className="mt-4">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePlayGame = () => {
    if (game.gameUrl) {
      router.push(`/play/${game.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Link>
        </Button>

        {/* Game Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Game Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <Button
              size="lg"
              className="absolute bottom-4 left-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handlePlayGame}
            >
              <Play className="w-5 h-5 mr-2" />
              Play Now
            </Button>
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {game.category}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{game.rating}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-foreground">
                {game.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {game.description}
              </p>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">
                    {formatPlayCount(game.plays)}
                  </div>
                  <div className="text-sm text-muted-foreground">Plays</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold text-foreground">
                    {Math.floor(game.plays / 10)}
                  </div>
                  <div className="text-sm text-muted-foreground">Players</div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={handlePlayGame}
              >
                <Play className="w-5 h-5 mr-2" />
                Play Game
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>

              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Related Games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedGames.map((relatedGame) => (
                <GameCard
                  key={relatedGame.id}
                  game={relatedGame}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}