"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Zap, MemoryStick, Sparkles } from "lucide-react"

const requestBenchmarks = [
  { method: "MediatR SendAsync", time: 356.3, ratio: 1.0, memory: 1016, allocated: "1016 B", baseline: true },
  { method: "Routya Singleton", time: 377.8, ratio: 1.06, memory: 1008, allocated: "1008 B", highlight: true },
  { method: "Routya Transient", time: 397.0, ratio: 1.11, memory: 1032, allocated: "1032 B", highlight: true },
  { method: "Routya Scoped", time: 427.0, ratio: 1.2, memory: 1216, allocated: "1216 B" },
  { method: "Routya Singleton Async", time: 436.8, ratio: 1.23, memory: 1168, allocated: "1168 B" },
  { method: "Routya Transient Async", time: 450.2, ratio: 1.26, memory: 1192, allocated: "1192 B" },
  { method: "Routya Scoped Async", time: 495.0, ratio: 1.39, memory: 1376, allocated: "1376 B" },
]

const notificationBenchmarks = [
  { method: "MediatR Publish", time: 157.6, ratio: 1.0, memory: 440, allocated: "440 B", baseline: true },
  {
    method: "Routya Singleton Sequential",
    time: 110.5,
    ratio: 0.7,
    memory: 192,
    allocated: "192 B",
    highlight: true,
    winner: true,
  },
  { method: "Routya Singleton Parallel", time: 143.6, ratio: 0.91, memory: 312, allocated: "312 B", highlight: true },
  { method: "Routya Transient Sequential", time: 146.0, ratio: 0.93, memory: 240, allocated: "240 B", highlight: true },
  { method: "Routya Transient Parallel", time: 170.6, ratio: 1.08, memory: 360, allocated: "360 B" },
  { method: "Routya Scoped Sequential", time: 238.1, ratio: 1.51, memory: 424, allocated: "424 B" },
  { method: "Routya Scoped Parallel", time: 265.8, ratio: 1.69, memory: 544, allocated: "544 B" },
]

export function Performance() {
  const maxRequestTime = Math.max(...requestBenchmarks.map((b) => b.time))
  const maxNotificationTime = Math.max(...notificationBenchmarks.map((b) => b.time))

  return (
    <section id="performance" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Proven{" "}
            <span className="bg-gradient-to-r from-[#17D4CA] to-[#1CA9E0] bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Benchmarked against MediatR 13.1.0 using BenchmarkDotNet on .NET 8
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>11th Gen Intel Core i7-11800H @ 2.30GHz</span>
            <span>•</span>
            <span>.NET 8.0.17</span>
            <span>•</span>
            <span>Windows 11</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Request Benchmarks */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#17D4CA]/20 to-[#1CA9E0]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#17D4CA]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Request Dispatching</h3>
                <p className="text-sm text-muted-foreground">Execution time in nanoseconds</p>
              </div>
            </div>

            <div className="space-y-4">
              {requestBenchmarks.map((bench, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono ${bench.highlight ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                      >
                        {bench.method}
                      </span>
                      {bench.baseline && (
                        <Badge variant="outline" className="text-xs">
                          Baseline
                        </Badge>
                      )}
                      {bench.highlight && bench.ratio <= 1.15 && (
                        <Badge className="bg-[#17D4CA]/20 text-[#17D4CA] border-[#17D4CA]/30 text-xs">
                          Competitive
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`font-mono text-sm ${bench.ratio <= 1.0 ? "text-[#17D4CA]" : bench.ratio <= 1.15 ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {bench.time.toFixed(1)} ns
                    </span>
                  </div>

                  {/* Bar Chart */}
                  <div className="relative h-8 bg-secondary/30 rounded-md overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-md transition-all ${
                        bench.baseline
                          ? "bg-muted"
                          : bench.highlight
                            ? "bg-gradient-to-r from-[#17D4CA] to-[#1CA9E0]"
                            : "bg-secondary"
                      }`}
                      style={{ width: `${(bench.time / maxRequestTime) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-xs">
                      <span className="text-muted-foreground">{bench.allocated}</span>
                      <span className={bench.ratio > 1.0 ? "text-muted-foreground" : "text-foreground font-semibold"}>
                        {bench.ratio > 1.0 ? "+" : ""}
                        {((bench.ratio - 1.0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notification Benchmarks */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#17D4CA]/20 to-[#1CA9E0]/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[#1CA9E0]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Notification Dispatching</h3>
                <p className="text-sm text-muted-foreground">Execution time in nanoseconds</p>
              </div>
            </div>

            <div className="space-y-4">
              {notificationBenchmarks.map((bench, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono ${bench.highlight ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                      >
                        {bench.method}
                      </span>
                      {bench.baseline && (
                        <Badge variant="outline" className="text-xs">
                          Baseline
                        </Badge>
                      )}
                      {bench.winner && (
                        <Badge className="bg-[#17D4CA]/20 text-[#17D4CA] border-[#17D4CA]/30 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Winner
                        </Badge>
                      )}
                      {bench.highlight && bench.ratio < 1.0 && !bench.winner && (
                        <Badge className="bg-[#1CA9E0]/20 text-[#1CA9E0] border-[#1CA9E0]/30 text-xs">
                          {((1 - bench.ratio) * 100).toFixed(0)}% Faster
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`font-mono text-sm ${bench.ratio < 1.0 ? "text-[#17D4CA] font-semibold" : "text-muted-foreground"}`}
                    >
                      {bench.time.toFixed(1)} ns
                    </span>
                  </div>

                  {/* Bar Chart */}
                  <div className="relative h-8 bg-secondary/30 rounded-md overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-md transition-all ${
                        bench.baseline
                          ? "bg-muted"
                          : bench.highlight
                            ? "bg-gradient-to-r from-[#17D4CA] to-[#1CA9E0]"
                            : "bg-secondary"
                      }`}
                      style={{ width: `${(bench.time / maxNotificationTime) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-xs">
                      <span className="text-muted-foreground">{bench.allocated}</span>
                      <span className={bench.ratio < 1.0 ? "text-foreground font-semibold" : "text-muted-foreground"}>
                        {bench.ratio > 1.0 ? "+" : ""}
                        {((bench.ratio - 1.0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-[#17D4CA]/10 to-[#17D4CA]/5 border-[#17D4CA]/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-[#17D4CA]" />
              <div className="text-3xl font-bold text-[#17D4CA]">30%</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Faster notification dispatching with Singleton Sequential handlers
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-[#1CA9E0]/10 to-[#1CA9E0]/5 border-[#1CA9E0]/30">
            <div className="flex items-center gap-2 mb-2">
              <MemoryStick className="w-5 h-5 text-[#1CA9E0]" />
              <div className="text-3xl font-bold text-[#1CA9E0]">56%</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Less memory allocation for Singleton notification handlers
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-[#17D4CA]/10 to-[#1CA9E0]/5 border-[#17D4CA]/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#17D4CA]" />
              <div className="text-3xl font-bold bg-gradient-to-r from-[#17D4CA] to-[#1CA9E0] bg-clip-text text-transparent">
                7%
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Faster notifications with Transient Sequential handlers - maximum isolation with performance
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}