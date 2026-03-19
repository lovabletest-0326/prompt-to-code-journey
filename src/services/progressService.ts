const PROGRESS_KEY = 'vibecoding_progress';

export interface LessonProgress {
  completed: boolean;
  score?: number;
}

export type ProgressData = Record<string, Record<string, LessonProgress>>;

export const progressService = {
  getAll(): ProgressData {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  },

  getModuleProgress(moduleId: string): Record<string, LessonProgress> {
    return this.getAll()[moduleId] || {};
  },

  completeLesson(moduleId: string, lessonId: string, score = 100) {
    const all = this.getAll();
    if (!all[moduleId]) all[moduleId] = {};
    all[moduleId][lessonId] = { completed: true, score };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  },

  getOverallPercent(totalLessons: number): number {
    const all = this.getAll();
    let completed = 0;
    Object.values(all).forEach(mod => {
      Object.values(mod).forEach(l => { if (l.completed) completed++; });
    });
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  },

  getModulePercent(moduleId: string, totalLessons: number): number {
    const mod = this.getModuleProgress(moduleId);
    const completed = Object.values(mod).filter(l => l.completed).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  },
};
