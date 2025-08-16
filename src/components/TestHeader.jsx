"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const TestHeader = ({ testTitle, studentName, onQuitTest }) => {
    return (
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link to="/dashboard" className="flex-shrink-0">
                    <h1 className="text-2xl font-bold text-white tracking-wider glow-text">
                        Navodaya <span className="text-cyan-400">AI</span> Prep
                    </h1>
                </Link>
                <div className="flex-grow text-center">
                    <h2 className="text-xl font-semibold text-white truncate px-4">{testTitle}</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/40" alt="User avatar" />
                        <span className="text-white hidden sm:inline">{studentName}</span>
                    </div>
                    <button
                        onClick={onQuitTest}
                        className="px-4 py-2 border border-red-600 text-red-400 font-semibold rounded-md hover:bg-red-900/30 transition-colors duration-200 flex items-center"
                    >
                        <X size={18} className="mr-1" /> Quit Test
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default TestHeader;