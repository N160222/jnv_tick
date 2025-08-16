"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Lock, Settings, Sun, Moon, Bell, Globe, CheckCircle, XCircle } from 'lucide-react';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);

    // Mock state for form fields
    const [profile, setProfile] = useState({
        name: "Anusha Sharma",
        email: "anusha.sharma@example.com",
        phone: "9876543210",
        avatar: "https://i.pravatar.cc/150?img=48"
    });
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [preferences, setPreferences] = useState({
        theme: 'dark', // 'light' or 'dark'
        notifications: true,
        language: 'English'
    });

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mock success/error popup
    const showPopup = (message, type = 'success') => {
        alert(`${type === 'success' ? '✅ Success: ' : '❌ Error: '}${message}`);
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        // Mock save logic
        console.log("Saving profile:", profile);
        showPopup("Profile updated successfully!");
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // Mock validation
        if (password.new === '' || password.confirm === '') {
            showPopup("New password and confirm password cannot be empty.", "error");
            return;
        }
        if (password.new !== password.confirm) {
            showPopup("New password and confirm password do not match.", "error");
            return;
        }
        if (password.current === '') {
            showPopup("Please enter your current password.", "error");
            return;
        }
        // Mock update logic
        console.log("Updating password...");
        showPopup("Password updated successfully!");
        setPassword({ current: '', new: '', confirm: '' }); // Clear fields
    };

    const handlePreferencesSave = (e) => {
        e.preventDefault();
        // Mock save logic
        console.log("Saving preferences:", preferences);
        showPopup("Preferences saved successfully!");
    };

    const handleResetDefaults = () => {
        if (window.confirm("Are you sure you want to reset all settings to default?")) {
            setProfile({
                name: "Anusha Sharma",
                email: "anusha.sharma@example.com",
                phone: "9876543210",
                avatar: "https://i.pravatar.cc/150?img=48"
            });
            setPreferences({
                theme: 'dark',
                notifications: true,
                language: 'English'
            });
            showPopup("Settings reset to defaults!");
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
                        <Settings size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Lock size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Settings</h1>
                            <p className="mt-2 text-lg text-slate-400">Manage your account preferences and app settings.</p>
                        </div>

                        {/* Profile Settings */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><User size={24} className="mr-3 text-cyan-400" /> Profile Settings</h2>
                            <form onSubmit={handleProfileSave} className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="flex-shrink-0">
                                        <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-700" />
                                        <button className="mt-2 text-sm text-cyan-400 hover:underline">Change Avatar (Mock)</button>
                                    </div>
                                    <div className="flex-grow w-full space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105">
                                    Save Changes
                                </button>
                            </form>
                        </div>

                        {/* Password & Security */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Lock size={24} className="mr-3 text-purple-400" /> Password & Security</h2>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div>
                                    <label htmlFor="current-password" className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        id="current-password"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={password.current}
                                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={password.new}
                                        onChange={(e) => setPassword({ ...password, new: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={password.confirm}
                                        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                    Update Password
                                </button>
                            </form>
                        </div>

                        {/* App Preferences */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Settings size={24} className="mr-3 text-yellow-400" /> App Preferences</h2>
                            <form onSubmit={handlePreferencesSave} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="theme-toggle" className="text-slate-300 flex items-center">
                                        {preferences.theme === 'dark' ? <Moon size={20} className="mr-2 text-blue-400" /> : <Sun size={20} className="mr-2 text-yellow-400" />}
                                        Theme: {preferences.theme === 'dark' ? 'Dark' : 'Light'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPreferences({ ...preferences, theme: preferences.theme === 'dark' ? 'light' : 'dark' })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${preferences.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200 focus:ring-gray-500'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="notifications-toggle" className="text-slate-300 flex items-center">
                                        <Bell size={20} className="mr-2 text-green-400" /> Notifications
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${preferences.notifications ? 'bg-green-600' : 'bg-gray-200 focus:ring-gray-500'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                                        <Globe size={20} className="mr-2 text-orange-400" /> Language
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="language"
                                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            value={preferences.language}
                                            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                        >
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Telugu">Telugu</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                                    Save Preferences
                                </button>
                            </form>
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
                                onClick={handleResetDefaults}
                                className="w-full sm:w-auto text-center px-8 py-3 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors duration-200"
                            >
                                Reset to Defaults
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Your account, your control ⚡" />
        </div>
    );
};

export default SettingsPage;