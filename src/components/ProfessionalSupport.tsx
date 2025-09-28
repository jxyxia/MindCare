import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar, 
  Star, 
  Clock, 
  MapPin,
  CheckCircle,
  X,
  User,
  Award,
  Globe
} from 'lucide-react';
import { Therapist, TherapySession } from '../types';
import { useApp } from '../contexts/AppContext';

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
    description: 'Specialized in helping students manage academic stress and anxiety. 8+ years of experience in campus counseling.',
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
    description: 'Experienced counselor focusing on personal development and relationship counseling for students.',
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
    description: 'Trauma-informed therapist with expertise in mindfulness-based interventions.',
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
    description: 'Cognitive Behavioral Therapy specialist available for online sessions.',
    isOnline: true
  }
];

export default function ProfessionalSupport() {
  const { state } = useApp();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [selectedType, setSelectedType] = useState<'campus' | 'partner' | 'online' | 'all'>('all');
  const [bookingData, setBookingData] = useState({
    type: 'chat' as 'chat' | 'call' | 'video',
    date: '',
    time: '',
    notes: ''
  });

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

  const filteredTherapists = mockTherapists.filter(therapist => 
    selectedType === 'all' || therapist.type === selectedType
  );

  const handleBookSession = () => {
    if (!selectedTherapist || !bookingData.date || !bookingData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newSession: TherapySession = {
      id: Date.now().toString(),
      therapistId: selectedTherapist.id,
      studentId: state.user?.id || 'demo-user',
      type: bookingData.type,
      status: 'scheduled',
      scheduledDate: new Date(`${bookingData.date} ${bookingData.time}`),
      duration: 60,
      notes: bookingData.notes,
      cost: selectedTherapist.pricing?.[bookingData.type]
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem('therapy_sessions', JSON.stringify(updatedSessions));

    // Reset form
    setBookingData({
      type: 'chat',
      date: '',
      time: '',
      notes: ''
    });
    setShowBookingModal(false);
    setSelectedTherapist(null);
  };

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
  ).slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Professional Support</h2>
      
      {/* Available Professionals */}
      <div className="space-y-4">
        {mockTherapists.map((professional) => (
          <div
            key={professional.id}
            className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg border border-gray-600"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-100">{professional.name}</h3>
              <p className="text-sm text-gray-400">{professional.title}</p>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-yellow-400 text-xs">
                  <Star size={12} className="fill-yellow-400" />
                  <span>{professional.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400 text-xs">
                  <Award size={12} />
                  <span>{professional.experience}+ years</span>
                </div>
                <div className={`flex items-center space-x-1 ${professional.isOnline ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${professional.isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  <span className="text-xs">{professional.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {professional.contactMethods.chat && (
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare size={12} className="text-blue-600" />
                </div>
              )}
              {professional.contactMethods.call && (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone size={12} className="text-emerald-600" />
                </div>
              )}
              {professional.contactMethods.video && (
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video size={12} className="text-purple-600" />
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTherapist(professional);
                  setShowBookingModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Connect
              </motion.button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedTherapist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Book Session</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{selectedTherapist.name}</p>
                    <p className="text-slate-600 text-sm">{selectedTherapist.title}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{selectedTherapist.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Session Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['chat', 'call', 'video'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setBookingData({...bookingData, type})}
                        disabled={!selectedTherapist.contactMethods[type]}
                        className={`p-3 rounded-lg border-2 transition-colors text-center ${
                          bookingData.type === type
                            ? 'border-blue-500 bg-blue-50'
                            : selectedTherapist.contactMethods[type]
                            ? 'border-slate-200 hover:border-slate-300'
                            : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {type === 'chat' && <MessageSquare size={20} className="mx-auto mb-1" />}
                        {type === 'call' && <Phone size={20} className="mx-auto mb-1" />}
                        {type === 'video' && <Video size={20} className="mx-auto mb-1" />}
                        <p className="text-sm font-medium capitalize">{type}</p>
                        {selectedTherapist.pricing && (
                          <p className="text-xs text-slate-500">₹{selectedTherapist.pricing[type]}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {selectedTherapist.availability.timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookSession}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Book Session
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}