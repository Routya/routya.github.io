import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Gauge,
  ExternalLink,
  Github,
  Package,
  CheckCircle2,
  Clock,
  Award,
  Server,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Response time", value: "<50μs", sublabel: "per request, p50" },
  { label: "vs ASP.NET Core", value: "16×", sublabel: "faster than Minimal API" },
  { label: "vs FastEndpoints", value: "16×", sublabel: "delivered on the promise" },
  { label: "vs GenHTTP", value: "1.11×", sublabel: "edges the custom-server class" },
]

const milestones = [
  {
    title: "HTTP/1.1 Compliance",
    description:
      "Featured on Http11Probe — the public compliance suite comparing frameworks on RFC 7230 conformance, request smuggling, malformed input handling, and normalization.",
    href: "https://www.http-probe.com/probe-results/",
    cta: "View probe results",
    icon: Award,
  },
  {
    title: "C# Web Frameworks Benchmark",
    description:
      "Listed in the public web-frameworks benchmark alongside ASP.NET Core, Minimal API, and FastEndpoints — ranked on RPS and latency.",
    href: "https://web-frameworks-benchmark.vercel.app/result?l=csharp",
    cta: "See the ranking",
    icon: Gauge,
  },
]

const upcoming = [
  "HTTP/3 (QUIC) transport",
  "OpenAPI / Swagger generator",
  "Source-generator endpoint registration",
  "Expanded sample apps & templates",
]

export function Effinitive() {
  return (
    <section id="effinitive" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="p-5 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.sublabel}</div>
            </Card>
          ))}
        </div>

        {/* Milestones + Coming Soon */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Milestones achieved</h3>
            </div>
            {milestones.map((m, i) => {
              const Icon = m.icon
              return (
                <Card
                  key={i}
                  className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold mb-1">{m.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                      <Link
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
                      >
                        {m.cta}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Coming soon</h3>
            </div>
            <ul className="space-y-3">
              {upcoming.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Install + CTAs */}
        <Card className="p-6 md:p-8 bg-card/60 backdrop-blur-sm border-border/50">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Server className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Install</div>
                <code className="text-sm md:text-base font-mono text-primary">
                  dotnet add package EffinitiveFramework.Core
                </code>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="https://github.com/HBartosch/Effinitive" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link
                  href="https://www.nuget.org/packages/EffinitiveFramework.Core"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Package className="w-4 h-4 mr-2" />
                  NuGet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
