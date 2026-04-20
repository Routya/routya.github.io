import type { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Server, Zap, Code2 } from "lucide-react"
import { Effinitive } from "@/components/effinitive"
import { fetchNugetStats } from "@/lib/nuget"
import { NugetStatsBadge } from "@/components/nuget-stats"

export const metadata: Metadata = {
  title: "Effinitive",
  description:
    "A high-performance C# web framework with custom HTTP server, full HTTP/2 support, and sub-50μs response times. Built to outperform existing .NET web frameworks.",
}

export default async function EffinitivePage() {
  const stats = await fetchNugetStats("EffinitiveFramework.Core")
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20 animate-float">
                <Server className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Effinitive
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              A ground-up C# web framework with a custom HTTP server, full HTTP/2 implementation, and sub-50μs
              response times.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <NugetStatsBadge packageId="EffinitiveFramework.Core" initial={stats} variant="pill" />
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                <span className="text-muted-foreground">HTTP/1.1 · HTTP/2</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="text-primary font-medium">&lt;50μs response</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link
                  href="https://www.nuget.org/packages/EffinitiveFramework.Core"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/HBartosch/Effinitive" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Effinitive content (stats, milestones, roadmap, install) */}
      <Effinitive />

      {/* Quick Start */}
      <section className="py-24 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Quick Start</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Your first endpoint</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Type-safe endpoints with generic request/response handling. Here&rsquo;s a minimal working sample.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">1. Install</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
                <code className="text-primary">dotnet add package EffinitiveFramework.Core</code>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">2. Define an endpoint</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground"><code>{`using EffinitiveFramework.Core;

public class HealthCheckEndpoint : NoRequestEndpointBase<HealthResponse>
{
    protected override string Method => "GET";
    protected override string Route  => "/api/health";

    public override ValueTask<HealthResponse> HandleAsync(
        CancellationToken cancellationToken)
    {
        return new ValueTask<HealthResponse>(
            new HealthResponse { Status = "ok" });
    }
}

public record HealthResponse
{
    public string Status { get; init; } = "";
}`}</code></pre>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">3. Bootstrap the app</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground"><code>{`var app = EffinitiveApp.Create(options =>
{
    options.Host = "localhost";
    options.Port = 5000;
});

app.RegisterEndpoint<HealthCheckEndpoint>();

await app.RunAsync();`}</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-4 flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  The custom HTTP server handles sockets directly — HTTP/2 is enabled automatically when TLS is
                  configured and the client negotiates it via ALPN.
                </span>
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/HBartosch/Effinitive#readme"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the full documentation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
