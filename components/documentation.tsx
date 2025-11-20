'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Book, Code2, Rocket, Settings2, Bell, Zap } from 'lucide-react'

export function Documentation() {
  const [activeTab, setActiveTab] = useState('quickstart')

  return (
    <section id="docs" className="py-24 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            <span className="text-primary">Documentation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Everything you need to get started with Routya in your .NET applications
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-transparent">
            <TabsTrigger value="quickstart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Rocket className="w-4 h-4 mr-2" />
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="configuration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings2 className="w-4 h-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code2 className="w-4 h-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="lifetimes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="w-4 h-4 mr-2" />
              Lifetimes
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Book className="w-4 h-4 mr-2" />
              Pipeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Quick Start Guide</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Installation</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
                    <code className="text-primary">dotnet add package Routya.Core --version 2.0.0</code>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Register Services</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`// Register with assembly scanning
builder.Services.AddRoutya(
    cfg => cfg.Scope = RoutyaDispatchScope.Scoped,
    Assembly.GetExecutingAssembly()
);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Define a Request</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class HelloRequest(string name) : IRequest<string>
{
    public string Name { get; } = name;
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Create a Handler</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class HelloHandler : IAsyncRequestHandler<HelloRequest, string>
{
    public async Task<string> HandleAsync(
        HelloRequest request,
        CancellationToken cancellationToken)
    {
        return await Task.FromResult($"Hello, {request.Name}!");
    }
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Dispatch the Request</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`var result = await _dispatcher.SendAsync<HelloRequest, string>(
    new HelloRequest("World")
);`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Dependency Injection Configuration</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Scoped (Default, Recommended)</h4>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    Creates a new DI scope for each dispatch. Safely supports handlers registered as Scoped. 
                    Use this if your handlers depend on EF Core DbContext, IHttpContextAccessor, or IMemoryCache.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`builder.Services.AddRoutya(
    cfg => cfg.Scope = RoutyaDispatchScope.Scoped,
    Assembly.GetExecutingAssembly()
);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Root (Fastest)</h4>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    Resolves handlers directly from the root IServiceProvider. Ideal for stateless handlers registered 
                    as Transient or Singleton. Will fail if your handler is registered as Scoped.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`builder.Services.AddRoutya(
    cfg => cfg.Scope = RoutyaDispatchScope.Root,
    Assembly.GetExecutingAssembly()
);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Manual Registration</h4>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    For fine-grained control, register handlers manually without assembly scanning.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`// Register core services only
builder.Services.AddRoutya();

// Manually register handlers
builder.Services.AddScoped<IAsyncRequestHandler<MyRequest, MyResponse>, MyHandler>();`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Request/Response Pattern</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Requests are single-handler messages that return a response. Perfect for queries and commands 
                  that need a return value.
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Synchronous Handler</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class GetProductHandler : IRequestHandler<GetProductRequest, Product>
{
    public Product Handle(GetProductRequest request)
    {
        // Synchronous logic here
        return product;
    }
}

// Dispatch
var product = _dispatcher.Send<GetProductRequest, Product>(request);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Asynchronous Handler</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class CreateProductHandler 
    : IAsyncRequestHandler<CreateProductRequest, Product>
{
    public async Task<Product> HandleAsync(
        CreateProductRequest request,
        CancellationToken cancellationToken)
    {
        // Async logic here
        return await CreateProductAsync(request);
    }
}

// Dispatch
var product = await _dispatcher.SendAsync<CreateProductRequest, Product>(request);`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Notification Pattern</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Notifications are multi-handler messages with no return value. Perfect for events that trigger 
                  multiple side effects like sending emails, logging, or updating caches.
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Define Notification</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class UserRegisteredNotification(string email) : INotification
{
    public string Email { get; } = email;
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Create Multiple Handlers</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class SendEmailHandler : INotificationHandler<UserRegisteredNotification>
{
    public async Task Handle(UserRegisteredNotification notification, 
        CancellationToken cancellationToken = default)
    {
        await SendWelcomeEmail(notification.Email);
    }
}

public class LogAnalyticsHandler : INotificationHandler<UserRegisteredNotification>
{
    public async Task Handle(UserRegisteredNotification notification,
        CancellationToken cancellationToken = default)
    {
        await LogEvent("UserRegistered", notification.Email);
    }
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Sequential Dispatch</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`// Handlers execute one after another
await _dispatcher.PublishAsync(
    new UserRegisteredNotification("user@example.com")
);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Parallel Dispatch</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`// Handlers execute concurrently
await _dispatcher.PublishParallelAsync(
    new UserRegisteredNotification("user@example.com")
);`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="lifetimes" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Handler Lifetimes</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Configure handler lifetimes for optimal performance based on your use case. New in v1.0.5!
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Singleton (Fastest)</h4>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                    Best for stateless handlers. ~380 ns per request, 30% faster for notifications. 
                    Cannot use scoped dependencies like DbContext.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`// Assembly scanning
builder.Services.AddRoutya(
    cfg => cfg.HandlerLifetime = ServiceLifetime.Singleton,
    Assembly.GetExecutingAssembly()
);

// Manual registration (recommended for performance)
builder.Services.AddRoutyaAsyncRequestHandler<CreateProductRequest, Product, 
    CreateProductHandler>(ServiceLifetime.Singleton);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Scoped (Default)</h4>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                    Safe for handlers with DbContext and other scoped dependencies. ~440 ns per request.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`builder.Services.AddRoutya(
    cfg => cfg.HandlerLifetime = ServiceLifetime.Scoped,
    Assembly.GetExecutingAssembly()
);

// Or manual
builder.Services.AddRoutyaAsyncRequestHandler<GetProductRequest, Product, 
    GetProductHandler>(ServiceLifetime.Scoped);`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Transient</h4>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                    New instance every time. ~384 ns per request. Maximum isolation when needed.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`builder.Services.AddRoutya(
    cfg => cfg.HandlerLifetime = ServiceLifetime.Transient,
    Assembly.GetExecutingAssembly()
);`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Pipeline Behaviors</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Add cross-cutting concerns like logging, validation, and caching that execute around your requests. 
                  Behaviors are registered manually and execute in registration order.
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Register Behaviors</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Implement Logging Behavior</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class LoggingBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"[Logging] → {typeof(TRequest).Name}");
        var result = await next(cancellationToken);
        Console.WriteLine($"[Logging] ✓ {typeof(TRequest).Name}");
        return result;
    }
}`}</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-primary">Implement Validation Behavior</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground"><code>{`public class ValidationBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
{
    private readonly IValidator<TRequest> _validator;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);
        
        return await next(cancellationToken);
    }
}`}</code></pre>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  Execution order: LoggingBehavior → ValidationBehavior → Handler → ValidationBehavior → LoggingBehavior
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
