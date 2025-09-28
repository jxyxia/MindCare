import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import MoodCalendar from './MoodCalendar';
import { useApp } from '../contexts/AppContext';

const moodOptions = [
  { id: 'wonderful', emoji: '😊', label: 'Wonderful' },
  { id: 'pretty-good', emoji: '🙂', label: 'Pretty good' },
  { id: 'just-okay', emoji: '😐', label: 'Just okay' },
  { id: 'not-great', emoji: '😕', label: 'Not great' },
  { id: 'tough-time', emoji: '😢', label: 'Tough time' }
];

export default function MoodTracker() {
  const { state } = useApp();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if mood was already logged today
  const today = new Date().toDateString();
  const todayMoodLogged = localStorage.getItem(`mood_${today}`);

  const handleMoodSelect = (moodId: string) => {
    if (todayMoodLogged) return;
    setSelectedMood(moodId);
    setIsExpanded(true);
  };

  const handleSaveMood = async () => {
    if (!selectedMood) return;

    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const moodEntry = {
      mood: selectedMood,
      note: note.trim(),
      timestamp: new Date().toISOString(),
      date: today,
      userId: state.user?.id || 'demo-user'
    };
    
    localStorage.setItem(`mood_${today}`, JSON.stringify(moodEntry));
    
    setIsSaving(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedMood(null);
      setNote('');
      setIsExpanded(false);
    }, 2000);
  };

  const getMoodEntries = () => {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('mood_')) {
        const entry = JSON.parse(localStorage.getItem(key) || '{}');
        if (entry.date) {
          entries.push({
            date: new Date(entry.date),
            mood: entry.mood,
            note: entry.note
          });
        }
      }
    }
    return entries;
  };

  if (todayMoodLogged && !showSuccess) {
    const savedMood = JSON.parse(todayMoodLogged);
    const moodOption = moodOptions.find(m => m.id === savedMood.mood);
    
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Status */}
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Mood logged for today!</h2>
            <div className="text-3xl mb-2">{moodOption?.emoji}</div>
            <p className="text-gray-300 mb-3">You're feeling: {moodOption?.label}</p>
            {savedMood.note && (
              <div className="bg-gray-700 rounded-xl p-3 max-w-sm mx-auto">
                <p className="text-gray-200 italic text-sm">"{savedMood.note}"</p>
              </div>
            )}
            <p className="text-gray-400 text-xs mt-3">Come back tomorrow to log your mood again!</p>
          </div>
          
          {/* Mood Calendar */}
          <div>
            <MoodCalendar moodEntries={getMoodEntries()} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Track Your Mood</h2>
      
      {/* Compact Calendar */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-gray-400 text-sm p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className="aspect-square p-1">
              <button
                className={`w-full h-full rounded-lg flex items-center justify-center text-sm
                  ${i + 1 === new Date().getDate() 
                    ? 'bg-blue-600 text-gray-100' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                {i + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-lg flex flex-col items-center ${
                selectedMood?.label === mood.label
                  ? 'bg-blue-600 text-gray-100'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="text-2xl mb-2">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes Input */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add notes about your mood (optional)"
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none 
          text-gray-100 placeholder-gray-400 mb-4"
        rows={3}
      />

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSaveMood}
        disabled={isSaving}
        className="w-full py-3 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 
          transition-colors font-medium"
      >
        {isSaving ? 'Saving...' : 'Log Mood'}
      </motion.button>

      {/* Recent Moods - Compact View */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-100 mb-3">Recent</h3>
        <div className="flex flex-wrap gap-2">
          {getMoodEntries().slice(0, 5).map((entry) => (
            <div
              key={entry.timestamp}
              className="p-2 bg-gray-700 rounded-lg text-center"
            >
              <span className="text-xl block mb-1">{entry.mood.emoji}</span>
              <span className="text-xs text-gray-400 block">
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}