"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Corrected: Removed space after Header
import Footer from '../components/Footer';
import { BellRing, Award, Mail, Zap, Bell, X, Info, CalendarDays, CheckCircle, Paperclip } from 'lucide-react'; // Import necessary icons

// Mock Data for notifications (aligned with admin announcements)
const mockNotifications = [
    { id: 1, type: 'Urgent Alert', icon: '⚡', title: "Important Fee Reminder", message: "This is a gentle reminder for the pending tuition fees. Please ensure payment by 20th August to avoid any interruptions in service.", date: "14 Aug 2024", read: false, urgent: true },
    { id: 2, type: 'Exam Update', icon: '📢', title: "Mock Test Schedule Update", message: "Please note the revised schedule for the upcoming Reasoning Mock Test. The test will now be held on 25th August at 10:00 AM.", date: "15 Aug 2024", read: false, urgent: false },
    { id: 3, type: 'Result Published', icon: '🏆', title: "July Performance Results Published", message: "The detailed performance reports for all tests attempted in July are now available on your student dashboard. Review your progress!", date: "12 Aug 2024", read: true, urgent: false, attachments: ['July_Report_Summary.pdf'] },
    { id: 4, type: 'General Info', icon: '💡', title: "New AI Tutor Features", message: "Exciting news! Our AI Tutor now supports voice input and provides instant feedback on drawing questions. Try it out!", date: "10 Aug 2024", read: true, urgent: false },
    { id: 5, type: 'General Info', icon: '🎉', title: "Congratulations! You unlocked Consistency Badge", message: "You've maintained consistent practice for over a month!", date: "08 Aug 2024", read: false, urgent: false },
    { id: 6, type: 'Exam Update', icon: '📅', title: "Upcoming Holiday Announcement", message: "The academy will remain closed on 26th January for Republic Day. Classes will resume on 27th January.", date: "05 Aug 2024", read: true, urgent: false },
];

const NotificationCard = ({ notification, onClick, isUnread }) => {
    const getIconComponent = (type) => {
        switch (type) {
            case 'General Info': return <Info size={24} className="text-blue-400" />;
            case 'Exam Update': return <CalendarDays size={24} className="text-cyan-400" />;
            case 'Result Published': return <Award size={24} className="text-purple-400" />;
            case 'Urgent Alert': return <Zap size={24} className="text-red-400" />;
            default: return <Bell size={24} className="text-slate-400" />;
        }
    };

    const getTypeTagClasses = (type) => {
        switch (type) {
            case 'General Info': return 'bg-blue-600/30 text-blue-200 border-blue-500/50';
            case 'Exam Update': return 'bg-cyan-600/30 text-cyan-200 border-cyan-500/50';
            case 'Result Published': return 'bg-purple-600/30 text-purple-200 border-purple-500/50';
            case 'Urgent Alert': return 'bg-red-600/30 text-red-200 border-red-500/50';
            default: return '';
        }
    };

    return (
        <div
            className={`relative glass-effect rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg
            ${isUnread ? 'border-cyan-500/50 bg-slate-800/50 animate-pulse-light' : 'border-slate-800/50 bg-slate-900/30'}
            ${notification.urgent ? 'border-red-500/50 ring-2 ring-red-500/50' : ''}
            `}
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
                <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getTypeTagClasses(notification.type)}`}>
                        {notification.type}
                    </span>
                    {notification.attachments && notification.attachments.length > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full border border-slate-600 text-slate-400">
                            Attachment
                        </span>
                    )}
                </div>
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

    const sortedNotifications = [...notifications].sort((a, b) => {
        // Urgent alerts first, then by date (latest first)
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return new Date(b.date) - new Date(a.date);
    });

    const filteredNotifications = sortedNotifications.filter(notif => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Unread' && !notif.read) return true;
        if (activeTab === 'Urgent' && notif.urgent) return true;
        if (activeTab === 'Exam Updates' && notif.type === 'Exam Update') return true;
        if (activeTab === 'Results' && notif.type === 'Result Published') return true;
        return false;
    });

    const handleNotificationClick = (notif) => {
        setSelectedNotification(notif);
        setShowNotificationModal(true);
        // Mark as read
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        alert("All notifications marked as read.");
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all notifications? This action cannot be undone.")) {
            setNotifications([]); // Clear all notifications (mock)
            alert("All notifications cleared.");
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
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">🔔 Your Notifications</h1>
                            <p className="mt-2 text-lg text-slate-400">Stay updated with all your alerts and messages.</p>
                        </div>

                        {/* Top Filter Bar */}
                        <div className="flex justify-center gap-2 sm:gap-4 p-2 bg-slate-900/50 border border-slate-800 rounded-xl mb-8 overflow-x-auto">
                            {['All', 'Unread', 'Urgent', 'Exam Updates', 'Results'].map(tab => (
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
                                <div className="text-center text-slate-400 py-10 glass-effect rounded-2xl">
                                    <Bell size={64} className="mx-auto mb-4 text-slate-600" />
                                    <h2 className="text-xl font-bold text-white mb-2">No notifications here!</h2>
                                    <p>You're all caught up, or there are no updates for this category.</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                <CheckCircle size={20} className="mr-2" /> Mark All as Read
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="w-full sm:w-auto text-center px-8 py-3 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors duration-200"
                            >
                                <X size={20} className="mr-2" /> Clear All
                            </button>
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Stay updated, stay ahead 🚀" />

            {/* Notification Detail Modal */}
            {showNotificationModal && selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 shadow-xl animate-scale-in max-w-md w-full mx-4 relative">
                        <button onClick={() => setShowNotificationModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{selectedNotification.title}</h3>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getTypeTagClasses(selectedNotification.type)}`}>
                                {selectedNotification.type}
                            </span>
                        </div>
                        <p className="text-slate-300 mb-6">{selectedNotification.message}</p>
                        {selectedNotification.attachments && selectedNotification.attachments.length > 0 && (
                            <div className="mb-4">
                                <p className="text-slate-400 text-sm mb-2">Attachments:</p>
                                {selectedNotification.attachments.map((file, index) => (
                                    <a key={index} href="#" onClick={(e) => { e.preventDefault(); alert(`Mock: Downloading ${file}`); }} className="flex items-center text-cyan-400 hover:underline text-sm">
                                        <Paperclip size={16} className="mr-2" /> {file}
                                    </a>
                                ))}
                            </div>
                        )}
                        <p className="text-slate-500 text-sm text-right">{selectedNotification.date}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;