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
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Status */}
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Mood logged for today!</h2>
            <div className="text-3xl mb-2">{moodOption?.emoji}</div>
            <p className="text-slate-600 mb-3">You're feeling: {moodOption?.label}</p>
            {savedMood.note && (
              <div className="bg-slate-50 rounded-xl p-3 max-w-sm mx-auto">
                <p className="text-slate-700 italic text-sm">"{savedMood.note}"</p>
              </div>
            )}
            <p className="text-slate-500 text-xs mt-3">Come back tomorrow to log your mood again!</p>
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
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Mood saved!</h3>
          <p className="text-slate-600">Thank you for checking in with yourself today.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Selection */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">How are you feeling today?</h2>
              <p className="text-slate-600 text-sm">Take a moment to check in with yourself</p>
            </div>

            {/* Compact Mood Grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {moodOptions.map((mood) => {
                const isSelected = selectedMood === mood.id;
                
                return (
                  <motion.button
                    key={mood.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`
                      p-2 rounded-xl border-2 transition-all duration-200 text-center
                      ${isSelected 
                        ? 'border-blue-300 bg-blue-50 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="text-xl mb-1">{mood.emoji}</div>
                    <div className={`text-xs font-medium ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                      {mood.label}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Expanded Note Section */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    What's on your mind? (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Share what's contributing to how you're feeling..."
                    className="w-full p-2 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveMood}
                    disabled={isSaving}
                    className="bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
                  >
                    {isSaving ? 'Saving...' : 'Save My Mood'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mood Calendar */}
          <div>
            <MoodCalendar moodEntries={getMoodEntries()} />
          </div>
        </div>
      )}
    </div>
  );
}