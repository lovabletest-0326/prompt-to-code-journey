import { Link } from 'react-router-dom';
import { courseModules, getTotalLessons } from '@/data/courseData';
import { progressService } from '@/services/progressService';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle } from 'lucide-react';

const CourseOverview = () => {
  const totalLessons = getTotalLessons();
  const overallPercent = progressService.getOverallPercent(totalLessons);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Course Modules</h1>
        <p className="mt-2 text-muted-foreground">5 modules · {totalLessons} lessons · Learn at your own pace</p>
        <div className="mt-4 max-w-md">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold text-primary">{overallPercent}%</span>
          </div>
          <Progress value={overallPercent} className="h-3" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseModules.map((mod, idx) => {
          const modPercent = progressService.getModulePercent(mod.id, mod.lessons.length);
          const isComplete = modPercent === 100;
          const prevComplete = idx === 0 || progressService.getModulePercent(courseModules[idx - 1].id, courseModules[idx - 1].lessons.length) > 0;

          return (
            <Link
              key={mod.id}
              to={prevComplete ? `/course/${mod.id}/${mod.lessons[0].id}` : '#'}
              className={`group relative rounded-xl border bg-card p-6 transition-all ${
                prevComplete ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {!prevComplete && (
                <div className="absolute right-4 top-4">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              {isComplete && (
                <div className="absolute right-4 top-4">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
              )}
              <div className="mb-4 text-4xl">{mod.icon}</div>
              <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Module {idx + 1}
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold">{mod.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{mod.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{mod.lessons.length} lessons</span>
                <span className="font-semibold text-primary">{modPercent}%</span>
              </div>
              <Progress value={modPercent} className="mt-2 h-1.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseOverview;
