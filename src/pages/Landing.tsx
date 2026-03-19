import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, BookOpen, Palette, Code, MessageSquare } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero px-4 py-20 text-hero-foreground md:py-32">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(30 95% 55% / 0.3), transparent 70%)' }} />
        <div className="container relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Free course — No coding experience needed
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl lg:text-7xl animate-fade-in-up">
            Build Software by<br />
            <span className="text-primary">Talking to AI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-hero-foreground/70 md:text-xl" style={{ animationDelay: '0.15s' }}>
            Vibecoding is the new superpower. Describe what you want in plain English and watch AI turn your ideas into real, working code.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="animate-pulse-glow text-base" asChild>
              <Link to="/course">
                Start Learning Free <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10" asChild>
              <Link to="/playground">Try the Playground</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Vibecoding */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">What is Vibecoding?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A revolutionary approach to software creation for everyone.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: MessageSquare, title: 'Describe Your Vision', desc: 'Tell the AI what you want in plain English — like chatting with a friend who happens to be a brilliant developer.' },
              { icon: Code, title: 'AI Writes the Code', desc: 'The AI translates your description into clean, working code. No syntax to memorise, no errors to debug.' },
              { icon: Palette, title: 'See It Come Alive', desc: 'Watch your creation appear in real-time. Iterate by refining your prompts until it\'s perfect.' },
            ].map((item, i) => (
              <div key={i} className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 inline-flex rounded-lg bg-accent p-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Why Learn Vibecoding?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: 'No Code Needed', desc: 'Start building from day one — zero programming knowledge required.' },
              { icon: Sparkles, title: 'AI-Powered', desc: 'Leverage cutting-edge AI to handle all the technical complexity.' },
              { icon: BookOpen, title: 'Learn by Doing', desc: 'Interactive exercises and a live playground for hands-on practice.' },
              { icon: ArrowRight, title: 'Ship Real Projects', desc: 'Build and launch a real personal project by the end of the course.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-heading font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Ready to Start Building?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of beginners who are already creating amazing things with vibecoding.
          </p>
          <Button size="lg" className="mt-8 text-base" asChild>
            <Link to="/course">
              Begin the Course <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
