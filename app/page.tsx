import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, ExternalLink, Zap, Server, CheckCircle2, Award, Gauge } from "lucide-react"
import { fetchNugetStats } from "@/lib/nuget"
import { NugetStatsBadge } from "@/components/nuget-stats"

const productMeta = [
  {
    slug: "routya",
    packageId: "Routya.Core",
    name: "Routya",
    tagline: "High-performance CQRS message dispatching for .NET.",
    headline: "30% faster notifications vs MediatR",
    tags: [".NET 8/9/10", "CQRS", "MediatR alt"],
    accent: "from-primary to-accent",
  },
  {
    slug: "effinitive",
    packageId: "EffinitiveFramework.Core",
    name: "Effinitive",
    tagline: "Ground-up C# web framework with custom HTTP server and HTTP/2.",
    headline: "Sub-50μs response times",
    tags: ["HTTP/1.1", "HTTP/2", "Custom server"],
    accent: "from-accent to-primary",
    new: true,
  },
  {
    slug: "resultkit",
    packageId: "Routya.ResultKit",
    name: "ResultKit",
    tagline: "Lightweight Result<T> wrapper, validation, and ProblemDetails integration.",
    headline: "Clean Result<T> handling",
    tags: ["Result<T>", "Validation", "ASP.NET Core"],
    accent: "from-primary to-accent",
  },
  {
    slug: "configkit",
    packageId: "Routya.ConfigKit.Generator",
    name: "ConfigKit",
    tagline: "Source-generated configuration binder — tag a class with [ConfigSection] and go.",
    headline: "No-reflection IOptions binding",
    tags: ["Source gen", "IOptions", "Config"],
    accent: "from-accent to-primary",
  },
]

const milestones = [
  {
    product: "Effinitive",
    title: "HTTP/1.1 compliance — Http11Probe",
    href: "https://www.http-probe.com/probe-results/",
    icon: Award,
  },
  {
    product: "Effinitive",
    title: "Listed on the public C# web-frameworks benchmark",
    href: "https://web-frameworks-benchmark.vercel.app/result?l=csharp",
    icon: Gauge,
  },
]

export default async function Home() {
  const stats = await Promise.all(productMeta.map((p) => fetchNugetStats(p.packageId)))
  const products = productMeta.map((p, i) => ({ ...p, stats: stats[i] }))

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Open-source .NET work</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Henry Bartosch
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              I&rsquo;m a .NET engineer building open-source libraries and frameworks focused on performance and
              developer ergonomics. My work benchmarks against the established players: Routya competes with MediatR
              on CQRS dispatch, ResultKit cleans up <code className="font-mono text-primary">Result&lt;T&gt;</code>{" "}
              handling, and Effinitive is a ground-up HTTP server framework built to outperform existing .NET web
              frameworks. Everything I ship includes reproducible benchmarks and sits under the MIT license.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link href="#projects">
                  Explore projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/HBartosch" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
              <p className="text-muted-foreground mt-2">Four active .NET open-source projects — click through for details.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="group">
                <Card className="h-full p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    {p.new && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">{p.tagline}</p>
                  <div
                    className={`text-sm font-semibold bg-gradient-to-r ${p.accent} bg-clip-text text-transparent mb-2`}
                  >
                    {p.headline}
                  </div>
                  <div className="mb-4 min-h-[1rem]">
                    <NugetStatsBadge packageId={p.packageId} initial={p.stats} variant="inline" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-secondary text-xs font-medium border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Recent milestones</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">External validation</h2>
            <p className="text-muted-foreground mt-2">
              Independent benchmarks and compliance suites where my work is being tested alongside established
              frameworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {milestones.map((m, i) => {
              const Icon = m.icon
              return (
                <Link
                  key={i}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                          {m.product}
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold leading-snug">{m.title}</h3>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <Server className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">More coming</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            All packages are MIT-licensed and actively maintained. Follow along on GitHub for new releases,
            benchmarks, and projects.
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link href="https://github.com/HBartosch" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              Follow on GitHub
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
