'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavigationBar } from '@/components/navigation-bar';
import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, RotateCcw, Volume2, VolumeX, Maximize2, Heart, Star } from 'lucide-react';
import { Game, getGameById, getTrendingGames, addToRecentlyPlayed } from '@/lib/games';

export default function GamePlayPage() {
  const params = useParams();
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const gameId = params.id as string;
  const suggestedGames = getTrendingGames().filter(g => g.id !== gameId).slice(0, 3);

  useEffect(() => {
    if (gameId) {
      const gameData = getGameById(gameId);
      setGame(gameData || null);

      if (gameData) {
        addToRecentlyPlayed(gameData.id);
      }
    }
  }, [gameId]);

  const handleFullscreen = () => {
    const gameFrame = document.getElementById('game-frame');
    if (gameFrame) {
      if (!document.fullscreenElement) {
        gameFrame.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleRestart = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
    setHasRated(true);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href={`/games/${game.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Game
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-foreground">{game.title}</h1>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleFullscreen}>
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Frame */}
          <div className="lg:col-span-3">
            <Card id="game-frame" className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {/* Game Placeholder - In a real app, this would be an actual game iframe */}
                  <div
                    id="game-iframe"
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-primary rounded-full animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        This is a demo game placeholder. In a real implementation,
                        this would embed the actual game content.
                      </p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Controls */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Controls:</span>
                    <div className="flex items-center gap-2 text-sm">
                      <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">WASD</kbd>
                      <span className="text-muted-foreground">Move</span>
                      <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">SPACE</kbd>
                      <span className="text-muted-foreground">Action</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 1000) + 100} likes
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rate This Game */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate This Game</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {hasRated && (
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Thanks for rating!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Game Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{game.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{game.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plays:</span>
                  <span className="font-medium">{game.plays.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Games */}
            {suggestedGames.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">More Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestedGames.map((suggestedGame) => (
                      <GameCard
                        key={suggestedGame.id}
                        game={suggestedGame}
                        className="w-full"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}