import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';

interface MoodEntry {
  date: Date;
  mood: string;
  note?: string;
}

interface MoodCalendarProps {
  moodEntries: MoodEntry[];
  onDateClick?: (date: Date, mood?: string) => void;
}

const moodEmojis: { [key: string]: string } = {
  wonderful: '😊',
  'pretty-good': '🙂',
  'just-okay': '😐',
  'not-great': '😕',
  'tough-time': '😢',
};

const moodLabels: { [key: string]: string } = {
  wonderful: 'Wonderful',
  'pretty-good': 'Pretty good',
  'just-okay': 'Just okay',
  'not-great': 'Not great',
  'tough-time': 'Tough time',
};

export default function MoodCalendar({ moodEntries, onDateClick }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMoodForDate = (date: Date) => {
    return moodEntries.find(entry => isSameDay(entry.date, date));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-slate-800">
          Your Mood History
        </h3>
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={14} className="text-slate-600" />
          </motion.button>
          <span className="font-medium text-slate-700 min-w-[100px] text-center text-sm">
            {format(currentMonth, 'MMM yyyy')}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextMonth}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight size={14} className="text-slate-600" />
          </motion.button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {/* Weekday headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 py-1">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month start */}
        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-6" />
        ))}

        {/* Month days */}
        {monthDays.map(date => {
          const moodEntry = getMoodForDate(date);
          const isCurrentDay = isToday(date);

          return (
            <motion.button
              key={date.toISOString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateClick?.(date, moodEntry?.mood)}
              className={`
                relative h-6 w-full rounded-lg text-xs font-medium transition-all duration-200
                ${isCurrentDay
                  ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-400'
                  : 'hover:bg-slate-100 text-slate-700'
                }
              `}
            >
              <span className="relative z-10">{date.getDate()}</span>
              {moodEntry && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sm">{moodEmojis[moodEntry.mood]}</div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Compact Legend */}
      <div className="grid grid-cols-5 gap-1 text-xs">
        {Object.entries(moodLabels).map(([mood, label]) => (
          <div key={mood} className="flex flex-col items-center space-y-1 p-1 bg-white rounded-lg">
            <span className="text-xs">{moodEmojis[mood]}</span>
            <span className="text-slate-600 text-center leading-tight text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}