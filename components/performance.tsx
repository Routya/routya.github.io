import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingDown, Zap, MemoryStick } from 'lucide-react'

const benchmarks = {
  requests: [
    { method: 'MediatR SendAsync', time: 356.3, ratio: 1.0, memory: 1016, baseline: true },
    { method: 'Routya Singleton', time: 377.8, ratio: 1.06, memory: 1008, highlight: true },
    { method: 'Routya Transient', time: 397.0, ratio: 1.11, memory: 1032 },
    { method: 'Routya Scoped', time: 427.0, ratio: 1.20, memory: 1216 },
  ],
  notifications: [
    { method: 'MediatR Publish', time: 157.6, ratio: 1.0, memory: 440, baseline: true },
    { method: 'Routya Singleton Sequential', time: 110.5, ratio: 0.70, memory: 192, highlight: true },
    { method: 'Routya Singleton Parallel', time: 143.6, ratio: 0.91, memory: 312, highlight: true },
    { method: 'Routya Transient Sequential', time: 146.0, ratio: 0.93, memory: 240 },
  ],
}

export function Performance() {
  return (
    <section id="performance" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Proven <span className="text-primary">Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Benchmarked against MediatR 13.1.0 using BenchmarkDotNet on .NET 8
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Request Benchmarks */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Request Dispatching</h3>
            </div>

            <div className="space-y-4">
              {benchmarks.requests.map((bench, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    bench.highlight
                      ? 'bg-primary/5 border-primary/30'
                      : bench.baseline
                      ? 'bg-muted/30 border-border'
                      : 'bg-secondary/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{bench.method}</span>
                    {bench.baseline && <Badge variant="outline">Baseline</Badge>}
                    {bench.highlight && bench.ratio < 1.15 && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Competitive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{bench.time.toFixed(1)} ns</span>
                    <span className="text-muted-foreground">{bench.memory} B</span>
                    <span className={bench.ratio <= 1.0 ? 'text-primary' : 'text-muted-foreground'}>
                      {(bench.ratio * 100 - 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notification Benchmarks */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Notification Dispatching</h3>
            </div>

            <div className="space-y-4">
              {benchmarks.notifications.map((bench, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    bench.highlight
                      ? 'bg-primary/5 border-primary/30'
                      : bench.baseline
                      ? 'bg-muted/30 border-border'
                      : 'bg-secondary/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{bench.method}</span>
                    {bench.baseline && <Badge variant="outline">Baseline</Badge>}
                    {bench.highlight && bench.ratio < 1.0 && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {((1 - bench.ratio) * 100).toFixed(0)}% Faster
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{bench.time.toFixed(1)} ns</span>
                    <span className="text-muted-foreground">{bench.memory} B</span>
                    {bench.highlight && (
                      <span className="text-primary">
                        <MemoryStick className="w-3 h-3 inline mr-1" />
                        {(((benchmarks.notifications[0].memory - bench.memory) / benchmarks.notifications[0].memory) * 100).toFixed(0)}% less
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <div className="text-3xl font-bold text-primary mb-2">30%</div>
            <div className="text-sm text-muted-foreground">Faster notification dispatching with Singleton handlers</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
            <div className="text-3xl font-bold text-accent mb-2">56%</div>
            <div className="text-sm text-muted-foreground">Less memory usage for Singleton notifications</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">0</div>
            <div className="text-sm text-muted-foreground">Memory leaks with proper scope management</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
