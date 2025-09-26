import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { tokenManager } from '../utils/auth';
import { User, MoodEntry, Sound } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentSound: Sound | null;
  moodHistory: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_CURRENT_SOUND'; payload: Sound | null }
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  currentSound: null,
  moodHistory: [],
  isLoading: true,
  error: null,
  darkMode: localStorage.getItem('darkMode') === 'true',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload, isLoading: false };
    case 'SET_CURRENT_SOUND':
      return { ...state, currentSound: action.payload };
    case 'ADD_MOOD_ENTRY':
      return { ...state, moodHistory: [...state.moodHistory, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'TOGGLE_DARK_MODE':
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', newDarkMode.toString());
      return { ...state, darkMode: newDarkMode };
    case 'LOGOUT':
      tokenManager.clearTokens();
      localStorage.removeItem('userData');
      return { 
        ...initialState, 
        isAuthenticated: false, 
        user: null, 
        isLoading: false,
        darkMode: state.darkMode 
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = tokenManager.getToken();
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_AUTHENTICATED', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Authentication check failed' });
        dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      }
    };

    checkAuth();
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}