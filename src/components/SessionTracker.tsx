import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MessageSquare, Phone, Video, Star, CheckCircle, XCircle } from 'lucide-react';
import { TherapySession, Therapist } from '../types';

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
    description: 'Specialized in helping students manage academic stress and anxiety.',
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
    description: 'Experienced counselor focusing on personal development.',
    isOnline: false
  }
];

export default function SessionTracker() {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');

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

  const getFilteredSessions = () => {
    const now = new Date();
    switch (selectedTab) {
      case 'upcoming':
        return sessions.filter(session => 
          session.status === 'scheduled' && session.scheduledDate > now
        );
      case 'completed':
        return sessions.filter(session => 
          session.status === 'completed' || session.scheduledDate < now
        );
      default:
        return sessions;
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageSquare size={16} className="text-blue-600" />;
      case 'call': return <Phone size={16} className="text-emerald-600" />;
      case 'video': return <Video size={16} className="text-purple-600" />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-emerald-600" />;
      case 'cancelled': return <XCircle size={16} className="text-red-600" />;
      case 'scheduled': return <Clock size={16} className="text-blue-600" />;
      default: return null;
    }
  };

  const filteredSessions = getFilteredSessions();

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Session History</h2>
      
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className="px-4 py-2 text-gray-100 border-b-2 border-blue-500"
        >
          Upcoming
        </button>
        <button
          className="px-4 py-2 text-gray-400 hover:text-gray-100"
        >
          Completed
        </button>
        <button
          className="px-4 py-2 text-gray-400 hover:text-gray-100"
        >
          All
        </button>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">No sessions found</h3>
          <p className="text-gray-400">
            {selectedTab === 'upcoming' 
              ? "You don't have any upcoming sessions scheduled."
              : selectedTab === 'completed'
              ? "You haven't completed any sessions yet."
              : "You haven't booked any sessions yet."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session, index) => {
            const therapist = mockTherapists.find(t => t.id === session.therapistId);
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-800">{therapist?.name}</h4>
                        {getStatusIcon(session.status)}
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{therapist?.title}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{session.scheduledDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{session.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getSessionIcon(session.type)}
                          <span className="capitalize">{session.type}</span>
                        </div>
                      </div>
                      
                      {session.notes && (
                        <p className="text-slate-600 text-sm mt-2 italic">"{session.notes}"</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {session.cost && (
                      <p className="font-medium text-slate-800">₹{session.cost}</p>
                    )}
                    <p className={`text-sm capitalize ${
                      session.status === 'completed' ? 'text-emerald-600' :
                      session.status === 'cancelled' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {session.status}
                    </p>
                    
                    {session.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600">{session.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}