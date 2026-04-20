export type NugetStats = {
  packageId: string
  version: string
  downloads: number
}

const SEARCH_URL = "https://azuresearch-usnc.nuget.org/query"

export async function fetchNugetStats(packageId: string): Promise<NugetStats | null> {
  try {
    const url = `${SEARCH_URL}?q=packageid:${packageId}&prerelease=true&semVerLevel=2.0.0`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    const pkg = data.data?.[0]
    if (!pkg) return null
    return {
      packageId,
      version: pkg.version as string,
      downloads: pkg.totalDownloads as number,
    }
  } catch {
    return null
  }
}

export function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toLocaleString()
}
