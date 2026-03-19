import { useState } from 'react';
import { aiService, GeneratedCode } from '@/services/aiService';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Save, Play, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Playground = () => {
  const { user, setShowAuth } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GeneratedCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await aiService.generateCode(prompt);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!user) { setShowAuth('login'); return; }
    aiService.savePrompt(prompt);
    toast.success('Prompt saved to your dashboard!');
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      toast.success('Code copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Interactive Playground</h1>
        <p className="mt-2 text-muted-foreground">
          Describe what you want to build and watch AI generate the code with explanations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-6">
            <label className="mb-2 block font-heading text-sm font-semibold">Your Prompt</label>
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder='Try: "Create a card with a title, description, and an orange button"'
              className="min-h-[120px] resize-none"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                {loading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Play className="mr-1 h-4 w-4" />}
                Generate
              </Button>
              <Button variant="outline" onClick={handleSave} disabled={!prompt.trim()}>
                <Save className="mr-1 h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="rounded-xl border bg-card p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Try these prompts</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Create an orange button',
                'Make a card with a title and text',
                'Build a navigation bar',
                'Design a contact form',
              ].map(p => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Code output */}
          {result && (
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-heading text-sm font-semibold">Generated Code</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="mr-1 h-3 w-3" /> Copy
                </Button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-secondary p-4 text-xs leading-relaxed">
                <code>{result.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Preview & Overlay */}
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-heading text-sm font-semibold">Live Preview</span>
            </div>
            <div className="min-h-[200px] rounded-lg border bg-background p-6">
              {result ? (
                <div dangerouslySetInnerHTML={{ __html: result.preview }} />
              ) : (
                <div className="flex h-full min-h-[160px] items-center justify-center text-muted-foreground">
                  <p className="text-center text-sm">Your preview will appear here.<br />Enter a prompt and click Generate!</p>
                </div>
              )}
            </div>
          </div>

          {/* Educational Overlay */}
          {result && (
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-heading text-sm font-semibold">Educational Overlay</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOverlay(!showOverlay)}
                >
                  {showOverlay ? 'Hide' : 'Show'}
                </Button>
              </div>
              {showOverlay && (
                <div className="space-y-2">
                  {result.explanation.map((line, i) => (
                    <div key={i} className="rounded-lg bg-accent/50 px-4 py-2.5 text-sm text-accent-foreground">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
