"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, BookOpen, BarChart, Gift, Activity, PlusCircle, FileText, Award, LayoutDashboard, Brain } from 'lucide-react'; // Added Brain icon

// Mock Data
const quickStats = [
    { id: 1, title: "Total Students Enrolled", value: "1,250", icon: <Users size={32} className="text-cyan-400" />, color: "cyan" },
    { id: 2, title: "Total Mock Tests Created", value: "120", icon: <BookOpen size={32} className="text-blue-400" />, color: "blue" },
    { id: 3, title: "Avg. Score (Last 30 Days)", value: "82%", icon: <BarChart size={32} className="text-green-400" />, color: "green" },
    { id: 4, title: "Rewards Distributed", value: "345", icon: <Gift size={32} className="text-yellow-400" />, color: "yellow" },
];

const recentActivity = [
    { id: 1, type: "student", description: "New student 'Ravi Kumar' joined.", date: "2 mins ago" },
    { id: 2, type: "test", description: "Mock Test 'Algebra Basics' created.", date: "1 hour ago" },
    { id: 3, type: "result", description: "Student 'Priya S.' completed 'Reasoning Test #3'.", date: "3 hours ago" },
    { id: 4, type: "reward", description: "Badge 'Consistent Performer' awarded to 5 students.", date: "1 day ago" },
    { id: 5, type: "student", description: "Student 'Amit V.' updated profile.", date: "2 days ago" },
    { id: 6, type: "test", description: "Mock Test 'Geometry Advanced' updated.", date: "3 days ago" },
];

const AdminDashboardPage = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCardColorClass = (color) => {
        switch (color) {
            case 'cyan': return 'border-cyan-500/50 hover:shadow-cyan-900/30';
            case 'blue': return 'border-blue-500/50 hover:shadow-blue-900/30';
            case 'green': return 'border-green-500/50 hover:shadow-green-900/30';
            case 'yellow': return 'border-yellow-500/50 hover:shadow-yellow-900/30';
            default: return '';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'student': return <Users size={18} className="text-blue-400" />;
            case 'test': return <BookOpen size={18} className="text-green-400" />;
            case 'result': return <BarChart size={18} className="text-purple-400" />;
            case 'reward': return <Award size={18} className="text-yellow-400" />;
            default: return <Activity size={18} className="text-slate-400" />;
        }
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <LayoutDashboard size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <BarChart size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} /> {/* Pass isAdmin prop to Header */}

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">🛠️ Admin Dashboard</h1>
                            <p className="mt-2 text-lg text-slate-400">Monitor and manage everything in one place.</p>
                        </div>

                        {/* Quick Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {quickStats.map((stat, index) => (
                                <div
                                    key={stat.id}
                                    className={`glass-effect rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${getCardColorClass(stat.color)}`}
                                    style={{ animationDelay: `${100 * index}ms` }}
                                >
                                    <div className={`p-3 rounded-full inline-block mb-4 bg-slate-700/50`}>
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{stat.value}</h3>
                                    <p className="text-slate-400 text-sm">{stat.title}</p>
                                </div>
                            ))}
                        </div>

                        {/* Main Content Grid: Recent Activity & Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activity Feed */}
                            <div className="lg:col-span-2 glass-effect rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Activity size={24} className="mr-3 text-cyan-400" /> Recent Activity</h2>
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {recentActivity.map((activity, index) => (
                                        <div key={activity.id} className="flex items-start p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                                            <div className="flex-shrink-0 mt-1 mr-3">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-slate-300">{activity.description}</p>
                                                <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions (Right Sidebar on Desktop) */}
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center"><PlusCircle size={24} className="mr-3 text-purple-400" /> Quick Actions</h2>
                                <div className="space-y-4">
                                    <Link to="/admin/manage-tests" className="flex items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group">
                                        <BookOpen size={20} className="mr-3 text-green-400 group-hover:text-green-300" />
                                        <span className="font-medium text-white group-hover:text-cyan-400">Create New Test</span>
                                    </Link>
                                    <Link to="/admin/ai-test-generation" className="flex items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group">
                                        <Brain size={20} className="mr-3 text-yellow-400 group-hover:text-yellow-300" />
                                        <span className="font-medium text-white group-hover:text-cyan-400">AI Test Generation</span>
                                    </Link>
                                    <Link to="/admin/manage-students" className="flex items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group">
                                        <Users size={20} className="mr-3 text-blue-400 group-hover:text-blue-300" />
                                        <span className="font-medium text-white group-hover:text-cyan-400">Add New Student</span>
                                    </Link>
                                    <Link to="/admin/results-reports" className="flex items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group">
                                        <FileText size={20} className="mr-3 text-yellow-400 group-hover:text-yellow-300" />
                                        <span className="font-medium text-white group-hover:text-cyan-400">Generate Report</span>
                                    </Link>
                                    <Link to="/admin/rewards-leaderboard" className="flex items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group">
                                        <Award size={20} className="mr-3 text-purple-400 group-hover:text-purple-300" />
                                        <span className="font-medium text-white group-hover:text-cyan-400">Manage Rewards</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Admin control center ⚙️" />
        </div>
    );
};

export default AdminDashboardPage;