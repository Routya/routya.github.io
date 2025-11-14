import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/routya-logo.png" alt="Routya" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Routya
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              High-performance message dispatching library for .NET CQRS applications. 
              Fast, flexible, and memory efficient.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://github.com/HBartosch/Routya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.nuget.org/packages/Routya.Core" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  NuGet Package
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="#docs"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold">Package Info</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <span className="text-muted-foreground">Version:</span>{' '}
                <span className="text-foreground font-mono">1.0.5</span>
              </li>
              <li className="text-sm">
                <span className="text-muted-foreground">Target:</span>{' '}
                <span className="text-foreground">.NET 8, 9, 10</span>
              </li>
              <li className="text-sm">
                <span className="text-muted-foreground">License:</span>{' '}
                <span className="text-foreground">MIT</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            Built with precision by{' '}
            <Link 
              href="https://github.com/HBartosch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              HBartosch
            </Link>
            . Open source and available on GitHub.
          </p>
        </div>
      </div>
    </footer>
  )
}
