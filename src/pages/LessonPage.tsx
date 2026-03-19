import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseModules } from '@/data/courseData';
import { progressService } from '@/services/progressService';
import { authService } from '@/services/authService';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Lightbulb, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

const LessonPage = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const module = courseModules.find(m => m.id === moduleId);
  const lessonIdx = module?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const lesson = module?.lessons[lessonIdx];

  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  if (!module || !lesson) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="font-heading text-2xl font-bold">Lesson not found</h1>
        <Button className="mt-4" asChild><Link to="/course">Back to Course</Link></Button>
      </div>
    );
  }

  const allCorrect = lesson.exercises.every(
    ex => submitted[ex.id] && answers[ex.id] === ex.correctIndex
  );

  const handleNext = () => {
    if (allCorrect) {
      progressService.completeLesson(module.id, lesson.id);
      if (user) authService.addXP(user.id, 50);
    }
    const nextIdx = lessonIdx + 1;
    if (nextIdx < module.lessons.length) {
      navigate(`/course/${module.id}/${module.lessons[nextIdx].id}`);
    } else {
      const modIdx = courseModules.findIndex(m => m.id === module.id);
      const nextMod = courseModules[modIdx + 1];
      if (nextMod) navigate(`/course/${nextMod.id}/${nextMod.lessons[0].id}`);
      else navigate('/course');
    }
  };

  const handlePrev = () => {
    if (lessonIdx > 0) {
      navigate(`/course/${module.id}/${module.lessons[lessonIdx - 1].id}`);
    }
  };

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="mb-4 mt-8 font-heading text-2xl font-bold">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="mb-3 mt-6 font-heading text-xl font-semibold">{line.slice(4)}</h3>;
      if (line.startsWith('> ')) return <blockquote key={i} className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">{line.slice(2)}</blockquote>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-muted-foreground">{line.slice(2)}</li>;
      if (line.startsWith('| ')) return null; // skip table rows for simplicity
      if (line.trim() === '') return <div key={i} className="h-2" />;
      if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className="italic text-muted-foreground">{line.slice(1, -1)}</p>;
      return <p key={i} className="text-muted-foreground">{line}</p>;
    });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/course" className="hover:text-foreground transition-colors">Course</Link>
        <span>/</span>
        <span>{module.title}</span>
        <span>/</span>
        <span className="text-foreground">{lesson.title}</span>
      </div>

      <h1 className="mb-8 font-heading text-3xl font-bold">{lesson.title}</h1>

      {/* Content */}
      <div className="mb-12 space-y-1">
        {renderContent(lesson.content)}
      </div>

      {/* Exercises */}
      {lesson.exercises.length > 0 && (
        <div className="space-y-8">
          <h3 className="font-heading text-xl font-semibold">✍️ Exercises</h3>
          {lesson.exercises.map((ex) => {
            const selected = answers[ex.id];
            const isSubmitted = submitted[ex.id];
            const isCorrect = selected === ex.correctIndex;

            return (
              <div key={ex.id} className="rounded-xl border bg-card p-6">
                <p className="mb-4 font-medium">{ex.question}</p>
                <div className="mb-4 space-y-2">
                  {ex.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => { if (!isSubmitted) setAnswers(a => ({ ...a, [ex.id]: oi })); }}
                      className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${
                        isSubmitted && oi === ex.correctIndex
                          ? 'border-success bg-success/10 text-foreground'
                          : isSubmitted && oi === selected && !isCorrect
                          ? 'border-destructive bg-destructive/10 text-foreground'
                          : selected === oi
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'hover:border-primary/50 text-muted-foreground'
                      } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {!isSubmitted && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => { if (selected !== null && selected !== undefined) setSubmitted(s => ({ ...s, [ex.id]: true })); }}
                        disabled={selected === null || selected === undefined}
                      >
                        Check Answer
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowHint(h => ({ ...h, [ex.id]: !h[ex.id] }))}>
                        <Lightbulb className="mr-1 h-4 w-4" /> Hint
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowSolution(s => ({ ...s, [ex.id]: !s[ex.id] }))}>
                        <Eye className="mr-1 h-4 w-4" /> Reveal
                      </Button>
                    </>
                  )}
                </div>

                {showHint[ex.id] && !isSubmitted && (
                  <div className="mt-3 rounded-lg bg-accent/50 p-3 text-sm text-accent-foreground">
                    💡 {ex.hint}
                  </div>
                )}
                {showSolution[ex.id] && !isSubmitted && (
                  <div className="mt-3 rounded-lg bg-primary/10 p-3 text-sm">
                    ✅ {ex.explanation}
                  </div>
                )}

                {isSubmitted && (
                  <div className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-sm ${
                    isCorrect ? 'bg-success/10 text-foreground' : 'bg-destructive/10 text-foreground'
                  }`}>
                    {isCorrect ? <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                    <span>{isCorrect ? 'Correct! ' : 'Not quite. '}{ex.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={lessonIdx === 0}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext}>
          {allCorrect ? 'Complete & Continue' : 'Next'} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
