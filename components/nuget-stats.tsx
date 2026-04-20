"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { formatDownloads, type NugetStats } from "@/lib/nuget"

type Variant = "pill" | "inline" | "downloads-only"

type Props = {
  packageId: string
  initial: NugetStats | null
  variant?: Variant
}

async function clientFetch(packageId: string): Promise<NugetStats | null> {
  try {
    const url = `https://azuresearch-usnc.nuget.org/query?q=packageid:${packageId}&prerelease=true&semVerLevel=2.0.0`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const pkg = data.data?.[0]
    if (!pkg) return null
    return { packageId, version: pkg.version, downloads: pkg.totalDownloads }
  } catch {
    return null
  }
}

export function NugetStatsBadge({ packageId, initial, variant = "pill" }: Props) {
  const [stats, setStats] = useState<NugetStats | null>(initial)

  useEffect(() => {
    let cancelled = false
    clientFetch(packageId).then((fresh) => {
      if (!cancelled && fresh) setStats(fresh)
    })
    return () => {
      cancelled = true
    }
  }, [packageId])

  if (!stats) return null

  if (variant === "inline") {
    return (
      <span className="text-xs font-mono text-muted-foreground">
        v{stats.version} · {formatDownloads(stats.downloads)} installs
      </span>
    )
  }

  if (variant === "downloads-only") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Download className="w-3 h-3" />
        {formatDownloads(stats.downloads)} installs
      </span>
    )
  }

  return (
    <>
      <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
        <span className="text-muted-foreground font-mono">v{stats.version}</span>
      </div>
      <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm flex items-center gap-1.5">
        <Download className="w-3.5 h-3.5 text-primary" />
        <span className="text-primary font-medium">{formatDownloads(stats.downloads)} installs</span>
      </div>
    </>
  )
}
