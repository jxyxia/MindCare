import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Trophy, Flame } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function QuickStats() {
  const { state } = useApp();
  const user = state.user;

  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${user?.streakDays || 0} days`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Trophy,
      label: 'Sessions Completed',
      value: user?.sessionsCompleted || 0,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Target,
      label: 'Weekly Goal',
      value: '5/7 days',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={stat.color} size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}