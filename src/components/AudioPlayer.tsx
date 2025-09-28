import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock } from 'lucide-react';
import { Sound } from '../types';
import { useApp } from '../contexts/AppContext';

interface AudioPlayerProps {
  sound: Sound;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function AudioPlayer({ sound, onNext, onPrevious }: AudioPlayerProps) {
  const { dispatch } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set CORS mode for local files
    audio.crossOrigin = 'anonymous';

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedData = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (onNext) onNext();
    };
    const handleError = (e: Event) => {
      console.error('Audio loading error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (showTimer && timer > 0 && isPlaying) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            handlePause();
            setShowTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [showTimer, timer, isPlaying]);

  const handlePlay = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            dispatch({ type: 'SET_CURRENT_SOUND', payload: sound });
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSetTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setShowTimer(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <audio ref={audioRef} src={sound.url} />
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
          <Volume2 className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{sound.title}</h3>
          <p className="text-sm text-slate-500">{sound.description}</p>
        </div>
        <button
          onClick={() => setShowTimer(!showTimer)}
          className={`p-2 rounded-lg transition-colors ${
            showTimer ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <Clock size={20} />
        </button>
      </div>

      {showTimer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-blue-50 rounded-lg"
        >
          <p className="text-sm font-medium text-blue-800 mb-3">Sleep Timer</p>
          <div className="flex space-x-2 mb-3">
            {[15, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => handleSetTimer(minutes)}
                className="px-3 py-2 text-sm bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {minutes}m
              </button>
            ))}
          </div>
          {timer > 0 && (
            <p className="text-sm text-blue-600">
              Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </p>
          )}
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <SkipBack size={20} />
            </button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? handlePause : handlePlay}
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 size={16} className="text-slate-500" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
}