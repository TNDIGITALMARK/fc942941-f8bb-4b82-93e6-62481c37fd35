'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, TrendingUp } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="container relative z-10 flex items-center justify-between h-full px-4">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-secondary">LEVEL UP</span>
                <br />
                <span className="text-foreground">YOUR FUN</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                Discover thousands of amazing games and start your adventure today!
              </p>
            </div>

            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg"
              asChild
            >
              <Link href="#trending">
                <Play className="w-5 h-5 mr-2" />
                PLAY NOW
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Content - Game Characters */}
        <div className="hidden lg:flex flex-1 justify-center items-center relative">
          <div className="relative w-full h-full max-w-lg">
            {/* Main Hero Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-3xl transform rotate-12" />
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop"
                alt="Game Characters"
                fill
                className="object-cover opacity-80"
                sizes="500px"
              />

              {/* Floating Game Elements */}
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg font-semibold">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                HOT
              </div>

              <div className="absolute bottom-4 left-4 bg-secondary/90 text-secondary-foreground px-3 py-2 rounded-lg font-semibold">
                1M+ Players
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-pulse opacity-60" />
      <div className="absolute top-32 right-20 w-6 h-6 bg-secondary rounded-full animate-pulse opacity-40 delay-1000" />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-primary rounded-full animate-pulse opacity-50 delay-500" />
    </section>
  );
}