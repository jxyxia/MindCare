import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Download, Trash2, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AISupport() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Response categories
  const responses = {
    greeting: [
      "Hello! I'm your AI support assistant. I'm here to listen and help with any mental health concerns you might have. What's on your mind today? 😊",
      "Hi there! Welcome to your 24/7 support space. Whether you're feeling stressed, anxious, or just need someone to talk to, I'm here for you. How are you feeling right now?",
      "Hey! Great to see you here. I'm your mental wellness companion, ready to support you anytime. What would you like to talk about today?"
    ],
    stress: [
      "I understand you're feeling stressed right now, and that's completely valid. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, exhale for 6. Would you like me to guide you through this? 🫁",
      "Anxiety can feel overwhelming, but you're not alone. Here's a grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment. ✨",
      "Stress is your body's way of responding to challenges. Let's break this down - what specific situation is causing you stress? Sometimes talking through it helps clarify what we can control. 💭"
    ],
    academic: [
      "Academic pressure is so common among students - you're definitely not alone in feeling this way. Let's focus on what you can control: breaking tasks into smaller steps, taking regular breaks, and being kind to yourself. What specific academic challenge are you facing? 📚",
      "Exams can be stressful! Here's a quick study break technique: For every 25 minutes of studying, take a 5-minute break. During breaks, try stretching or deep breathing. Remember, your worth isn't defined by your grades. 🌟",
      "Feeling overwhelmed by assignments? Try the 'one thing at a time' approach. Choose the most urgent task, work on it for 30 minutes, then reassess. Would you like some tips on time management? ⏰"
    ],
    sleep: [
      "Sleep troubles are really common among students. Here are some gentle tips: Try the 4-7-8 breathing technique before bed, avoid screens 1 hour before sleep, and create a calming bedtime routine. What time do you usually try to go to bed? 🌙",
      "Having trouble sleeping can be frustrating. Consider trying our sleep stories in the Sounds section, or try progressive muscle relaxation. Start by tensing and releasing muscle groups from your toes to your head. Sweet dreams! 😴",
      "Sleep issues often relate to stress or racing thoughts. Try writing down 3 things you're grateful for and 3 concerns for tomorrow (to 'park' your worries). This can help your mind settle. Would you like more bedtime relaxation tips? 🛏️"
    ],
    loneliness: [
      "Feeling lonely is one of the most human experiences, especially as a student. You're brave for reaching out. Have you considered joining our Community section? Many students find connection through our study groups and peer support circles. 🤗",
      "Social connections are so important for mental health. Even small interactions matter - maybe try saying hi to a classmate, joining a campus activity, or reaching out to family. What social situation feels most challenging for you? 👥",
      "Homesickness and loneliness are incredibly common among students. It shows you have meaningful relationships back home. Try scheduling regular video calls with loved ones, and gradually build new connections where you are now. 🏠💕"
    ],
    crisis: [
      "I'm really glad you reached out, and I want you to know that you matter. These feelings can be overwhelming, but you don't have to face them alone. Please consider reaching out to a crisis counselor immediately. You can find emergency contacts in our Emergency section, or call the National Suicide Prevention Helpline: 9152987821. 🆘",
      "What you're feeling right now is temporary, even though it might not feel that way. Your life has value, and there are people who want to help. Please reach out to a professional immediately - check our Emergency tab for crisis resources. You deserve support and care. 💜",
      "I'm concerned about you and want to make sure you get proper help. Please contact a crisis counselor right away through our Emergency section, or call KIRAN Mental Health Helpline: 1800-599-0019. You're not alone in this. 🤲"
    ],
    mentalHealth: [
      "Thank you for sharing that with me. Mental health struggles are more common than you might think, and seeking support shows real strength. Have you considered speaking with a campus counselor? In the meantime, small daily activities like going for a walk or practicing gratitude can help. 🌱",
      "It's okay to not be okay sometimes. Depression can make everything feel harder, but treatment and support can really help. Our Resources section has articles about coping strategies, and our Community has peer support groups. What feels most challenging right now? 🫂",
      "Mental health is just as important as physical health. If you're considering therapy, that's a wonderful step. Many students find campus counseling services helpful and affordable. Would you like some tips on preparing for your first therapy session? 💚"
    ],
    motivation: [
      "Motivation can be tricky - it often comes after we start, not before. Try the '2-minute rule': commit to doing something for just 2 minutes. Often, starting is the hardest part. What's one small thing you could do right now? ⚡",
      "Self-care isn't selfish - it's essential! It can be as simple as taking a shower, having a healthy meal, or spending 10 minutes outside. What's one kind thing you could do for yourself today? 🌸",
      "Procrastination often comes from feeling overwhelmed or perfectionist tendencies. Try breaking tasks into tiny steps and celebrating small wins. Remember: progress over perfection. What task has been on your mind? 🎯"
    ],
    focus: [
      "Concentration issues are super common, especially with so many distractions around. Try the Pomodoro Technique: 25 minutes focused work, 5-minute break. Also, check if you're getting enough sleep, water, and movement. What environment helps you focus best? 🎯",
      "Distractions are everywhere! Try creating a dedicated study space, using website blockers, or finding background sounds that help you focus. Our Sounds section has focus-enhancing audio. What usually distracts you most? 🔍"
    ],
    default: [
      "I hear you, and I'm here to support you. Can you tell me more about what you're experiencing? Sometimes talking through our feelings can help us understand them better. 💙",
      "Thank you for sharing with me. It takes courage to reach out. What would be most helpful for you right now - some coping strategies, someone to listen, or information about resources? 🤗",
      "I'm here to listen and support you in whatever way I can. Every feeling you have is valid, and you don't have to go through this alone. What's been on your mind lately? 💭"
    ]
  };

  const quickResponses = [
    "I'm stressed",
    "Can't sleep",
    "Feeling sad",
    "Study help",
    "Need support",
    "Just chatting"
  ];

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('ai_chat_history');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    } else {
      // Send initial greeting
      const greeting = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
      const initialMessage: Message = {
        id: Date.now().toString(),
        text: greeting,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem('ai_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Crisis keywords - highest priority
    if (lowerInput.includes('suicide') || lowerInput.includes('hurt myself') || lowerInput.includes('end it') || lowerInput.includes('kill myself')) {
      return responses.crisis[Math.floor(Math.random() * responses.crisis.length)];
    }

    // Greeting keywords
    if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }

    // Stress/anxiety keywords
    if (lowerInput.includes('stress') || lowerInput.includes('anxious') || lowerInput.includes('anxiety') || lowerInput.includes('overwhelmed') || lowerInput.includes('panic')) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    }

    // Academic keywords
    if (lowerInput.includes('exam') || lowerInput.includes('test') || lowerInput.includes('study') || lowerInput.includes('academic') || lowerInput.includes('grades') || lowerInput.includes('assignment')) {
      return responses.academic[Math.floor(Math.random() * responses.academic.length)];
    }

    // Sleep keywords
    if (lowerInput.includes('sleep') || lowerInput.includes('insomnia') || lowerInput.includes('tired') || lowerInput.includes('exhausted') || lowerInput.includes("can't sleep")) {
      return responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
    }

    // Loneliness keywords
    if (lowerInput.includes('lonely') || lowerInput.includes('alone') || lowerInput.includes('friends') || lowerInput.includes('social') || lowerInput.includes('isolated') || lowerInput.includes('homesick')) {
      return responses.loneliness[Math.floor(Math.random() * responses.loneliness.length)];
    }

    // Mental health keywords
    if (lowerInput.includes('depression') || lowerInput.includes('sad') || lowerInput.includes('down') || lowerInput.includes('mental health') || lowerInput.includes('therapy')) {
      return responses.mentalHealth[Math.floor(Math.random() * responses.mentalHealth.length)];
    }

    // Motivation keywords
    if (lowerInput.includes('motivation') || lowerInput.includes('lazy') || lowerInput.includes('procrastination') || lowerInput.includes('self-care') || lowerInput.includes('routine')) {
      return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
    }

    // Focus keywords
    if (lowerInput.includes('focus') || lowerInput.includes('concentration') || lowerInput.includes('distracted') || lowerInput.includes('adhd')) {
      return responses.focus[Math.floor(Math.random() * responses.focus.length)];
    }

    // Default response
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Generate AI response
    const responseText = getResponse(text);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isUser: false,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickResponse = (response: string) => {
    sendMessage(response);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('ai_chat_history');
    // Send new greeting
    const greeting = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: greeting,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.isUser ? 'You' : 'AI Assistant'} (${msg.timestamp.toLocaleTimeString()}): ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (date: Date) => {
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gray-800 rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="text-gray-100" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-100">AI Support Assistant</h1>
                <p className="text-gray-400">Your 24/7 Mental Wellness Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Always Online</span>
            </div>
          </div>
          <p className="text-gray-300 italic text-lg">
            "I'm here to listen and support you anytime you need."
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-100">Chat Session</h2>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportChat}
                  className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
                  title="Export Chat"
                >
                  <Download size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700 transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-800">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-gray-100'
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-2xl max-w-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">AI is typing</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Response Buttons */}
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <p className="text-sm text-gray-400 mb-3">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response) => (
                <motion.button
                  key={response}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickResponse(response)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-200 hover:bg-gray-600 transition-colors"
                >
                  {response}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="p-6 border-t border-gray-700 bg-gray-800">
            <form onSubmit={handleSubmit} className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400"
                  rows={2}
                  maxLength={500}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {inputText.length}/500 characters
                  </span>
                  <span className="text-xs text-gray-400">
                    Press Enter to send, Shift+Enter for new line
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-blue-600 text-gray-100 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}