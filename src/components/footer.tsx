import Link from 'next/link';
import { Gamepad2, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Gamepad2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">GameHub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Discover thousands of amazing games and start your adventure today!
              The ultimate gaming platform for casual gamers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Popular Games
              </Link>
              <Link href="/new-releases" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                New Releases
              </Link>
              <Link href="/categories" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Categories
              </Link>
              <Link href="/trending" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Trending
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Stay updated with the latest games and features!
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2025 GameHub. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            EMAIL@GAMEHUB.COM | TERMS | PRIVACY
          </p>
        </div>
      </div>
    </footer>
  );
}