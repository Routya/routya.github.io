import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <img src="/routya-logo.png" alt="Routya" className="w-full h-full object-contain transition-transform group-hover:scale-110" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Routya
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#performance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Performance
          </Link>
          <Link href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://github.com/HBartosch/Routya" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link href="https://www.nuget.org/packages/Routya.Core" target="_blank" rel="noopener noreferrer">
              Get Started
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
