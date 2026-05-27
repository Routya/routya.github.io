import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Zap } from "lucide-react"
import { GitHubIcon } from "@/components/github-icon"
import Link from "next/link"
import { NugetStatsBadge } from "@/components/nuget-stats"
import type { NugetStats } from "@/lib/nuget"

export function Hero({ stats }: { stats?: NugetStats | null }) {
  return (
    <section className="relative pt-20 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 relative animate-float">
              <img src="/routya-logo.png" alt="Routya" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              High-Performance
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Message Dispatching
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Fast, lightweight CQRS library built for .NET applications. Competitive with MediatR while offering
              more flexibility and control.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <NugetStatsBadge packageId="Routya.Core" initial={stats ?? null} variant="pill" />
            <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
              <span className="text-muted-foreground">.NET 8, 9, 10</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              <span className="text-primary font-medium">30% Faster</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base h-12 px-8">
              <Link href="https://www.nuget.org/packages/Routya" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Install Package
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
              <Link href="https://github.com/HBartosch/Routya" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-5 h-5 mr-2" />
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="pt-8 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border">
              <code className="text-sm font-mono text-primary">dotnet add package Routya</code>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Includes Routya.Core + Routya.SourceGenerators
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
