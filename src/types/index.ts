export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  streakDays: number;
  sessionsCompleted: number;
  currentMood?: MoodLevel;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodLevel;
  notes?: string;
  date: Date;
}

export type MoodLevel = 'excellent' | 'good' | 'okay' | 'low' | 'difficult';

export interface Game {
  id: string;
  title: string;
  description: string;
  category: 'anxiety-relief' | 'focus' | 'stress-management' | 'sleep-aid';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  rating: number;
}

export interface Sound {
  id: string;
  title: string;
  category: 'nature' | 'white-noise' | 'binaural' | 'meditation';
  url: string;
  duration: number;
  description: string;
  isPlaying?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'assessment';
  category: string;
  content: string;
  readTime: number;
  bookmarked: boolean;
  rating: number;
  tags: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  createdAt: Date;
  isAnonymous: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'crisis' | 'emergency' | 'support' | 'campus';
  description?: string;
  available24h: boolean;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  type: 'campus' | 'partner' | 'online';
  avatar?: string;
  rating: number;
  experience: number;
  languages: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
  contactMethods: {
    chat: boolean;
    call: boolean;
    video: boolean;
  };
  pricing?: {
    chat: number;
    call: number;
    video: number;
  };
  description: string;
  isOnline: boolean;
}

export interface TherapySession {
  id: string;
  therapistId: string;
  studentId: string;
  type: 'chat' | 'call' | 'video';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  scheduledDate: Date;
  duration: number;
  notes?: string;
  rating?: number;
  feedback?: string;
  cost?: number;
}