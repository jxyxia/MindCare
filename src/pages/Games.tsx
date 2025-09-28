import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Filter, Search } from 'lucide-react';
import { Game } from '../types';
import BreathingGame from '../components/BreathingGame';

const games: Game[] = [
	{
		id: '1',
		title: '4-7-8 Breathing Exercise',
		description: 'A calming breathing technique to reduce anxiety and promote relaxation',
		category: 'anxiety-relief',
		duration: 5,
		difficulty: 'beginner',
		completed: false,
		rating: 4.8,
	},
	{
		id: '2',
		title: 'Box Breathing Challenge',
		description: 'Military-style breathing technique for focus and stress management',
		category: 'focus',
		duration: 10,
		difficulty: 'intermediate',
		completed: true,
		rating: 4.9,
	},
	{
		id: '3',
		title: 'Progressive Muscle Relaxation',
		description: 'Systematic tension and release of muscle groups for deep relaxation',
		category: 'stress-management',
		duration: 15,
		difficulty: 'beginner',
		completed: false,
		rating: 4.7,
	},
	{
		id: '4',
		title: 'Mindful Body Scan',
		description: 'Guide your attention through your body for awareness and relaxation',
		category: 'sleep-aid',
		duration: 20,
		difficulty: 'intermediate',
		completed: false,
		rating: 4.6,
	},
	{
		id: '5',
		title: '5-4-3-2-1 Grounding',
		description: 'Use your senses to ground yourself in the present moment',
		category: 'anxiety-relief',
		duration: 8,
		difficulty: 'beginner',
		completed: true,
		rating: 4.9,
	},
	{
		id: '6',
		title: 'Visualization Journey',
		description: 'Guided imagery for stress relief and mental escape',
		category: 'stress-management',
		duration: 12,
		difficulty: 'advanced',
		completed: false,
		rating: 4.5,
	},
];

const categoryColors = {
	'anxiety-relief': 'bg-blue-900 text-blue-100',
	focus: 'bg-emerald-900 text-emerald-100',
	'stress-management': 'bg-purple-900 text-purple-100',
	'sleep-aid': 'bg-indigo-900 text-indigo-100',
};

const difficultyColors = {
	beginner: 'bg-green-900 text-green-100',
	intermediate: 'bg-yellow-900 text-yellow-100',
	advanced: 'bg-red-900 text-red-100',
};

export default function Games() {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedGame, setSelectedGame] = useState<Game | null>(null);

	const categories = ['all', 'anxiety-relief', 'focus', 'stress-management', 'sleep-aid'];

	const filteredGames = games.filter(game => {
		const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
		const matchesSearch =
			game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			game.description.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const handlePlayGame = (game: Game) => {
		setSelectedGame(game);
	};

	const renderGameInterface = () => {
		if (!selectedGame) return null;

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
				onClick={() => setSelectedGame(null)}
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="bg-gray-800 rounded-xl max-w-2xl w-full p-8"
					onClick={e => e.stopPropagation()}
				>
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-gray-100 mb-2">{selectedGame.title}</h2>
						<p className="text-gray-400">{selectedGame.description}</p>
					</div>

					{selectedGame.id === '1' && <BreathingGame onClose={() => setSelectedGame(null)} />}

					{selectedGame.id === '2' && (
						<div className="text-center space-y-6">
							<h3 className="text-xl font-semibold text-slate-800">Box Breathing Challenge</h3>
							<p className="text-slate-600">This exercise will be available soon!</p>
							<button
								onClick={() => setSelectedGame(null)}
								className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								Close
							</button>
						</div>
					)}

					{selectedGame.id === '3' && (
						<div className="text-center space-y-6">
							<h3 className="text-xl font-semibold text-slate-800">Progressive Muscle Relaxation</h3>
							<p className="text-slate-600">This exercise will be available soon!</p>
							<button
								onClick={() => setSelectedGame(null)}
								className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								Close
							</button>
						</div>
					)}

					{selectedGame.id === '4' && (
						<div className="text-center space-y-6">
							<h3 className="text-xl font-semibold text-slate-800">Mindful Body Scan</h3>
							<p className="text-slate-600">This exercise will be available soon!</p>
							<button
								onClick={() => setSelectedGame(null)}
								className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								Close
							</button>
						</div>
					)}

					{selectedGame.id === '5' && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 gap-4">
								<div className="p-4 bg-blue-50 rounded-lg">
									<h4 className="font-semibold text-blue-800 mb-2">5 Things You Can See</h4>
									<p className="text-blue-700">Look around and name 5 things you can see</p>
								</div>
								<div className="p-4 bg-emerald-50 rounded-lg">
									<h4 className="font-semibold text-emerald-800 mb-2">4 Things You Can Touch</h4>
									<p className="text-emerald-700">Identify 4 things you can physically touch</p>
								</div>
								<div className="p-4 bg-purple-50 rounded-lg">
									<h4 className="font-semibold text-purple-800 mb-2">3 Things You Can Hear</h4>
									<p className="text-purple-700">Listen for 3 different sounds around you</p>
								</div>
								<div className="p-4 bg-orange-50 rounded-lg">
									<h4 className="font-semibold text-orange-800 mb-2">2 Things You Can Smell</h4>
									<p className="text-orange-700">Notice 2 different scents</p>
								</div>
								<div className="p-4 bg-pink-50 rounded-lg">
									<h4 className="font-semibold text-pink-800 mb-2">1 Thing You Can Taste</h4>
									<p className="text-pink-700">Focus on any taste in your mouth</p>
								</div>
							</div>
							<div className="flex justify-center space-x-4">
								<button
									onClick={() => setSelectedGame(null)}
									className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
								>
									Close
								</button>
								<button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
									Complete Exercise
								</button>
							</div>
						</div>
					)}

					{selectedGame.id === '6' && (
						<div className="text-center space-y-6">
							<h3 className="text-xl font-semibold text-slate-800">Visualization Journey</h3>
							<p className="text-slate-600">This exercise will be available soon!</p>
							<button
								onClick={() => setSelectedGame(null)}
								className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								Close
							</button>
						</div>
					)}
				</motion.div>
			</motion.div>
		);
	};

	return (
		<div className="min-h-screen bg-gray-900 pt-20 pb-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<h1 className="text-3xl font-bold text-gray-100 mb-2">Mental Wellness Games</h1>
					<p className="text-gray-400">
						Interactive activities designed to help you relax, focus, and manage stress
					</p>
				</motion.div>

				{/* Filters and Search */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 relative">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
							<input
								type="text"
								placeholder="Search games..."
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Filter size={20} className="text-gray-400" />
							<select
								value={selectedCategory}
								onChange={e => setSelectedCategory(e.target.value)}
								className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
							>
								<option value="all">All Categories</option>
								<option value="anxiety-relief">Anxiety Relief</option>
								<option value="focus">Focus Building</option>
								<option value="stress-management">Stress Management</option>
								<option value="sleep-aid">Sleep Aid</option>
							</select>
						</div>
					</div>
				</div>

				{/* Games Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredGames.map((game, index) => (
						<motion.div
							key={game.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-200"
						>
							<div className="p-6">
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-100 mb-2">{game.title}</h3>
										<p className="text-sm text-gray-400 mb-3">{game.description}</p>
									</div>
									{game.completed && (
										<div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center">
											<div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
										</div>
									)}
								</div>

								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-2">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[game.category]}`}
										>
											{game.category.replace('-', ' ')}
										</span>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[game.difficulty]}`}
										>
											{game.difficulty}
										</span>
									</div>
									<div className="flex items-center space-x-1 text-sm text-gray-400">
										<Star size={16} className="fill-yellow-400 text-yellow-400" />
										<span>{game.rating}</span>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-1 text-sm text-gray-400">
										<Clock size={16} />
										<span>{game.duration} min</span>
									</div>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => handlePlayGame(game)}
										className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										<Play size={16} />
										<span>Play</span>
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{filteredGames.length === 0 && (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🔍</div>
						<h3 className="text-xl font-semibold text-gray-100 mb-2">No games found</h3>
						<p className="text-gray-400">Try adjusting your search or filter criteria</p>
					</div>
				)}
			</div>

			{renderGameInterface()}
		</div>
	);
}