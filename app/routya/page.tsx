import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Performance } from "@/components/performance"
import { Documentation } from "@/components/documentation"
import { fetchNugetStats } from "@/lib/nuget"

export const metadata: Metadata = {
  title: "Routya",
  description:
    "Fast, lightweight CQRS message dispatching library for .NET. 30% faster notifications than MediatR with Singleton handlers.",
}

export default async function RoutyaPage() {
  const stats = await fetchNugetStats("Routya.Core")
  return (
    <>
      <Hero stats={stats} />
      <Features />
      <Performance />
      <Documentation />
    </>
  )
}
