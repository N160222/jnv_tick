"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Crown, Filter, ChevronDown, Search, Award, Gift, Coins, TrendingUp, CheckCircle, X, Settings, Download } from 'lucide-react';

// Mock Data for Leaderboard
const mockLeaderboardData = [
    { id: 1, name: "Anusha Sharma", class: "Class 6", score: 98, accuracy: 95, totalPoints: 1250, avatar: "https://i.pravatar.cc/150?img=48" },
    { id: 2, name: "Rahul Verma", class: "Class 6", score: 95, accuracy: 92, totalPoints: 1180, avatar: "https://i.pravatar.cc/150?img=68" },
    { id: 3, name: "Priya Singh", class: "Class 7", score: 93, accuracy: 90, totalPoints: 1120, avatar: "https://i.pravatar.cc/150?img=25" },
    { id: 4, name: "Amit Kumar", class: "Class 6", score: 91, accuracy: 88, totalPoints: 1050, avatar: "https://i.pravatar.cc/150?img=60" },
    { id: 5, name: "Sneha Reddy", class: "Class 7", score: 89, accuracy: 87, totalPoints: 980, avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 6, name: "Vikram Yadav", class: "Class 6", score: 87, accuracy: 85, totalPoints: 920, avatar: "https://i.pravatar.cc/150?img=70" },
    { id: 7, name: "Divya Patel", class: "Class 8", score: 85, accuracy: 83, totalPoints: 880, avatar: "https://i.pravatar.cc/150?img=20" },
    { id: 8, name: "Rohan Gupta", class: "Class 7", score: 82, accuracy: 80, totalPoints: 810, avatar: "https://i.pravatar.cc/150?img=65" },
    { id: 9, name: "Kavya Rao", class: "Class 6", score: 80, accuracy: 78, totalPoints: 750, avatar: "https://i.pravatar.cc/150?img=15" },
    { id: 10, name: "Siddharth Jain", class: "Class 8", score: 78, accuracy: 75, totalPoints: 700, avatar: "https://i.pravatar.cc/150?img=75" },
];

// Mock Data for Student Rewards Log
const mockRewardsLog = [
    { id: 1, studentName: "Anusha Sharma", class: "Class 6", rewardType: "Test Participation", pointsAwarded: 50, date: "2024-08-15" },
    { id: 2, studentName: "Rahul Verma", class: "Class 6", rewardType: "Top Scorer", pointsAwarded: 100, date: "2024-08-14" },
    { id: 3, studentName: "Priya Singh", class: "Class 7", rewardType: "Consistency Bonus", pointsAwarded: 75, date: "2024-08-13" },
    { id: 4, studentName: "Amit Kumar", class: "Class 6", rewardType: "Test Participation", pointsAwarded: 50, date: "2024-08-12" },
    { id: 5, studentName: "Sneha Reddy", class: "Class 7", rewardType: "Top Scorer", pointsAwarded: 100, date: "2024-08-11" },
];

const LeaderboardCard = ({ student, rank }) => {
    const rankColors = {
        1: "from-yellow-600/30 to-orange-600/30 border-yellow-500/50 shadow-lg shadow-yellow-900/40",
        2: "from-slate-500/30 to-slate-600/30 border-slate-400/50 shadow-lg shadow-slate-700/40",
        3: "from-amber-800/30 to-orange-800/30 border-amber-700/50 shadow-lg shadow-amber-900/40",
    };
    const icon = rank === 1 ? <Crown size={48} className="text-yellow-400 mb-2 animate-bounce-once" /> : <Trophy size={40} className="text-slate-300 mb-2" />;

    return (
        <div
            className={`relative flex flex-col items-center p-6 rounded-xl border transition-all duration-300 animate-fade-in-up
                ${rankColors[rank] || 'bg-slate-900/30 border-slate-800/50'}
            `}
            style={{ animationDelay: `${200 + rank * 100}ms` }}
        >
            <div className="absolute -top-4 -right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-white text-sm font-bold">
                #{rank}
            </div>
            {rank <= 3 && icon}
            <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full border-4 border-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-white">{student.name}</h3>
            <p className="text-slate-400 text-sm">{student.class}</p>
            <p className="text-slate-400 text-sm">Points: <span className="font-semibold text-white">{student.totalPoints}</span></p>
        </div>
    );
};

const RewardsLeaderboardPage = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
    const [rewardSettings, setRewardSettings] = useState({
        testParticipation: 50,
        topScorers: 100,
        consistencyBonus: 75,
    });
    const [rewardsLog, setRewardsLog] = useState(mockRewardsLog);
    const [logSearchTerm, setLogSearchTerm] = useState('');
    const [logFilterClass, setLogFilterClass] = useState('All');
    const [logFilterRewardType, setLogFilterRewardType] = useState('All');

    const availableClasses = ["All", ...new Set(mockLeaderboardData.map(s => s.class))];
    const availableRewardTypes = ["All", ...new Set(mockRewardsLog.map(log => log.rewardType))];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRewardSettingChange = (e) => {
        const { name, value } = e.target;
        setRewardSettings(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleSaveRewardSettings = (e) => {
        e.preventDefault();
        alert("✅ Reward settings saved successfully!");
        console.log("Saved Reward Settings:", rewardSettings);
    };

    const filteredRewardsLog = rewardsLog.filter(log => {
        const matchesSearch = log.studentName.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
                              log.rewardType.toLowerCase().includes(logSearchTerm.toLowerCase());
        const matchesClass = logFilterClass === 'All' || log.class === logFilterClass;
        const matchesRewardType = logFilterRewardType === 'All' || log.rewardType === logFilterRewardType;
        return matchesSearch && matchesClass && matchesRewardType;
    });

    const handleDownloadLeaderboardCSV = () => {
        alert("Downloading Leaderboard CSV...");
    };

    const handleDownloadLeaderboardPDF = () => {
        alert("Downloading Leaderboard PDF...");
    };

    const handlePrintCertificate = (studentName) => {
        alert(`Generating certificate for ${studentName}... (Mock)`);
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Trophy size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Award size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">🏆 Rewards & Leaderboard</h1>
                            <p className="mt-2 text-lg text-slate-400">Celebrate student achievements and encourage healthy competition.</p>
                        </div>

                        {/* Top Performers Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Award size={24} className="mr-3 text-yellow-400" /> Top Performers</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {mockLeaderboardData.slice(0, 3).map((student, index) => (
                                    <LeaderboardCard key={student.id} student={student} rank={index + 1} />
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowFullLeaderboard(!showFullLeaderboard)}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                                >
                                    {showFullLeaderboard ? 'Hide Full Leaderboard' : 'View Full Leaderboard'}
                                </button>
                            </div>
                        </div>

                        {/* Full Leaderboard (Expandable) */}
                        {showFullLeaderboard && (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Trophy size={24} className="mr-3 text-cyan-400" /> All Ranks</h2>
                                <div className="overflow-x-auto rounded-xl border border-slate-800">
                                    <table className="min-w-full divide-y divide-slate-800">
                                        <thead className="bg-slate-800/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Student Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Class</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Total Points</th>
                                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {mockLeaderboardData.map((student, index) => (
                                                <tr key={student.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 flex items-center">
                                                        <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                                        {student.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.class}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{student.totalPoints}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                        {index < 3 && (
                                                            <button onClick={() => handlePrintCertificate(student.name)} className="text-yellow-400 hover:text-yellow-300" title="Print Certificate">
                                                                <Award size={18} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Reward Settings */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Settings size={24} className="mr-3 text-green-400" /> Reward Settings</h2>
                            <form onSubmit={handleSaveRewardSettings} className="space-y-4">
                                <div>
                                    <label htmlFor="testParticipation" className="block text-sm font-medium text-slate-300 mb-2">Points for Test Participation</label>
                                    <input
                                        type="number"
                                        id="testParticipation"
                                        name="testParticipation"
                                        value={rewardSettings.testParticipation}
                                        onChange={handleRewardSettingChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="topScorers" className="block text-sm font-medium text-slate-300 mb-2">Points for Top Scorers</label>
                                    <input
                                        type="number"
                                        id="topScorers"
                                        name="topScorers"
                                        value={rewardSettings.topScorers}
                                        onChange={handleRewardSettingChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="consistencyBonus" className="block text-sm font-medium text-slate-300 mb-2">Bonus for Consistency</label>
                                    <input
                                        type="number"
                                        id="consistencyBonus"
                                        name="consistencyBonus"
                                        value={rewardSettings.consistencyBonus}
                                        onChange={handleRewardSettingChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
                                    Save Settings
                                </button>
                            </form>
                        </div>

                        {/* Student Rewards Log */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Gift size={24} className="mr-3 text-purple-400" /> Student Rewards Log</h2>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search student or reward type..."
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={logSearchTerm}
                                        onChange={(e) => setLogSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <select
                                        className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={logFilterClass}
                                        onChange={(e) => setLogFilterClass(e.target.value)}
                                    >
                                        {availableClasses.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <select
                                        className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={logFilterRewardType}
                                        onChange={(e) => setLogFilterRewardType(e.target.value)}
                                    >
                                        {availableRewardTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {isDesktop ? (
                                <div className="overflow-x-auto rounded-xl border border-slate-800">
                                    <table className="min-w-full divide-y divide-slate-800">
                                        <thead className="bg-slate-800/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Student Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Class</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Reward Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Points Awarded</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {filteredRewardsLog.length > 0 ? (
                                                filteredRewardsLog.map(log => (
                                                    <tr key={log.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.studentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{log.class}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{log.rewardType}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-yellow-400">{log.pointsAwarded}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{log.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-slate-400">No reward logs found matching your criteria.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredRewardsLog.length > 0 ? (
                                        filteredRewardsLog.map(log => (
                                            <div key={log.id} className="glass-effect rounded-xl p-4">
                                                <h3 className="text-lg font-bold text-white">{log.studentName}</h3>
                                                <p className="text-slate-400 text-sm">{log.class}</p>
                                                <div className="mt-2 text-slate-300">
                                                    <p><span className="font-semibold">{log.rewardType}:</span> <span className="text-yellow-400">{log.pointsAwarded} Points</span></p>
                                                    <p className="text-xs text-slate-500">{log.date}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-slate-400 py-10">
                                            No reward logs found matching your criteria.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Export Options */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                            <button
                                onClick={handleDownloadLeaderboardCSV}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Download Leaderboard CSV
                            </button>
                            <button
                                onClick={handleDownloadLeaderboardPDF}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Download Leaderboard PDF
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Inspire and reward excellence 🌟" />
        </div>
    );
};

export default RewardsLeaderboardPage;