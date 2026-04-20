import type { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Download,
  Github,
  CheckCircle2,
  Package,
  Code2,
  Settings2,
  Layers,
  Zap,
} from "lucide-react"
import { fetchNugetStats } from "@/lib/nuget"
import { NugetStatsBadge } from "@/components/nuget-stats"

export const metadata: Metadata = {
  title: "ConfigKit",
  description:
    "Source-generated configuration binder for .NET. Tag a class with [ConfigSection] and skip the reflection-based IOptions boilerplate.",
}

const generatorPackage = {
  name: "Routya.ConfigKit.Generator",
  description:
    "Source generator that emits your config binding and DI registration code at compile time. No reflection at runtime.",
  install: "dotnet add package Routya.ConfigKit.Generator",
  nuget: "https://www.nuget.org/packages/Routya.ConfigKit.Generator",
  repo: "https://github.com/HBartosch/Routya.ConfigKit",
  features: [
    "Compile-time config binding",
    "IOptions<T>, Singleton, or Both",
    "DataAnnotations validation",
    "No reflection at runtime",
    "Drop-in appsettings.json integration",
  ],
  tags: ["Source generator", "IOptions", "Config"],
  packageId: "Routya.ConfigKit.Generator",
}

const corePackage = {
  name: "Routya.ConfigKit",
  description:
    "Core attributes and types — ConfigSection, ConfigBindingMode, and the primitives the generator emits against.",
  install: "dotnet add package Routya.ConfigKit",
  nuget: "https://www.nuget.org/packages/Routya.ConfigKit",
  repo: "https://github.com/HBartosch/Routya.ConfigKit",
  features: [
    "[ConfigSection] attribute",
    "Binding-mode enum",
    ".NET 8, 9, 10 targets",
    "Zero runtime dependencies",
    "MIT licensed",
  ],
  tags: ["Attributes", "Primitives"],
  packageId: "Routya.ConfigKit",
}

export default async function ConfigKitPage() {
  const [generatorStats, coreStats] = await Promise.all([
    fetchNugetStats(generatorPackage.packageId),
    fetchNugetStats(corePackage.packageId),
  ])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20 animate-float">
                <Settings2 className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                ConfigKit
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              A lightweight, source-generated configuration binder for .NET — just tag your class with{" "}
              <code className="font-mono text-primary">[ConfigSection]</code> and go.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <NugetStatsBadge
                packageId={generatorPackage.packageId}
                initial={generatorStats}
                variant="pill"
              />
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                <span className="text-muted-foreground">.NET 8, 9, 10</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="text-primary font-medium">No reflection</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link href={generatorPackage.nuget} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Install Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={generatorPackage.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Two packages</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Source generator + core attributes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Install the generator to get both — the generator pulls in the core package transitively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { ...generatorPackage, stats: generatorStats },
              { ...corePackage, stats: coreStats },
            ].map((pkg, idx) => (
              <Card
                key={idx}
                className="p-8 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all flex flex-col"
              >
                <div className="space-y-3 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-mono">
                          v{pkg.stats?.version ?? "—"}
                        </div>
                        <NugetStatsBadge
                          packageId={pkg.packageId}
                          initial={pkg.stats}
                          variant="downloads-only"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-secondary text-xs font-medium border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <code className="text-sm font-mono text-foreground">{pkg.install}</code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href={pkg.repo} target="_blank" rel="noopener noreferrer">
                      Docs
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Link href={pkg.nuget} target="_blank" rel="noopener noreferrer">
                      <Package className="w-4 h-4 mr-2" />
                      NuGet
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Example</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Tag, bind, go</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three steps from <code className="font-mono text-primary">appsettings.json</code> to validated,
              strongly-typed options registered in DI — no reflection, all emitted at compile time.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">1. Define the config shape</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground"><code>{`using System.ComponentModel.DataAnnotations;
using Routya.ConfigKit;

[ConfigSection("MyService", ConfigBindingMode.IOptions)]
public partial class MyServiceOptions
{
    [Required]
    public int RetryCount { get; init; }

    public bool UseCaching { get; init; } = true;
}`}</code></pre>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">2. Match the section in appsettings.json</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground"><code>{`{
  "MyService": {
    "RetryCount": 3,
    "UseCaching": false
  }
}`}</code></pre>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary">3. Register via the generated extension</h3>
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground"><code>{`builder.Services.AddMyServiceOptions(builder.Configuration);`}</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-4 flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  The <code className="font-mono text-primary">AddMyServiceOptions</code> extension is generated at
                  compile time. Binding modes: <code className="font-mono">IOptions</code>,{" "}
                  <code className="font-mono">Singleton</code>, or <code className="font-mono">Both</code> —
                  DataAnnotations validated on start.
                </span>
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href={generatorPackage.repo} target="_blank" rel="noopener noreferrer">
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
