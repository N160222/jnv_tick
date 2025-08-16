"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Crown, Filter, ChevronDown, ArrowLeft, Search } from 'lucide-react';

// Mock data for leaderboard
const mockLeaderboardData = [
    { id: 1, name: "Anusha Sharma", score: 98, accuracy: 95, timeTaken: "25:30", avatar: "https://i.pravatar.cc/150?img=48" },
    { id: 2, name: "Rahul Verma", score: 95, accuracy: 92, timeTaken: "28:15", avatar: "https://i.pravatar.cc/150?img=68" },
    { id: 3, name: "Priya Singh", score: 93, accuracy: 90, timeTaken: "30:00", avatar: "https://i.pravatar.cc/150?img=25" },
    { id: 4, name: "Amit Kumar", score: 91, accuracy: 88, timeTaken: "32:45", avatar: "https://i.pravatar.cc/150?img=60" },
    { id: 5, name: "Sneha Reddy", score: 89, accuracy: 87, timeTaken: "35:20", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 6, name: "Vikram Yadav", score: 87, accuracy: 85, timeTaken: "38:00", avatar: "https://i.pravatar.cc/150?img=70" },
    { id: 7, name: "Divya Patel", score: 85, accuracy: 83, timeTaken: "40:10", avatar: "https://i.pravatar.cc/150?img=20" },
    { id: 8, name: "Rohan Gupta", score: 82, accuracy: 80, timeTaken: "42:55", avatar: "https://i.pravatar.cc/150?img=65" },
    { id: 9, name: "Kavya Rao", score: 80, accuracy: 78, timeTaken: "45:00", avatar: "https://i.pravatar.cc/150?img=15" },
    { id: 10, name: "Siddharth Jain", score: 78, accuracy: 75, timeTaken: "48:30", avatar: "https://i.pravatar.cc/150?img=75" },
    { id: 11, name: "Anjali Devi", score: 75, accuracy: 72, timeTaken: "50:00", avatar: "https://i.pravatar.cc/150?img=10" },
    { id: 12, name: "Gaurav Singh", score: 73, accuracy: 70, timeTaken: "52:10", avatar: "https://i.pravatar.cc/150?img=80" },
];

const LeaderboardPage = () => {
    const loggedInStudentId = 1; // Mock logged-in student
    const [sortBy, setSortBy] = useState('score'); // 'score', 'accuracy', 'timeTaken'
    const [searchTerm, setSearchTerm] = useState('');
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sortedAndFilteredLeaderboard = [...mockLeaderboardData]
        .filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'score') {
                return b.score - a.score;
            } else if (sortBy === 'accuracy') {
                return b.accuracy - a.accuracy;
            } else if (sortBy === 'timeTaken') {
                // Simple string comparison for mock time, for real app convert to seconds
                return a.timeTaken.localeCompare(b.timeTaken);
            }
            return 0;
        });

    const top3 = sortedAndFilteredLeaderboard.slice(0, 3);
    const restOfLeaderboard = sortedAndFilteredLeaderboard.slice(3);

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                    {/* Main Leaderboard Content */}
                    <div className="glass-effect rounded-2xl p-6 sm:p-8 w-full max-w-4xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white relative inline-block">
                                🏆 Leaderboard
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70 animate-pulse-slow"></span>
                            </h1>
                            <p className="mt-2 text-lg text-slate-400">See how you rank among other learners.</p>
                        </div>

                        {/* Top 3 Highlight */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {top3.map((student, index) => (
                                <div
                                    key={student.id}
                                    className={`relative flex flex-col items-center p-6 rounded-xl border transition-all duration-300 animate-fade-in-up
                                        ${index === 0 ? 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-500/50 shadow-lg shadow-yellow-900/40 scale-105' :
                                          index === 1 ? 'bg-gradient-to-br from-slate-500/30 to-slate-600/30 border-slate-400/50 shadow-lg shadow-slate-700/40' :
                                          'bg-gradient-to-br from-amber-800/30 to-orange-800/30 border-amber-700/50 shadow-lg shadow-amber-900/40'}
                                    `}
                                    style={{ animationDelay: `${200 + index * 100}ms` }}
                                >
                                    <div className="absolute -top-4 -right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-white text-sm font-bold">
                                        #{index + 1}
                                    </div>
                                    {index === 0 && <Crown size={48} className="text-yellow-400 mb-2 animate-bounce-once" />}
                                    {index === 1 && <Trophy size={40} className="text-slate-300 mb-2" />}
                                    {index === 2 && <Trophy size={36} className="text-amber-600 mb-2" />}
                                    <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full border-4 border-slate-700 mb-4" />
                                    <h3 className="text-xl font-bold text-white">{student.name}</h3>
                                    <p className="text-slate-400 text-sm">Score: <span className="font-semibold text-white">{student.score}</span></p>
                                    <p className="text-slate-400 text-sm">Accuracy: <span className="font-semibold text-white">{student.accuracy}%</span></p>
                                    <p className="text-slate-400 text-sm">Time: <span className="font-semibold text-white">{student.timeTaken}</span></p>
                                </div>
                            ))}
                        </div>

                        {/* Filters and Search */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="score">Highest Score</option>
                                    <option value="accuracy">Highest Accuracy</option>
                                    <option value="timeTaken">Fastest Time</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        {/* Ranking Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-800 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <table className="min-w-full divide-y divide-slate-800">
                                <thead className="bg-slate-800/50 sticky top-0 z-10">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Accuracy %</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Time Taken</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {restOfLeaderboard.map((student, index) => (
                                        <tr
                                            key={student.id}
                                            className={`transition-colors duration-200 hover:bg-slate-800/50
                                                ${student.id === loggedInStudentId ? 'bg-blue-900/30 border-l-4 border-blue-500' : 'bg-slate-900/30'}
                                            `}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                {index + 4} {/* Ranks start from 4 after top 3 */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 flex items-center">
                                                <Link to="/profile" className="flex items-center group">
                                                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                                    <span className="group-hover:text-cyan-400 transition-colors">{student.name}</span>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">{student.score}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">{student.accuracy}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{student.timeTaken}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Side Illustration (Desktop Only) */}
                    {isDesktop && (
                        <div className="w-80 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center animate-fade-in-right flex flex-col items-center justify-center">
                            <Trophy size={128} className="text-yellow-400 mb-6 animate-spin-slow" style={{ animationDuration: '20s' }} />
                            <h3 className="text-xl font-bold text-white mb-3">Compete & Conquer!</h3>
                            <p className="text-slate-400 text-sm">
                                "Every test is a chance to climb higher. Keep pushing your limits!"
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 z-20 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    to="/dashboard"
                    className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </Link>
                <Link
                    to="/mock-tests"
                    className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                    Try Another Test
                </Link>
            </div>

            <Footer minimal="Compete. Learn. Grow. 🌟" />
        </div>
    );
};

export default LeaderboardPage;