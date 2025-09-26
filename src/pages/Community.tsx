import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Heart, Eye, Clock, Plus, Filter, TrendingUp, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  createdAt: Date;
  isAnonymous: boolean;
  likedBy: string[];
}

const initialPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Dealing with exam anxiety - tips that helped me',
    content: 'Hey everyone! I wanted to share some techniques that really helped me manage my anxiety during finals week. The 4-7-8 breathing technique has been a game changer...',
    author: 'Anonymous_Student',
    category: 'Academic Stress',
    replies: 24,
    likes: 45,
    createdAt: new Date('2024-12-15'),
    isAnonymous: true,
    likedBy: [],
  },
  {
    id: '2',
    title: 'Finding motivation when everything feels overwhelming',
    content: 'I\'ve been struggling with feeling overwhelmed lately. Anyone else going through something similar? Would love to hear your coping strategies.',
    author: 'MindfulMike',
    category: 'General Support',
    replies: 18,
    likes: 32,
    createdAt: new Date('2024-12-14'),
    isAnonymous: false,
    likedBy: [],
  },
  {
    id: '3',
    title: 'Celebrating small wins today!',
    content: 'I managed to attend all my classes this week despite feeling really anxious. It might seem small but it\'s huge for me! 🎉',
    author: 'Anonymous_Warrior',
    category: 'Success Stories',
    replies: 31,
    likes: 67,
    createdAt: new Date('2024-12-12'),
    isAnonymous: true,
    likedBy: [],
  },
];

const categories = [
  { name: 'All Posts', count: 0 },
  { name: 'Academic Stress', count: 0 },
  { name: 'General Support', count: 0 },
  { name: 'Sleep Issues', count: 0 },
  { name: 'Success Stories', count: 0 },
  { name: 'Study Groups', count: 0 },
  { name: 'Anxiety Help', count: 0 },
  { name: 'Depression Support', count: 0 },
];

export default function Community() {
  const { state } = useApp();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General Support',
    isAnonymous: false
  });
  const [isPosting, setIsPosting] = useState(false);

  // Load posts on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          likedBy: post.likedBy || []
        }));
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(initialPosts);
        localStorage.setItem('communityPosts', JSON.stringify(initialPosts));
      }
    } else {
      setPosts(initialPosts);
      localStorage.setItem('communityPosts', JSON.stringify(initialPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('communityPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'All Posts' || post.category === selectedCategory
  );

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsPosting(true);

    try {
      const post: ForumPost = {
        id: Date.now().toString(),
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        category: newPost.category,
        author: newPost.isAnonymous ? 'Anonymous_User' : (state.user?.name || 'User'),
        isAnonymous: newPost.isAnonymous,
        replies: 0,
        likes: 0,
        createdAt: new Date(),
        likedBy: []
      };

      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);

      // Reset form
      setNewPost({
        title: '',
        content: '',
        category: 'General Support',
        isAnonymous: false
      });

      setShowNewPostModal(false);
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLikePost = (postId: string) => {
    if (!state.user) return;

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedBy.includes(state.user!.id);
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            likedBy: isLiked 
              ? post.likedBy.filter(id => id !== state.user!.id)
              : [...post.likedBy, state.user!.id]
          };
        }
        return post;
      })
    );
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  // Update category counts
  const updatedCategories = categories.map(category => ({
    ...category,
    count: category.name === 'All Posts' 
      ? posts.length 
      : posts.filter(post => post.category === category.name).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Community Support</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Connect with peers, share experiences, and support each other's mental wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {updatedCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-orange-100 text-orange-800 font-medium dark:bg-orange-900/50 dark:text-orange-300'
                        : 'hover:bg-slate-50 text-slate-600 dark:hover:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewPostModal(true)}
                className="w-full mt-6 flex items-center justify-center space-x-2 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <Plus size={20} />
                <span>New Post</span>
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">1,247</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Active Members</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-emerald-600 dark:text-emerald-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{posts.length}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Posts</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">92%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Positive Feedback</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {post.isAnonymous ? '?' : post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{post.title}</h3>
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <span>by {post.author}</span>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <MessageSquare size={16} />
                            <span>{post.replies}</span>
                          </div>
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                              state.user && post.likedBy.includes(state.user.id) ? 'text-red-500' : ''
                            }`}
                          >
                            <Heart 
                              size={16} 
                              className={state.user && post.likedBy.includes(state.user.id) ? 'fill-current' : ''} 
                            />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No posts found</h3>
                <p className="text-slate-600 dark:text-slate-300">Be the first to start a conversation in this category!</p>
              </div>
            )}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Create New Post</h2>
              
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  >
                    <option>General Support</option>
                    <option>Academic Stress</option>
                    <option>Sleep Issues</option>
                    <option>Success Stories</option>
                    <option>Study Groups</option>
                    <option>Anxiety Help</option>
                    <option>Depression Support</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
                  <textarea
                    rows={6}
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none dark:bg-slate-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-slate-600 dark:text-slate-300">
                    Post anonymously
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="px-6 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isPosting}
                    className="flex items-center space-x-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPosting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Post</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}