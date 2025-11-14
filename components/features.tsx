import { Zap, Settings, Layers, Target, RefreshCw, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'High-performance dispatching with registry-based optimization. 30% faster than MediatR for notifications with Singleton handlers.',
  },
  {
    icon: Settings,
    title: 'Configurable Lifetimes',
    description: 'Choose Singleton, Scoped, or Transient per handler. Optimize for your specific use case with flexible lifetime management.',
  },
  {
    icon: Layers,
    title: 'Pipeline Behaviors',
    description: 'Optional cross-cutting concerns support. Add logging, validation, and custom behaviors that execute around your requests.',
  },
  {
    icon: Target,
    title: 'CQRS Pattern',
    description: 'Clean interface-based abstraction for Requests/Responses and Notifications. Minimal overhead with maximum clarity.',
  },
  {
    icon: RefreshCw,
    title: 'Parallel & Sequential',
    description: 'Supports both sequential and parallel notification dispatching. Choose the right strategy for your scenario.',
  },
  {
    icon: Shield,
    title: 'Memory Efficient',
    description: 'Zero memory leaks with proper scope management. 56% less memory than MediatR for Singleton notification handlers.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Built for <span className="text-primary">Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Everything you need for high-performance CQRS message dispatching in modern .NET applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
