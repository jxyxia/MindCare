import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerSchema, universities } from '../../utils/validation';
import { authAPI, tokenManager, RegisterData } from '../../utils/auth';
import { useApp } from '../../contexts/AppContext';
import GoogleAuthButton from './GoogleAuthButton';
import PasswordStrengthMeter from './PasswordStrengthMeter';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  university: string;
  studentId?: string;
  agreeToTerms: boolean;
}

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { dispatch } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      university: '',
      studentId: '',
      agreeToTerms: false,
    },
  });

  const watchedFields = watch();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const registerData: RegisterData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        university: data.university,
        studentId: data.studentId,
      };

      const response = await authAPI.register(registerData);
      
      tokenManager.setTokens(response.token, response.refreshToken, true);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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
          name: 'Jane Smith',
          email: 'jane.smith@gmail.com',
          imageUrl: 'https://via.placeholder.com/150',
        },
      };

      const response = await authAPI.googleAuth(mockGoogleData);
      
      tokenManager.setTokens(response.token, response.refreshToken, true);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      onSuccess();
    } catch (err) {
      setError('Google sign-up failed. Please try again.');
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
        text="Sign up with Google"
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">Or create account with email</span>
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

      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.fullName
                ? 'border-red-300 bg-red-50'
                : watchedFields.fullName && !errors.fullName
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-300'
            }`}
            placeholder="Enter your full name"
          />
          {watchedFields.fullName && !errors.fullName && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
        {errors.fullName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.fullName.message}
          </motion.p>
        )}
      </div>

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

      {/* University Field */}
      <div>
        <label htmlFor="university" className="block text-sm font-medium text-slate-700 mb-2">
          University/College
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GraduationCap className="h-5 w-5 text-slate-400" />
          </div>
          <select
            {...register('university')}
            id="university"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.university
                ? 'border-red-300 bg-red-50'
                : watchedFields.university && !errors.university
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-300'
            }`}
          >
            {universities.map((university) => (
              <option key={university} value={university === 'Select your university' ? '' : university}>
                {university}
              </option>
            ))}
          </select>
        </div>
        {errors.university && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.university.message}
          </motion.p>
        )}
      </div>

      {/* Student ID Field (Optional) */}
      <div>
        <label htmlFor="studentId" className="block text-sm font-medium text-slate-700 mb-2">
          Student ID <span className="text-slate-400">(Optional)</span>
        </label>
        <input
          {...register('studentId')}
          type="text"
          id="studentId"
          className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your student ID"
        />
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
            placeholder="Create a password"
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
        <PasswordStrengthMeter password={password} />
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.confirmPassword
                ? 'border-red-300 bg-red-50'
                : watchedFields.confirmPassword && !errors.confirmPassword
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start space-x-3">
          <input
            {...register('agreeToTerms')}
            type="checkbox"
            className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.agreeToTerms.message}
          </motion.p>
        )}
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
          'Create Account'
        )}
      </motion.button>

      {/* Login Link */}
      <div className="text-center">
        <span className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
}