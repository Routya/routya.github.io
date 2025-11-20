import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "Routya.ResultKit",
    version: "2.0.0",
    description: "Lightweight result wrapper, validation and transformation toolkit for clean Result<T> handling.",
    repo: "https://github.com/HBartosch/Routya.ResultKit",
    nuget: "https://www.nuget.org/packages/Routya.ResultKit",
    features: [
      "Consistent Result<T> pattern",
      "One-line validation with .Validate()",
      "Transform() for safe projections",
      "Rich validation attributes",
      "Nested object validation",
    ],
    installCmd: "dotnet add package Routya.ResultKit",
    tags: ["Validation", "Results", "Transforms"],
  },
  {
    name: "Routya.ResultKit.AspNetCore",
    version: "2.0.0",
    description:
      "ASP.NET Core integration providing seamless ProblemDetails conversion and automatic exception handling.",
    repo: "https://github.com/HBartosch/Routya.ResultKit/blob/main/Routya.ResultKit.AspNetCore/README.md",
    nuget: "https://www.nuget.org/packages/Routya.ResultKit.AspNetCore",
    features: [
      "Automatic exception handling",
      "RFC 7807 ProblemDetails",
      "Minimal API & MVC support",
      "Custom exception mappers",
      "ToHttpResult() extensions",
    ],
    installCmd: "dotnet add package Routya.ResultKit.AspNetCore",
    tags: ["ASP.NET Core", "ProblemDetails", "Middleware"],
  },
]

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Growing Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Complementary <span className="text-primary">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Extend your .NET applications with additional tools built on the same principles of performance and
            simplicity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col"
            >
              {/* Package Header */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-mono">
                      v{pkg.version}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
              </div>

              {/* Tags */}
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

              {/* Features List */}
              <div className="space-y-2 mb-6 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Install Command */}
              <div className="mb-6">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <code className="text-sm font-mono text-foreground">{pkg.installCmd}</code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={pkg.repo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Docs
                  </Link>
                </Button>
                <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Link href={pkg.nuget} target="_blank" rel="noopener noreferrer">
                    <Package className="w-4 h-4 mr-2" />
                    NuGet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">All packages are open source and actively maintained</p>
          <Button variant="outline" asChild>
            <Link href="https://github.com/HBartosch" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}