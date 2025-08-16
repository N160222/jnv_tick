"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, CheckCircle, XCircle, Clock, SkipForward } from 'lucide-react';

const TestResultsPage = () => {
    const studentName = "Anusha"; // Mock student name
    const testTitle = "General Aptitude Mock Test"; // Mock test title
    const mockScore = 72; // Mock score percentage
    const mockCorrect = 15;
    const mockWrong = 4;
    const mockSkipped = 1;
    const mockTimeTaken = "28 mins";

    const [isDesktop, setIsDesktop] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        // Trigger confetti animation once on load
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="confetti" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
                        }}></div>
                    ))}
                </div>
            )}

            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                    {/* Main Results Card */}
                    <div className="glass-effect rounded-2xl p-6 sm:p-8 w-full max-w-3xl animate-fade-in-up">
                        {/* Top Section: Celebratory */}
                        <div className="text-center mb-8">
                            <Award size={64} className="text-yellow-400 mx-auto mb-4 animate-bounce-once" />
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                                Congratulations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{studentName}</span>!
                            </h1>
                            <p className="text-lg text-slate-400">You have completed the {testTitle}.</p>
                        </div>

                        {/* Score Section */}
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8 mb-10">
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-slate-800/50"></div>
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(#06b6d4 ${mockScore}%, #475569 ${mockScore}%)`,
                                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #fff calc(100% - 10px + 1px))'
                                    }}
                                ></div>
                                <span className="relative z-10 text-4xl font-bold text-white">{mockScore}%</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-lg">
                                <div className="flex items-center text-green-400">
                                    <CheckCircle size={20} className="mr-2" /> Correct: <span className="font-bold ml-2">{mockCorrect}</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <XCircle size={20} className="mr-2" /> Wrong: <span className="font-bold ml-2">{mockWrong}</span>
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    <SkipForward size={20} className="mr-2" /> Skipped: <span className="font-bold ml-2">{mockSkipped}</span>
                                </div>
                                <div className="flex items-center text-slate-400">
                                    <Clock size={20} className="mr-2" /> Time: <span className="font-bold ml-2">{mockTimeTaken}</span>
                                </div>
                            </div>
                        </div>

                        {/* Performance Graph Section Placeholder */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400 h-48 flex items-center justify-center mb-10">
                            <p>Detailed performance graph coming soon!</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/review-answers" // Placeholder for P7
                                className="w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Review Answers
                            </Link>
                            <Link
                                to="/mock-tests"
                                className="w-full sm:w-auto text-center px-8 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                Try Another Test
                            </Link>
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-200"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Side Panel (Desktop Only) */}
                    {isDesktop && (
                        <div className="w-80 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center animate-fade-in-right flex flex-col items-center justify-center">
                            <img src="https://storage.googleapis.com/pai-images/468095b9227c4b77a5840b106201b2f7.jpeg" alt="AI teacher hologram" className="max-w-[150px] mx-auto mb-6 rounded-full shadow-lg" />
                            <h3 className="text-xl font-bold text-white mb-3">Great Effort!</h3>
                            <p className="text-slate-400 text-sm">
                                "Every step forward, no matter how small, is progress. Keep learning, keep growing!"
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer minimal={true} />
        </div>
    );
};

export default TestResultsPage;