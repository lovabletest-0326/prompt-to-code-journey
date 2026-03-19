import { useAuth } from '@/components/AuthProvider';
import { aiService } from '@/services/aiService';
import { progressService } from '@/services/progressService';
import { courseModules, getTotalLessons, communityPrompts } from '@/data/courseData';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Heart, Trophy, Star, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, setShowAuth } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="font-heading text-3xl font-bold">Sign in to view your Dashboard</h1>
        <p className="mt-3 text-muted-foreground">Track your progress, saved prompts, and community gallery.</p>
        <Button className="mt-6" onClick={() => setShowAuth('login')}>Sign In</Button>
      </div>
    );
  }

  const totalLessons = getTotalLessons();
  const overallPercent = progressService.getOverallPercent(totalLessons);
  const savedPrompts = aiService.getSavedPrompts();

  const completedLessons = Object.values(progressService.getAll()).reduce((sum, mod) => {
    return sum + Object.values(mod).filter((l: { completed: boolean }) => l.completed).length;
  }, 0);

  const badges = [
    { icon: '🚀', label: 'First Steps', unlocked: completedLessons >= 1 },
    { icon: '✍️', label: 'Prompt Writer', unlocked: savedPrompts.length >= 1 },
    { icon: '🎨', label: 'UI Designer', unlocked: completedLessons >= 4 },
    { icon: '⚡', label: 'Logic Master', unlocked: completedLessons >= 7 },
    { icon: '🎯', label: 'Launcher', unlocked: overallPercent === 100 },
    { icon: '🌟', label: 'Community Star', unlocked: false },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl border bg-card p-6 text-center lg:col-span-1">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
            {user.avatar || '👤'}
          </div>
          <h2 className="font-heading text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-4 w-4" />
                <span className="font-heading text-lg font-bold">{user.level}</span>
              </div>
              <span className="text-xs text-muted-foreground">Level</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-1 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="font-heading text-lg font-bold">{user.xp}</span>
              </div>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{overallPercent}%</span>
            </div>
            <Progress value={overallPercent} className="h-2" />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Badges */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Achievement Badges</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center rounded-lg border p-3 text-center transition-all ${
                    b.unlocked ? 'bg-accent/50' : 'opacity-40 grayscale'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span className="mt-1 text-xs font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Prompts */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Saved Prompts</h3>
            </div>
            {savedPrompts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved prompts yet. Go to the{' '}
                <Link to="/playground" className="text-primary hover:underline">Playground</Link> to create some!
              </p>
            ) : (
              <div className="space-y-2">
                {savedPrompts.slice(0, 5).map((sp, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border bg-background p-3 text-sm">
                    <span className="text-muted-foreground">{sp.prompt}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(sp.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Community Gallery */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Community Prompt Gallery</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {communityPrompts.map(cp => (
                <div key={cp.id} className="rounded-lg border bg-background p-4">
                  <p className="mb-2 text-sm">{cp.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">by {cp.author}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3" /> {cp.likes}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {cp.tags.map(t => (
                      <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
