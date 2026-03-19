export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  joinedAt: string;
}

const STORAGE_KEY = 'vibecoding_user';

const mockUsers: Record<string, User> = {
  'demo@vibecoding.com': {
    id: '1',
    name: 'Alex Coder',
    email: 'demo@vibecoding.com',
    avatar: '',
    level: 3,
    xp: 450,
    joinedAt: '2026-01-15',
  },
};

export const authService = {
  getCurrentUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  login(email: string, _password: string): { success: boolean; user?: User; error?: string } {
    const user = mockUsers[email] || {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      avatar: '',
      level: 1,
      xp: 0,
      joinedAt: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  signup(name: string, email: string, _password: string): { success: boolean; user?: User; error?: string } {
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      avatar: '',
      level: 1,
      xp: 0,
      joinedAt: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  addXP(amount: number) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.xp += amount;
    if (user.xp >= user.level * 200) {
      user.xp -= user.level * 200;
      user.level += 1;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },
};
