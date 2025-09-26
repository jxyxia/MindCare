import Cookies from 'js-cookie';

// In-memory user storage for demo purposes
interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  university: string;
  studentId?: string;
  joinDate: Date;
  streakDays: number;
  sessionsCompleted: number;
}

// Get stored users from localStorage
const getStoredUsers = (): StoredUser[] => {
  try {
    const stored = localStorage.getItem('mindcare_users');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save users to localStorage
const saveStoredUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem('mindcare_users', JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

// Find user by email
const findUserByEmail = (email: string): StoredUser | undefined => {
  const users = getStoredUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university?: string;
  joinDate: Date;
  streakDays: number;
  sessionsCompleted: number;
  currentMood?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  university: string;
  studentId?: string;
}

export interface GoogleAuthData {
  tokenId: string;
  profileObj: {
    googleId: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

// Mock API functions - replace with actual API calls
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check hardcoded demo account first
    if (credentials.email === 'student@gmail.com' && credentials.password === 'mindcare2024') {
      const user: User = {
        id: 'demo-1',
        name: 'Student',
        email: credentials.email,
        university: 'University of Mumbai',
        joinDate: new Date('2024-01-15'),
        streakDays: 12,
        sessionsCompleted: 45,
        currentMood: 'good'
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      const refreshToken = 'mock-refresh-token-' + Date.now();
      
      // Save user data to localStorage for persistence
      localStorage.setItem('userData', JSON.stringify(user));
      
      return { user, token, refreshToken };
    }
    
    // Check stored users first
    const storedUser = findUserByEmail(credentials.email);
    if (storedUser && storedUser.password === credentials.password) {
      const user: User = {
        id: storedUser.id,
        name: storedUser.fullName,
        email: credentials.email,
        university: storedUser.university,
        joinDate: storedUser.joinDate,
        streakDays: storedUser.streakDays,
        sessionsCompleted: storedUser.sessionsCompleted,
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      const refreshToken = 'mock-refresh-token-' + Date.now();
      
      // Save user data to localStorage for persistence
      localStorage.setItem('userData', JSON.stringify(user));
      
      return { user, token, refreshToken };
    }
    
    throw new Error('Invalid credentials. Please check your email and password.');
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }
    
    // Create new user
    const newStoredUser: StoredUser = {
      id: 'user-' + Date.now(),
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      university: data.university,
      studentId: data.studentId,
      joinDate: new Date(),
      streakDays: 0,
      sessionsCompleted: 0,
    };
    
    // Save to localStorage
    const users = getStoredUsers();
    users.push(newStoredUser);
    saveStoredUsers(users);
    
    // Return user data for login
    const user: User = {
      id: newStoredUser.id,
      name: data.fullName,
      email: data.email,
      university: data.university,
      joinDate: new Date(),
      streakDays: 0,
      sessionsCompleted: 0,
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    const refreshToken = 'mock-refresh-token-' + Date.now();
    
    // Save user data to localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(user));
    
    return { user, token, refreshToken };
  },

  googleAuth: async (googleData: GoogleAuthData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user: User = {
      id: 'google-' + googleData.profileObj.googleId,
      name: googleData.profileObj.name,
      email: googleData.profileObj.email,
      avatar: googleData.profileObj.imageUrl,
      joinDate: new Date(),
      streakDays: 0,
      sessionsCompleted: 0,
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    const refreshToken = 'mock-refresh-token-' + Date.now();
    
    // Save user data to localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(user));
    
    return { user, token, refreshToken };
  },

  forgotPassword: async (email: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    
    // Mock successful password reset request
    console.log(`Password reset email sent to ${email}`);
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { token: 'new-mock-jwt-token-' + Date.now() };
  },
};

export const tokenManager = {
  setTokens: (token: string, refreshToken: string, rememberMe = false) => {
    const options = rememberMe ? { expires: 30 } : undefined; // 30 days if remember me
    Cookies.set('auth_token', token, options);
    Cookies.set('refresh_token', refreshToken, options);
  },

  getToken: (): string | undefined => {
    return Cookies.get('auth_token');
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get('refresh_token');
  },

  clearTokens: () => {
    Cookies.remove('auth_token');
    Cookies.remove('refresh_token');
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get('auth_token');
  },
};