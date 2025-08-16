import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative main-bg-gradient min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                {/* Placeholder for particle animation */}
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left animate-fade-in-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                            Crack the JNV Exam with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Power</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0">
                            Personalized mock tests, real-time performance tracking, and an AI tutor — all in your language.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                                Start Free Test
                            </Link>
                            <Link to="/pricing" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-500 text-slate-200 font-bold rounded-lg hover:bg-slate-800 hover:border-slate-700 transform hover:scale-105 transition-all duration-300">
                                See Pricing
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block animate-fade-in-right">
                        <img src="https://storage.googleapis.com/pai-images/f56270425a6a452199f1851241b9d4e9.jpeg" alt="Futuristic illustration of a student learning with an AI hologram" className="rounded-2xl shadow-2xl shadow-cyan-900/50" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;