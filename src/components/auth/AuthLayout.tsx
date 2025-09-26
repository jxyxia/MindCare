import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Brain } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const features = [
    {
      icon: Heart,
      title: 'Mental Wellness',
      description: 'Track your mood and build healthy habits',
    },
    {
      icon: Brain,
      title: 'Mindfulness Games',
      description: 'Interactive activities for stress relief',
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with a caring community',
    },
    {
      icon: Shield,
      title: 'Crisis Support',
      description: '24/7 emergency mental health resources',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50">
      <div className="flex min-h-screen">
        {/* Left Panel - Branding & Features (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500" />
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-bold">MindCare</h1>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Your Mental Wellness Journey Starts Here
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of students who are prioritizing their mental health 
                with our comprehensive support platform.
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-blue-100 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-blue-100 text-sm">
                "MindCare has been a game-changer for my mental health during college. 
                The community support and resources are incredible."
              </p>
              <p className="text-white font-medium mt-2">- Sarah K., University Student</p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-300/20 rounded-full blur-lg" />
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-300/20 rounded-full blur-md" />
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={20} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">MindCare</h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
                <p className="text-slate-600">{subtitle}</p>
              </div>

              {children}
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8 text-sm text-slate-500"
            >
              <p>
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}