import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  { href: "/routya", label: "Routya" },
  { href: "/effinitive", label: "Effinitive" },
  { href: "/resultkit", label: "ResultKit" },
]

const external = [
  { href: "https://github.com/HBartosch", label: "GitHub Profile" },
  { href: "https://www.nuget.org/profiles/HBartosch", label: "NuGet Profile" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-lg font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Henry</span>{" "}
              Bartosch
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open-source .NET libraries and frameworks focused on performance and developer ergonomics. All projects
              are MIT-licensed.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Projects</h3>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">External</h3>
            <ul className="space-y-3">
              {external.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {e.label === "GitHub Profile" && <Github className="w-4 h-4" />}
                    {e.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
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
