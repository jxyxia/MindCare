export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  settings?: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'dark';
  language: string;
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