"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BellRing, Award, Mail, Zap, Bell, X } from 'lucide-react'; // Import necessary icons

// Mock data for notifications
const mockNotifications = [
    { id: 1, type: 'achievement', icon: '🎉', title: "Congratulations! You unlocked Consistency Badge", message: "You've maintained consistent practice for over a month!", date: "15 Aug 2025", read: false },
    { id: 2, type: 'system', icon: '📢', title: "New Mock Test Available", message: "A new mock test on Science is now available for practice.", date: "14 Aug 2025", read: false },
    { id: 3, type: 'system', icon: '⚡', title: "Scheduled Maintenance Alert", message: "Our platform will undergo maintenance on 20 Aug, 2 AM IST.", date: "13 Aug 2025", read: true },
    { id: 4, type: 'message', icon: '✉️', title: "Message from AI Tutor", message: "Your recent query on 'Prime Numbers' has been answered.", date: "12 Aug 2025", read: false },
    { id: 5, type: 'achievement', icon: '🌟', title: "Top 10 Leaderboard Achieved", message: "You've reached the top 10 on the national leaderboard!", date: "11 Aug 2025", read: true },
    { id: 6, type: 'system', icon: '📢', title: "Platform Update", message: "New features and improvements have been rolled out.", date: "10 Aug 2025", read: true },
    { id: 7, type: 'message', icon: '✉️', title: "Feedback Request", message: "Share your experience to help us improve.", date: "09 Aug 2025", read: true },
    { id: 8, type: 'achievement', icon: '➕', title: "Math Whiz Badge Unlocked", message: "Achieved 95%+ accuracy in Math tests.", date: "08 Aug 2025", read: true },
];

const NotificationCard = ({ notification, onClick, isUnread }) => {
    const getIconComponent = (type) => {
        switch (type) {
            case 'system': return <BellRing size={24} className="text-cyan-400" />;
            case 'achievement': return <Award size={24} className="text-yellow-400" />;
            case 'message': return <Mail size={24} className="text-purple-400" />;
            default: return <Bell size={24} className="text-slate-400" />;
        }
    };

    return (
        <div
            className={`relative glass-effect rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg
            ${isUnread ? 'border-cyan-500/50 bg-slate-800/50 animate-pulse-light' : 'border-slate-800/50 bg-slate-900/30'}`}
            onClick={() => onClick(notification)}
        >
            {isUnread && (
                <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-ping-slow"></span>
            )}
            <div className="flex-shrink-0 p-3 rounded-full bg-slate-700/50">
                {getIconComponent(notification.type)}
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{notification.message}</p>
            </div>
            <div className="flex-shrink-0 text-right text-slate-500 text-xs">
                {notification.date}
            </div>
        </div>
    );
};

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [notifications, setNotifications] = useState(mockNotifications);
    const [isDesktop, setIsDesktop] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredNotifications = notifications.filter(notif => {
        if (activeTab === 'All') return true;
        if (activeTab === 'System' && (notif.type === 'system' || notif.icon === '📢' || notif.icon === '⚡')) return true;
        if (activeTab === 'Achievements' && notif.type === 'achievement') return true;
        if (activeTab === 'Messages' && notif.type === 'message') return true;
        return false;
    });

    const handleNotificationClick = (notif) => {
        setSelectedNotification(notif);
        setShowNotificationModal(true);
        // Mark as read (mock functionality)
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    };

    const handleClearAll = () => {
        setNotifications([]); // Clear all notifications (mock)
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        {/* AI hologram projecting flying notifications */}
                        <BellRing size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Mail size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Notifications</h1>
                            <p className="mt-2 text-lg text-slate-400">Stay updated with all your alerts and messages.</p>
                        </div>

                        {/* Top Filter Bar */}
                        <div className="flex justify-center gap-2 sm:gap-4 p-2 bg-slate-900/50 border border-slate-800 rounded-xl mb-8 overflow-x-auto">
                            {['All', 'System', 'Achievements', 'Messages'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 whitespace-nowrap
                                        ${activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 shadow-md' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-4">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notif => (
                                    <NotificationCard
                                        key={notif.id}
                                        notification={notif}
                                        onClick={handleNotificationClick}
                                        isUnread={!notif.read}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-slate-400 py-10">
                                    No notifications found for this category.
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                Back to Dashboard
                            </Link>
                            <button
                                onClick={handleClearAll}
                                className="w-full sm:w-auto text-center px-8 py-3 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors duration-200"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Stay updated, stay ahead 🚀" />

            {/* Notification Detail Modal */}
            {showNotificationModal && selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 shadow-xl animate-scale-in max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">{selectedNotification.title}</h3>
                            <button onClick={() => setShowNotificationModal(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-slate-300 mb-6">{selectedNotification.message}</p>
                        <p className="text-slate-500 text-sm text-right">{selectedNotification.date}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;