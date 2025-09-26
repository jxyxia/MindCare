import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../utils/validation';
import { authAPI, tokenManager, LoginCredentials } from '../../utils/auth';
import { useApp } from '../../contexts/AppContext';
import GoogleAuthButton from './GoogleAuthButton';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { dispatch } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'student@gmail.com',
      password: 'mindcare2024',
      rememberMe: false,
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      };

      const response = await authAPI.login(credentials);
      
      tokenManager.setTokens(response.token, response.refreshToken, data.rememberMe);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      // Mock Google OAuth response
      const mockGoogleData = {
        tokenId: 'mock-token-id',
        profileObj: {
          googleId: 'mock-google-id',
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          imageUrl: 'https://via.placeholder.com/150',
        },
      };

      const response = await authAPI.googleAuth(mockGoogleData);
      
      tokenManager.setTokens(response.token, response.refreshToken, true);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      onSuccess();
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Google Auth Button */}
      <GoogleAuthButton
        onClick={handleGoogleAuth}
        loading={googleLoading}
        text="Continue with Google"
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">Or continue with email</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
        >
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400" />
          </div>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email
                ? 'border-red-300 bg-red-50'
                : watchedFields.email && !errors.email
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-300'
            }`}
            placeholder="Enter your email"
          />
          {watchedFields.email && !errors.email && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.password
                ? 'border-red-300 bg-red-50'
                : watchedFields.password && !errors.password
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-300'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.password.message}
          </motion.p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-slate-600">Remember me</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Sign In'
        )}
      </motion.button>

      {/* Register Link */}
      <div className="text-center">
        <span className="text-sm text-slate-600">
          New to MindCare?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create an account
          </Link>
        </span>
      </div>
    </form>
  );
}