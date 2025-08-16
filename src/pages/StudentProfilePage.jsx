"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Award, BarChart, CheckCircle, XCircle, MinusCircle, Edit, LogOut, Book, Bell, Settings } from 'lucide-react'; // Import Settings

// Mock Data
const mockStudent = {
    name: "Anusha Sharma",
    email: "anusha.sharma@example.com",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?img=48",
    totalTests: 15,
    averageScore: 88,
    accuracy: 90,
    achievements: [
        { id: 1, name: "First Test Completed", icon: "🥇", description: "Successfully completed your first mock test!" },
        { id: 2, name: "Top 10 Leaderboard", icon: "🌟", description: "Achieved a top 10 rank on the national leaderboard." },
        { id: 3, name: "Consistency Award", icon: "🔥", description: "Maintained consistent practice for over a month." },
        { id: 4, name: "Math Whiz", icon: "➕", description: "Achieved 95%+ accuracy in Math tests." },
        { id: 5, name: "Reasoning Master", icon: "🧠", description: "Excelled in Reasoning sections." },
        { id: 6, name: "Early Bird", icon: "⏰", description: "Completed tests before deadline consistently." },
    ],
    recentActivity: [
        { id: 1, name: "Mental Ability Test #5", date: "Aug 14, 2024", score: "85%", status: "Passed" },
        { id: 2, name: "Arithmetic Test #3", date: "Aug 12, 2024", score: "92%", status: "Passed" },
        { id: 3, name: "Full-Length Mock Exam #2", date: "Aug 10, 2024", score: "88%", status: "Passed" },
        { id: 4, name: "Language Test #4", date: "Aug 9, 2024", score: "78%", status: "Passed" },
        { id: 5, name: "Drawing Test #2", date: "Aug 7, 2024", score: "65%", status: "Failed" },
    ]
};

const StatCard = ({ title, value, icon, colorClass }) => (
    <div className={`glass-effect rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClass}`}>
        <div className={`p-3 rounded-full inline-block mb-4 ${colorClass.replace('border-', 'bg-').replace('/50', '/30')}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
    </div>
);

const AchievementBadge = ({ achievement }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <div
            className="relative flex flex-col items-center p-4 bg-slate-800/50 border border-slate-700 rounded-lg transition-all duration-200 hover:bg-slate-700/50 cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <span className="text-4xl mb-2">{achievement.icon}</span>
            <p className="text-sm font-semibold text-white text-center">{achievement.name}</p>
            {showTooltip && (
                <div className="absolute bottom-full mb-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {achievement.description}
                </div>
            )}
        </div>
    );
};

const StudentProfilePage = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleEditProfile = () => {
        // This button now navigates to the settings page
        navigate('/settings');
    };

    const handleLogout = () => {
        // Mock logout logic
        navigate('/'); // Redirect to home page
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                    {/* Main Profile Content */}
                    <div className="glass-effect rounded-2xl p-6 sm:p-8 w-full max-w-4xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Student Profile</h1>
                            <p className="mt-2 text-lg text-slate-400">Your personalized learning journey.</p>
                        </div>

                        {/* Profile Card */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-slate-900/50 border border-slate-800 rounded-xl mb-10">
                            <div className="relative">
                                <img src={mockStudent.avatar} alt={mockStudent.name} className="w-28 h-28 rounded-full border-4 border-cyan-500 shadow-lg shadow-cyan-900/50 animate-pulse-slow" />
                                <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow" style={{ borderColor: 'rgba(6, 182, 212, 0.5)', animationDuration: '10s' }}></div>
                            </div>
                            <div className="text-center sm:text-left flex-grow">
                                <h2 className="text-2xl font-bold text-white">{mockStudent.name}</h2>
                                <p className="text-slate-400">{mockStudent.email}</p>
                                <p className="text-slate-500 text-sm">{mockStudent.role}</p>
                                <button
                                    onClick={handleEditProfile}
                                    className="mt-4 px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center mx-auto sm:mx-0"
                                >
                                    <Settings size={18} className="mr-2" /> Edit Settings
                                </button>
                            </div>
                            <Link to="/notifications" className="sm:self-start relative px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center">
                                <Bell size={18} className="mr-2" /> Notifications
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping-slow"></span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="sm:self-start px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                            >
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        </div>

                        {/* Progress Overview */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-white mb-4">Progress Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard
                                    title="Total Tests Attempted"
                                    value={mockStudent.totalTests}
                                    icon={<Book size={24} className="text-blue-400" />}
                                    colorClass="border-blue-500/50 hover:shadow-blue-900/30"
                                />
                                <StatCard
                                    title="Average Score"
                                    value={`${mockStudent.averageScore}%`}
                                    icon={<BarChart size={24} className="text-green-400" />}
                                    colorClass="border-green-500/50 hover:shadow-green-900/30"
                                />
                                <StatCard
                                    title="Accuracy"
                                    value={`${mockStudent.accuracy}%`}
                                    icon={<CheckCircle size={24} className="text-purple-400" />}
                                    colorClass="border-purple-500/50 hover:shadow-purple-900/30"
                                />
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-white mb-4">Your Achievements</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {mockStudent.achievements.map(achievement => (
                                    <AchievementBadge key={achievement.id} achievement={achievement} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                            <div className="overflow-x-auto rounded-xl border border-slate-800">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Test Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {mockStudent.recentActivity.map(activity => (
                                            <tr key={activity.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{activity.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{activity.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{activity.score}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${activity.status === 'Passed' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {activity.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                Back to Dashboard
                            </Link>
                            <Link
                                to="/leaderboard"
                                className="w-full sm:w-auto text-center px-8 py-3 border border-purple-600 text-purple-300 font-semibold rounded-lg hover:bg-purple-900/30 hover:text-white transition-colors duration-200"
                            >
                                View Leaderboard
                            </Link>
                            <Link
                                to="/mock-tests"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Take New Test
                            </Link>
                        </div>
                    </div>

                    {/* Side Illustration (Desktop Only) */}
                    {isDesktop && (
                        <div className="w-80 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center animate-fade-in-right flex flex-col items-center justify-center">
                            <img src="https://storage.googleapis.com/pai-images/468095b9227c4b77a5840b106201b2f7.jpeg" alt="AI teacher hologram" className="max-w-[150px] mx-auto mb-6 rounded-full shadow-lg" />
                            <h3 className="text-xl font-bold text-white mb-3">Your Progress, Visualized!</h3>
                            <p className="text-slate-400 text-sm">
                                "Every practice session builds your foundation. Keep track of your growth and celebrate your milestones!"
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer minimal="Your journey defines your success 🚀" />

            {/* Edit Profile Modal (Mock) */}
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center shadow-xl animate-scale-in">
                        <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
                        <p className="text-slate-300 mb-6">Profile editing functionality is coming soon!</p>
                        <button
                            onClick={() => setShowEditProfileModal(false)}
                            className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentProfilePage;