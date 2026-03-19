import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AuthModal = () => {
  const { showAuth, setShowAuth, login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (showAuth === 'login') {
      const result = login(email, password);
      if (!result.success) setError(result.error || 'Login failed');
      else setShowAuth(null);
    } else {
      if (!name.trim()) { setError('Name is required'); return; }
      const result = signup(name, email, password);
      if (!result.success) setError(result.error || 'Signup failed');
      else setShowAuth(null);
    }
  };

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError(''); };

  return (
    <Dialog open={!!showAuth} onOpenChange={(open) => { if (!open) { setShowAuth(null); reset(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {showAuth === 'login' ? 'Welcome Back!' : 'Join Vibecoding'}
          </DialogTitle>
          <DialogDescription>
            {showAuth === 'login'
              ? 'Sign in to continue your learning journey.'
              : 'Create an account to track progress and save prompts.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {showAuth === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">
            {showAuth === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {showAuth === 'login' ? (
              <>Don't have an account?{' '}
                <button type="button" className="text-primary hover:underline" onClick={() => { setShowAuth('signup'); reset(); }}>Sign up</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" className="text-primary hover:underline" onClick={() => { setShowAuth('login'); reset(); }}>Sign in</button>
              </>
            )}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
