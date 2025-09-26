import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

interface BreathingGameProps {
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

const phaseConfig = {
  inhale: { duration: 4, instruction: 'Breathe In', color: 'from-blue-400 to-blue-600' },
  hold: { duration: 7, instruction: 'Hold', color: 'from-purple-400 to-purple-600' },
  exhale: { duration: 8, instruction: 'Breathe Out', color: 'from-emerald-400 to-emerald-600' },
  pause: { duration: 1, instruction: 'Pause', color: 'from-slate-400 to-slate-600' }
};

export default function BreathingGame({ onClose }: BreathingGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      // Move to next phase
      const phases: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'pause'];
      const currentIndex = phases.indexOf(currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length;
      const nextPhase = phases[nextIndex];
      
      setCurrentPhase(nextPhase);
      setTimeLeft(phaseConfig[nextPhase].duration);
      
      // Increment cycle count when completing exhale phase
      if (currentPhase === 'exhale') {
        setCycleCount(prev => {
          const newCount = prev + 1;
          if (newCount >= totalCycles) {
            setIsPlaying(false);
            return newCount;
          }
          return newCount;
        });
      }
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentPhase, cycleCount, totalCycles]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPhase('inhale');
    setTimeLeft(4);
    setCycleCount(0);
  };

  const getCircleScale = () => {
    switch (currentPhase) {
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 0.8;
      case 'pause':
        return 0.8;
      default:
        return 1;
    }
  };

  const isComplete = cycleCount >= totalCycles && !isPlaying;

  return (
    <div className="text-center space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-800">4-7-8 Breathing Exercise</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-slate-600" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Inhale for 4 seconds</p>
          <p>• Hold your breath for 7 seconds</p>
          <p>• Exhale for 8 seconds</p>
          <p>• Brief pause, then repeat</p>
        </div>
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">Great job!</h3>
            <p className="text-emerald-700">You've completed {totalCycles} breathing cycles. How do you feel?</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breathing Circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          
          {/* Animated breathing circle */}
          <motion.div
            animate={{
              scale: getCircleScale(),
            }}
            transition={{
              duration: phaseConfig[currentPhase].duration,
              ease: currentPhase === 'inhale' ? 'easeIn' : currentPhase === 'exhale' ? 'easeOut' : 'linear'
            }}
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${phaseConfig[currentPhase].color} shadow-lg flex items-center justify-center`}
          >
            <div className="text-white font-semibold text-lg">
              {timeLeft}
            </div>
          </motion.div>
          
          {/* Phase indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-lg font-semibold text-slate-700">
              {phaseConfig[currentPhase].instruction}
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-600">Progress</span>
          <span className="text-sm font-medium text-slate-700">
            {cycleCount} / {totalCycles} cycles
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(cycleCount / totalCycles) * 100}%` }}
            className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Cycle Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Number of cycles:
        </label>
        <div className="flex justify-center space-x-2">
          {[2, 4, 6, 8].map((cycles) => (
            <button
              key={cycles}
              onClick={() => setTotalCycles(cycles)}
              disabled={isPlaying}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                totalCycles === cycles
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {cycles}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isPlaying ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={isComplete}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={20} />
            <span>{cycleCount === 0 ? 'Start' : 'Resume'}</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePause}
            className="flex items-center space-x-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            <Pause size={20} />
            <span>Pause</span>
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="flex items-center space-x-2 px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </motion.button>
      </div>

      {/* Tips */}
      <div className="bg-slate-50 rounded-xl p-4 text-left">
        <h4 className="font-semibold text-slate-800 mb-2">💡 Tips for best results:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Find a comfortable, quiet place to sit</li>
          <li>• Keep your back straight and shoulders relaxed</li>
          <li>• Focus on the rhythm rather than perfect timing</li>
          <li>• If you feel dizzy, take a break and breathe normally</li>
        </ul>
      </div>
    </div>
  );
}