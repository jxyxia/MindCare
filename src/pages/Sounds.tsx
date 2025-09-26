import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Search, Filter } from 'lucide-react';
import { Sound } from '../types';
import AudioPlayer from '../components/AudioPlayer';

const sounds: Sound[] = [
  {
    id: '1',
    title: 'Ocean Waves',
    category: 'nature',
    url: 'https://open.spotify.com/track/1PZoHdDM71mzOFW1T6H03y?si=1d97c8e19d6b4eba',
    duration: 300,
    description: 'Gentle ocean waves for relaxation and focus',
  },
  {
    id: '2',
    title: 'Rain on Leaves',
    category: 'nature',
    url: 'https://www.soundjay.com/nature/sounds-rain-1.mp3',
    duration: 600,
    description: 'Soft rainfall sounds for deep relaxation',
  },
  {
    id: '3',
    title: 'Forest Birds',
    category: 'nature',
    url: 'https://www.soundjay.com/nature/sounds-birds-1.mp3',
    duration: 480,
    description: 'Peaceful bird songs from a serene forest',
  },
  {
    id: '4',
    title: 'White Noise',
    category: 'white-noise',
    url: 'https://www.soundjay.com/misc/sounds-white-noise-1.mp3',
    duration: 1800,
    description: 'Classic white noise for concentration',
  },
  {
    id: '5',
    title: 'Pink Noise',
    category: 'white-noise',
    url: 'https://www.soundjay.com/misc/sounds-pink-noise-1.mp3',
    duration: 1800,
    description: 'Balanced pink noise for better sleep',
  },
  {
    id: '6',
    title: 'Focus Binaural',
    category: 'binaural',
    url: 'https://www.soundjay.com/misc/sounds-binaural-1.mp3',
    duration: 900,
    description: '40Hz binaural beats for enhanced focus',
  },
  {
    id: '7',
    title: 'Relaxation Binaural',
    category: 'binaural',
    url: 'https://www.soundjay.com/misc/sounds-binaural-2.mp3',
    duration: 1200,
    description: '10Hz alpha waves for deep relaxation',
  },
  {
    id: '8',
    title: 'Guided Body Scan',
    category: 'meditation',
    url: 'https://www.soundjay.com/meditation/sounds-meditation-1.mp3',
    duration: 900,
    description: 'Gentle guided meditation for body awareness',
  },
];

const categoryIcons = {
  nature: '🌊',
  'white-noise': '⚪',
  binaural: '🧠',
  meditation: '🧘',
};

const categoryColors = {
  nature: 'bg-emerald-100 text-emerald-800',
  'white-noise': 'bg-slate-100 text-slate-800',
  binaural: 'bg-purple-100 text-purple-800',
  meditation: 'bg-blue-100 text-blue-800',
};

export default function Sounds() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);

  const categories = ['all', 'nature', 'white-noise', 'binaural', 'meditation'];

  const filteredSounds = sounds.filter(sound => {
    const matchesCategory = selectedCategory === 'all' || sound.category === selectedCategory;
    const matchesSearch = sound.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sound.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (soundId: string) => {
    setFavorites(prev =>
      prev.includes(soundId)
        ? prev.filter(id => id !== soundId)
        : [...prev, soundId]
    );
  };

  const handlePlaySound = (sound: Sound) => {
    setCurrentSound(currentSound?.id === sound.id ? null : sound);
  };

  const handleNextSound = () => {
    if (!currentSound) return;
    const currentIndex = filteredSounds.findIndex(s => s.id === currentSound.id);
    const nextIndex = (currentIndex + 1) % filteredSounds.length;
    setCurrentSound(filteredSounds[nextIndex]);
  };

  const handlePreviousSound = () => {
    if (!currentSound) return;
    const currentIndex = filteredSounds.findIndex(s => s.id === currentSound.id);
    const prevIndex = currentIndex === 0 ? filteredSounds.length - 1 : currentIndex - 1;
    setCurrentSound(filteredSounds[prevIndex]);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Soothing Sounds Library</h1>
          <p className="text-slate-600">
            Discover calming sounds to help you relax, focus, and sleep better
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search sounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="nature">Nature Sounds</option>
                <option value="white-noise">White Noise</option>
                <option value="binaural">Binaural Beats</option>
                <option value="meditation">Guided Meditation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current Playing */}
        {currentSound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer
              sound={currentSound}
              onNext={handleNextSound}
              onPrevious={handlePreviousSound}
            />
          </motion.div>
        )}

        {/* Sounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSounds.map((sound, index) => (
            <motion.div
              key={sound.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center text-2xl">
                      {categoryIcons[sound.category]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">{sound.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[sound.category]}`}>
                        {sound.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(sound.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(sound.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(sound.id) ? 'fill-current' : ''}
                    />
                  </button>
                </div>

                <p className="text-sm text-slate-600 mb-4">{sound.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {formatDuration(sound.duration)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlaySound(sound)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentSound?.id === sound.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {currentSound?.id === sound.id ? (
                      <>
                        <Pause size={16} />
                        <span>Playing</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Play</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSounds.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No sounds found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}