import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  joinedAt: string;
}

export const authService = {
  async fetchProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      level: data.level,
      xp: data.xp,
      joinedAt: data.joined_at,
    };
  },

  async addXP(userId: string, amount: number): Promise<User | null> {
    const profile = await this.fetchProfile(userId);
    if (!profile) return null;

    let xp = profile.xp + amount;
    let level = profile.level;
    if (xp >= level * 200) {
      xp -= level * 200;
      level += 1;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ xp, level })
      .eq('id', userId);
    if (error) return null;
    return { ...profile, xp, level };
  },
};
