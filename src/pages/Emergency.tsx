import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Clock, AlertTriangle, Heart, Shield, Users } from 'lucide-react';
import { EmergencyContact } from '../types';

const emergencyContacts: EmergencyContact[] = [
  // National Emergency Services
  {
    id: '1',
    name: 'Emergency Medical Services',
    number: '108',
    type: 'emergency',
    description: 'Ambulance and emergency medical assistance',
    available24h: true,
  },
  {
    id: '2',
    name: 'Police Emergency',
    number: '100',
    type: 'emergency',
    description: 'Police emergency services',
    available24h: true,
  },
  {
    id: '3',
    name: 'Fire Emergency',
    number: '101',
    type: 'emergency',
    description: 'Fire emergency services',
    available24h: true,
  },
  // Mental Health Crisis Lines
  {
    id: '4',
    name: 'National Suicide Prevention Helpline',
    number: '9152987821',
    type: 'crisis',
    description: 'Immediate crisis support and suicide prevention',
    available24h: true,
  },
  {
    id: '5',
    name: 'KIRAN Mental Health Helpline',
    number: '1800-599-0019',
    type: 'crisis',
    description: '24/7 mental health support and counseling',
    available24h: true,
  },
  {
    id: '6',
    name: 'Vandrevala Foundation',
    number: '9999666555',
    type: 'crisis',
    description: 'Free counseling and crisis support',
    available24h: true,
  },
  {
    id: '7',
    name: 'COOJ Mental Health Foundation',
    number: '8376904102',
    type: 'crisis',
    description: 'Mental health support and counseling',
    available24h: true,
  },
  // Campus Support
  {
    id: '8',
    name: 'Campus Counseling Center',
    number: '(555) 123-HELP',
    type: 'campus',
    description: 'University counseling and mental health services',
    available24h: false,
  },
  {
    id: '9',
    name: 'Campus Security',
    number: '(555) 123-SAFE',
    type: 'campus',
    description: 'Campus security emergency line',
    available24h: true,
  },
  {
    id: '10',
    name: 'Student Affairs Emergency',
    number: '(555) 123-STUD',
    type: 'campus',
    description: 'Student emergency support and resources',
    available24h: true,
  },
];

const quickActions = [
  {
    id: 'sos',
    title: 'Emergency SOS',
    description: 'Immediately alert emergency contacts',
    icon: AlertTriangle,
    color: 'bg-red-500 hover:bg-red-600',
    textColor: 'text-white',
  },
  {
    id: 'crisis-chat',
    title: 'Crisis Chat',
    description: 'Chat with trained crisis counselors',
    icon: MessageSquare,
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white',
  },
  {
    id: 'find-help',
    title: 'Find Nearby Help',
    description: 'Locate mental health services near you',
    icon: MapPin,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    textColor: 'text-white',
  },
  {
    id: 'safety-plan',
    title: 'My Safety Plan',
    description: 'Access your personalized safety plan',
    icon: Shield,
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-white',
  },
];

const copingStrategies = [
  {
    title: 'Breathing Exercise',
    description: 'Try the 4-7-8 breathing technique',
    steps: ['Inhale for 4 counts', 'Hold for 7 counts', 'Exhale for 8 counts', 'Repeat 4 times'],
  },
  {
    title: '5-4-3-2-1 Grounding',
    description: 'Ground yourself using your senses',
    steps: ['5 things you can see', '4 things you can touch', '3 things you can hear', '2 things you can smell', '1 thing you can taste'],
  },
  {
    title: 'Safe Space Visualization',
    description: 'Imagine your safe, comfortable place',
    steps: ['Close your eyes', 'Picture a safe place', 'Focus on details', 'Stay here for 5 minutes'],
  },
];

const typeColors = {
  emergency: 'bg-red-900 text-red-100 border-red-800',
  crisis: 'bg-orange-900 text-orange-100 border-orange-800',
  campus: 'bg-blue-900 text-blue-100 border-blue-800',
  support: 'bg-emerald-900 text-emerald-100 border-emerald-800',
};

export default function Emergency() {
  const [selectedTab, setSelectedTab] = useState<'contacts' | 'actions' | 'coping'>('contacts');
  const [showCopingStrategy, setShowCopingStrategy] = useState<number | null>(null);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const contactsByType = {
    emergency: emergencyContacts.filter(c => c.type === 'emergency'),
    crisis: emergencyContacts.filter(c => c.type === 'crisis'),
    campus: emergencyContacts.filter(c => c.type === 'campus'),
    support: emergencyContacts.filter(c => c.type === 'support'),
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="text-red-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-100">Emergency Support</h1>
          </div>
          <p className="text-gray-400">
            If you're experiencing a mental health crisis, you're not alone. Help is available 24/7.
            Don't hesitate to reach out for immediate support.
          </p>
        </motion.div>

        {/* Crisis Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-red-500 text-white rounded-xl p-6 text-center"
        >
          <AlertTriangle size={32} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">In Immediate Danger?</h2>
          <p className="mb-4">If you're having thoughts of harming yourself or others, please call emergency services immediately.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCall('108')}
              className="px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Call 108 - Emergency Medical
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCall('9152987821')}
              className="px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Call Suicide Prevention Helpline
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
            {[
              { key: 'contacts', label: 'Emergency Contacts', icon: Phone },
              { key: 'actions', label: 'Quick Actions', icon: Heart },
              { key: 'coping', label: 'Coping Strategies', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                    selectedTab === tab.key
                      ? 'bg-red-500 text-white'
                      : 'text-gray-100 hover:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'contacts' && (
          <div className="space-y-8">
            {Object.entries(contactsByType).map(([type, contacts]) => {
              if (contacts.length === 0) return null;
              
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-100 mb-4 capitalize">
                    {type === 'crisis' ? 'Mental Health Crisis Lines' :
                     type === 'emergency' ? 'Emergency Services' :
                     type === 'campus' ? 'Campus Support' : 'Support Services'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 rounded-lg border-2 ${typeColors[contact.type]}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 text-gray-100">{contact.name}</h4>
                            <p className="text-sm text-gray-400">{contact.description}</p>
                          </div>
                          {contact.available24h && (
                            <div className="flex items-center space-x-1 text-xs font-medium text-gray-300">
                              <Clock size={12} />
                              <span>24/7</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-lg font-semibold text-gray-100">{contact.number}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCall(contact.number)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <Phone size={16} className="text-gray-100" />
                            <span className="text-gray-100">Call</span>
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {selectedTab === 'actions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-xl ${action.color} ${action.textColor} text-left hover:scale-105 transition-all duration-200`}
                >
                  <Icon size={48} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="opacity-90">{action.description}</p>
                </motion.button>
              );
            })}
          </div>
        )}

        {selectedTab === 'coping' && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Immediate Coping Strategies</h3>
              <p className="text-blue-700">
                These techniques can help you feel more grounded and calm during difficult moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copingStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">{strategy.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{strategy.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCopingStrategy(showCopingStrategy === index ? null : index)}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    {showCopingStrategy === index ? 'Hide Steps' : 'Show Steps'}
                  </motion.button>
                  
                  {showCopingStrategy === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-2"
                    >
                      {strategy.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {stepIndex + 1}
                          </div>
                          <p className="text-blue-800 text-sm">{step}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}