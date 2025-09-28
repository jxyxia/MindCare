import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Gamepad2,
  Volume2,
  BookOpen,
  Users,
  Shield,
  Bot,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/sounds', label: 'Sounds', icon: Volume2 },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/professional-support', label: 'Professional Support', icon: Stethoscope },
  { path: '/emergency', label: 'Emergency', icon: Shield },
  { path: '/support', label: '24/7 Support', icon: Bot },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setIsProfileDropdownOpen(false);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 dark:bg-slate-900/95 dark:border-slate-700">
      <div className="w-[95%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 bg-white rounded-sm"
              />
            </div>
            <span className="text-xl font-semibold text-slate-800 dark:text-white">MindCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-4 py-2"
                >
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}>
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={state.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {state.darkMode ? (
                <Sun size={20} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Moon size={20} className="text-slate-600 dark:text-slate-300" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  {state.user?.avatar ? (
                    <img 
                      src={state.user.avatar} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {state.user?.name || 'User'}
                </span>
              </button>

              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2"
                >
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {state.user?.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {state.user?.email}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left"
                  >
                    <Settings size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Settings</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left"
                  >
                    <LogOut size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-slate-600 dark:text-slate-300" />
            ) : (
              <Menu size={24} className="text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 mb-1 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            <div className="border-t border-slate-200 dark:border-slate-700 mt-4 pt-4 mx-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left mb-3"
              >
                {state.darkMode ? (
                  <Sun size={20} className="text-slate-500 dark:text-slate-400" />
                ) : (
                  <Moon size={20} className="text-slate-500 dark:text-slate-400" />
                )}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {state.darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              
              <div className="flex items-center justify-between px-2 py-2 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    {state.user?.avatar ? (
                      <img 
                        src={state.user.avatar} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {state.user?.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {state.user?.email}
                    </p>
                  </div>
                </div>
                
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left"
              >
                <LogOut size={20} className="text-slate-500 dark:text-slate-400" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}