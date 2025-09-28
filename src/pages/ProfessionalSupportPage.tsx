import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar, 
  Star, 
  Clock, 
  MapPin,
  Filter,
  Search,
  Award,
  Globe,
  User,
  Heart,
  Shield
} from 'lucide-react';
import { Therapist, TherapySession } from '../types';
import { useApp } from '../contexts/AppContext';
import SessionTracker from '../components/SessionTracker';

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Clinical Psychologist',
    specialization: ['Anxiety', 'Depression', 'Academic Stress'],
    type: 'campus',
    rating: 4.9,
    experience: 8,
    languages: ['English', 'Hindi'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    },
    contactMethods: {
      chat: true,
      call: true,
      video: true
    },
    description: 'Specialized in helping students manage academic stress and anxiety. 8+ years of experience in campus counseling with a focus on cognitive behavioral therapy and mindfulness techniques.',
    isOnline: true
  },
  {
    id: '2',
    name: 'Dr. Rajesh Sharma',
    title: 'Counseling Psychologist',
    specialization: ['Relationship Issues', 'Self-esteem', 'Career Guidance'],
    type: 'campus',
    rating: 4.8,
    experience: 12,
    languages: ['English', 'Hindi', 'Marathi'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['10:00 AM', '1:00 PM', '3:00 PM']
    },
    contactMethods: {
      chat: true,
      call: true,
      video: false
    },
    description: 'Experienced counselor focusing on personal development and relationship counseling for students. Specializes in building self-confidence and career guidance.',
    isOnline: false
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    title: 'Licensed Therapist',
    specialization: ['Trauma', 'PTSD', 'Mindfulness'],
    type: 'partner',
    rating: 4.9,
    experience: 10,
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      timeSlots: ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM']
    },
    contactMethods: {
      chat: true,
      call: true,
      video: true
    },
    pricing: {
      chat: 500,
      call: 800,
      video: 1000
    },
    description: 'Trauma-informed therapist with expertise in mindfulness-based interventions. Helps students process difficult experiences and develop healthy coping mechanisms.',
    isOnline: true
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    title: 'Behavioral Therapist',
    specialization: ['CBT', 'Addiction', 'Behavioral Issues'],
    type: 'online',
    rating: 4.7,
    experience: 6,
    languages: ['English'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM']
    },
    contactMethods: {
      chat: true,
      call: true,
      video: true
    },
    pricing: {
      chat: 400,
      call: 700,
      video: 900
    },
    description: 'Cognitive Behavioral Therapy specialist available for online sessions. Focuses on helping students develop practical strategies for managing thoughts and behaviors.',
    isOnline: true
  },
  {
    id: '5',
    name: 'Dr. Anita Verma',
    title: 'Student Counselor',
    specialization: ['Academic Pressure', 'Time Management', 'Study Skills'],
    type: 'campus',
    rating: 4.6,
    experience: 5,
    languages: ['English', 'Hindi'],
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    },
    contactMethods: {
      chat: true,
      call: true,
      video: true
    },
    description: 'Dedicated student counselor specializing in academic success and stress management. Helps students develop effective study strategies and manage academic pressure.',
    isOnline: true
  },
  {
    id: '6',
    name: 'Dr. Ravi Kumar',
    title: 'Psychiatrist',
    specialization: ['Depression', 'Anxiety Disorders', 'Medication Management'],
    type: 'partner',
    rating: 4.8,
    experience: 15,
    languages: ['English', 'Hindi', 'Tamil'],
    availability: {
      days: ['Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['10:00 AM', '2:00 PM', '4:00 PM']
    },
    contactMethods: {
      chat: false,
      call: true,
      video: true
    },
    pricing: {
      chat: 0,
      call: 1200,
      video: 1500
    },
    description: 'Board-certified psychiatrist with extensive experience in treating mood disorders. Provides comprehensive mental health evaluations and medication management.',
    isOnline: true
  }
];

const typeColors = {
  campus: 'bg-blue-900 text-blue-100',
  partner: 'bg-emerald-900 text-emerald-100',
  online: 'bg-purple-900 text-purple-100',
};

export default function ProfessionalSupportPage() {
  const { state } = useApp();
  const [selectedType, setSelectedType] = useState<'campus' | 'partner' | 'online' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sessions, setSessions] = useState<TherapySession[]>([]);

  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem('therapy_sessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        scheduledDate: new Date(session.scheduledDate)
      }));
      setSessions(parsedSessions);
    }
  }, []);

  const specializations = [
    'all',
    'Anxiety',
    'Depression', 
    'Academic Stress',
    'Relationship Issues',
    'Self-esteem',
    'Career Guidance',
    'Trauma',
    'PTSD',
    'Mindfulness',
    'CBT',
    'Addiction',
    'Behavioral Issues'
  ];

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesType = selectedType === 'all' || therapist.type === selectedType;
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 therapist.specialization.includes(selectedSpecialization);
    return matchesType && matchesSearch && matchesSpecialization;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campus': return <MapPin size={16} className="text-blue-600" />;
      case 'partner': return <Users size={16} className="text-emerald-600" />;
      case 'online': return <Globe size={16} className="text-purple-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'campus': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-emerald-100 text-emerald-800';
      case 'online': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const upcomingSessions = sessions.filter(session => 
    session.status === 'scheduled' && session.scheduledDate > new Date()
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
              <Heart className="text-blue-100" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-100">Professional Support</h1>
          </div>
          <p className="text-gray-400">
            Connect with qualified therapists, counselors, and mental health professionals. 
            Get the support you need through chat, call, or video sessions.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                <Users className="text-blue-100" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-100">{mockTherapists.length}</p>
                <p className="text-sm text-gray-400">Available Therapists</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-100">{sessions.length}</p>
                <p className="text-sm text-gray-400">Total Sessions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-100">{upcomingSessions.length}</p>
                <p className="text-sm text-gray-400">Upcoming Sessions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-100">24/7</p>
                <p className="text-sm text-gray-400">Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search therapists by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                >
                  <option value="all">All Types</option>
                  <option value="campus">Campus Counselors</option>
                  <option value="partner">Partner Therapists</option>
                  <option value="online">Online Specialists</option>
                </select>
              </div>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
              >
                <option value="all">All Specializations</option>
                {specializations.slice(1).map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Therapists List */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTherapists.map((therapist, index) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-100">{therapist.name}</h3>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(therapist.type)}`}>
                          {getTypeIcon(therapist.type)}
                          <span className="capitalize">{therapist.type}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-2">{therapist.title}</p>
                      
                      <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span>{therapist.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award size={12} />
                          <span>{therapist.experience}+ years</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${therapist.isOnline ? 'text-emerald-600' : 'text-slate-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${therapist.isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{therapist.isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{therapist.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {therapist.specialization.map(spec => (
                      <span key={spec} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {therapist.contactMethods.chat && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare size={14} className="text-blue-600" />
                        </div>
                      )}
                      {therapist.contactMethods.call && (
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Phone size={14} className="text-emerald-600" />
                        </div>
                      )}
                      {therapist.contactMethods.video && (
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Video size={14} className="text-purple-600" />
                        </div>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Book Session
                    </motion.button>
                  </div>
                  
                  {therapist.pricing && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-xs text-gray-400 mb-2">Session Pricing:</p>
                      <div className="flex justify-between text-xs text-gray-300">
                        {therapist.contactMethods.chat && <span>Chat: ₹{therapist.pricing.chat}</span>}
                        {therapist.contactMethods.call && <span>Call: ₹{therapist.pricing.call}</span>}
                        {therapist.contactMethods.video && <span>Video: ₹{therapist.pricing.video}</span>}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredTherapists.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">No therapists found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Session Tracker Sidebar */}
          <div className="xl:col-span-1">
            <SessionTracker />
          </div>
        </div>
      </div>
    </div>
  );
}