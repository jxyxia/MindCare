import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, CheckSquare, Bookmark, Star, Search, Filter, Clock } from 'lucide-react';
import { Resource } from '../types';

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    type: 'article',
    category: 'Anxiety Management',
    content: 'Learn about the causes, symptoms, and effective strategies for managing anxiety...',
    readTime: 8,
    bookmarked: true,
    rating: 4.8,
    tags: ['anxiety', 'coping-strategies', 'mental-health'],
  },
  {
    id: '2',
    title: 'Stress Management Techniques for Students',
    type: 'video',
    category: 'Academic Success',
    content: 'Expert psychologist shares proven techniques to manage academic stress...',
    readTime: 12,
    bookmarked: false,
    rating: 4.9,
    tags: ['stress', 'academic', 'techniques'],
  },
  {
    id: '3',
    title: 'Sleep Hygiene Assessment',
    type: 'assessment',
    category: 'Sleep Health',
    content: 'Evaluate your sleep habits and get personalized recommendations...',
    readTime: 5,
    bookmarked: false,
    rating: 4.7,
    tags: ['sleep', 'assessment', 'health'],
  },
  {
    id: '4',
    title: 'Building Resilience in College',
    type: 'guide',
    category: 'Personal Development',
    content: 'Step-by-step guide to develop emotional resilience during college years...',
    readTime: 15,
    bookmarked: true,
    rating: 4.6,
    tags: ['resilience', 'college', 'personal-growth'],
  },
  {
    id: '5',
    title: 'Depression Awareness and Support',
    type: 'article',
    category: 'Mental Health Awareness',
    content: 'Understanding depression signs and finding appropriate support...',
    readTime: 10,
    bookmarked: false,
    rating: 4.8,
    tags: ['depression', 'awareness', 'support'],
  },
  {
    id: '6',
    title: 'Mindfulness for Beginners',
    type: 'video',
    category: 'Mindfulness',
    content: 'Introduction to mindfulness practices for everyday life...',
    readTime: 20,
    bookmarked: false,
    rating: 4.9,
    tags: ['mindfulness', 'meditation', 'beginner'],
  },
];

const typeIcons = {
  article: BookOpen,
  video: Video,
  guide: FileText,
  assessment: CheckSquare,
};

const typeColors = {
  article: 'bg-blue-900 text-blue-100',
  video: 'bg-red-900 text-red-100',
  guide: 'bg-emerald-900 text-emerald-100',
  assessment: 'bg-purple-900 text-purple-100',
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarked, setShowBookmarked] = useState(false);

  const types = ['all', 'article', 'video', 'guide', 'assessment'];
  const categories = [
    'all',
    'Anxiety Management',
    'Academic Success',
    'Sleep Health',
    'Personal Development',
    'Mental Health Awareness',
    'Mindfulness',
  ];

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBookmark = !showBookmarked || resource.bookmarked;
    return matchesType && matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Mental Health Resources</h1>
          <p className="text-gray-400">
            Explore our comprehensive library of articles, videos, guides, and assessments
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-slate-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                >
                  <option value="all">All Types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="guide">Guides</option>
                  <option value="assessment">Assessments</option>
                </select>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBookmarked}
                  onChange={(e) => setShowBookmarked(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-600">Bookmarked only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const Icon = typeIcons[resource.type];
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-purple-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[resource.type]}`}>
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    {resource.bookmarked && (
                      <Bookmark className="text-purple-500 fill-current" size={20} />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{resource.content}</p>
                  
                  <div className="text-xs text-purple-600 font-medium mb-4">{resource.category}</div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{resource.readTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                    >
                      {resource.type === 'video' ? 'Watch' : 
                       resource.type === 'assessment' ? 'Take Assessment' : 'Read'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No resources found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Anxiety', icon: '😰', count: 12 },
              { name: 'Depression', icon: '💙', count: 8 },
              { name: 'Stress', icon: '😤', count: 15 },
              { name: 'Sleep', icon: '😴', count: 6 },
              { name: 'Study Tips', icon: '📖', count: 10 },
              { name: 'Relationships', icon: '💝', count: 7 },
            ].map((category) => (
              <button
                key={category.name}
                className="p-4 rounded-lg border border-slate-200 hover:bg-purple-50 hover:border-purple-200 transition-colors text-center"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-slate-800 text-sm">{category.name}</div>
                <div className="text-xs text-slate-500">{category.count} resources</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}