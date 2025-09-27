import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Users, BookOpen, Headphones, Phone, Sun, Moon, Star, ChevronDown, ChevronUp, CheckCircle, Play, Target, Trophy, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import MoodTracker from '../components/MoodTracker';
import WeatherWidget from '../components/WeatherWidget';
import ProfessionalSupport from '../components/ProfessionalSupport';
import SessionTracker from '../components/SessionTracker';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSupportPanel, setShowSupportPanel] = useState(false);
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [todaysFocusCompleted, setTodaysFocusCompleted] = useState(false);

  useEffect(() => {
    // Check if today's focus is completed
    const completedToday = localStorage.getItem(`focus_completed_${new Date().toDateString()}`);
    setTodaysFocusCompleted(!!completedToday);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getDailyInspiration = () => {
    const inspirations = [
      "Today is a new opportunity to take care of yourself. ✨",
      "Your mental health matters, and so do you. 💙",
      "Every small step forward is progress worth celebrating. 🌱",
      "You are stronger than you think and braver than you feel. 💪",
      "Progress, not perfection, is what we're aiming for. 🎯"
    ];
    const dayOfYear = Math.floor((currentTime.getTime() - new Date(currentTime.getFullYear(), 0, 0).getTime()) / 86400000);
    return inspirations[dayOfYear % inspirations.length];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMarkComplete = () => {
    setTodaysFocusCompleted(true);
    localStorage.setItem(`focus_completed_${new Date().toDateString()}`, 'true');
    
    // Update streak and sessions
    const currentStreak = parseInt(localStorage.getItem('current_streak') || '0');
    const totalSessions = parseInt(localStorage.getItem('total_sessions') || '0');
    
    localStorage.setItem('current_streak', (currentStreak + 1).toString());
    localStorage.setItem('total_sessions', (totalSessions + 1).toString());
  };

  const quickActions = [
    {
      title: "5-Minute Breathing",
      description: "Quick mindfulness exercise",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
      action: () => navigate('/games')
    },
    {
      title: "Calming Sounds",
      description: "Nature sounds & music",
      icon: Headphones,
      color: "from-green-400 to-emerald-500",
      action: () => navigate('/sounds')
    },
    {
      title: "Peer Support",
      description: "Connect with others",
      icon: Users,
      color: "from-blue-400 to-indigo-500",
      action: () => navigate('/community')
    }
  ];

  const currentStreak = parseInt(localStorage.getItem('current_streak') || '0');
  const totalSessions = parseInt(localStorage.getItem('total_sessions') || '0');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Weather Widget */}
              <div className="flex justify-center lg:justify-start">
                <WeatherWidget />
              </div>

              {/* Welcome Message */}
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-light text-slate-800 leading-relaxed">
                    {getTimeBasedGreeting()}, {state.user?.name || 'Student'}! 👋
                  </h1>
                  <p className="text-slate-600 text-base">
                    {formatDate(currentTime)}
                  </p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <p className="text-slate-700 font-medium italic text-base">
                    {getDailyInspiration()}
                  </p>
                </div>
              </div>

              {/* Daily Tip */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 border border-amber-200 max-w-sm">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-amber-600 mr-2" />
                    <span className="text-amber-800 font-medium text-sm">Daily Tip</span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Take a 2-minute break every hour to stretch and breathe deeply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Today's Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Today's Focus</h2>
              <div className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                todaysFocusCompleted 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 mb-1">
                      Take one small step toward better mental wellness today
                    </p>
                    <span className="text-slate-600 text-sm">When you're ready, no pressure 💙</span>
                  </div>
                  {todaysFocusCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-600 ml-4" />
                  )}
                </div>
                
                <div className="flex justify-end mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMarkComplete}
                    disabled={todaysFocusCompleted}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                      todaysFocusCompleted
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {todaysFocusCompleted ? 'Completed! 🎉' : 'Mark Complete'}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Progress</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-2xl font-light text-orange-500">{currentStreak}</div>
                  <p className="text-slate-600 text-sm">Day Streak</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-light text-emerald-500">{totalSessions}</div>
                  <p className="text-slate-600 text-sm">Sessions</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-2xl font-light text-blue-500">5/7</div>
                  <p className="text-slate-600 text-sm">Weekly Goal</p>
                </div>
              </div>
            </motion.div>

            {/* Mood Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MoodTracker />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                          {action.title}
                        </h3>
                        <p className="text-slate-600 text-xs">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Professional Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <ProfessionalSupport />
            </motion.div>

            {/* Session Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SessionTracker />
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            
            {/* Support Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setShowSupportPanel(!showSupportPanel)}
                className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Need Support?</h3>
                  {showSupportPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {showSupportPanel && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/emergency')}
                        className="w-full bg-gradient-to-r from-pink-100 to-rose-100 border border-pink-200 rounded-xl p-3 text-left hover:from-pink-200 hover:to-rose-200 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="font-medium text-pink-800 text-sm">Crisis Support</p>
                            <p className="text-pink-600 text-xs">24/7 help available</p>
                          </div>
                        </div>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/community')}
                        className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-xl p-3 text-left hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-800 text-sm">Peer Support</p>
                            <p className="text-blue-600 text-xs">Connect with others</p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Events Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setShowEventsPanel(!showEventsPanel)}
                className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Optional Events</h3>
                  {showEventsPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {showEventsPanel && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-700 text-sm">Tomorrow, 3:00 PM</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-1">Mindfulness Workshop</p>
                        <p className="text-xs text-slate-500">Join if it feels right for you</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-700 text-sm">Friday, 2:00 PM</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-1">Study Group Session</p>
                        <p className="text-xs text-slate-500">Optional participation</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Gratitude Corner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200"
            >
              <h3 className="text-base font-semibold text-amber-800 mb-3">Gratitude Corner</h3>
              <p className="text-amber-700 mb-3 text-sm">What's one small thing you're grateful for today?</p>
              <textarea 
                className="w-full p-3 border border-amber-200 rounded-xl bg-white/50 text-amber-800 placeholder-amber-500 resize-none text-sm"
                rows={3}
                placeholder="Optional reflection space..."
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;