"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, XCircle, MinusCircle, ChevronDown, ChevronUp, Menu } from 'lucide-react';

// Mock data for review questions (extended from TestTakingInterface)
const mockReviewQuestions = [
    { id: 1, type: 'mcq', question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correctAnswer: "Delhi", userAnswer: "Delhi", status: "correct" },
    { id: 2, type: 'drawing', question: "Draw the next figure in the sequence: Circle, Square, Triangle, ...", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Diagram", userAnswer: null, status: "skipped" },
    { id: 3, type: 'mcq', question: "Which number comes next in the series: 2, 4, 6, 8, ...?", options: ["9", "10", "11", "12"], correctAnswer: "10", userAnswer: "9", status: "wrong" },
    { id: 4, type: 'short_answer', question: "Explain the concept of 'Prime Numbers' in your own words.", correctAnswer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.", userAnswer: "A number that can only be divided by 1.", status: "wrong" },
    { id: 5, type: 'mcq', question: "What is 7 multiplied by 8?", options: ["49", "56", "64", "72"], correctAnswer: "56", userAnswer: "56", status: "correct" },
    { id: 6, type: 'drawing', question: "Identify the odd one out: (Image A), (Image B), (Image C), (Image D)", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Figures", userAnswer: null, status: "skipped" },
    { id: 7, type: 'mcq', question: "Which of these is a mammal?", options: ["Snake", "Fish", "Bird", "Cow"], correctAnswer: "Cow", userAnswer: "Bird", status: "wrong" },
    { id: 8, type: 'short_answer', question: "Describe the main function of the heart.", correctAnswer: "The heart's main function is to pump blood throughout the body, delivering oxygen and nutrients to cells and removing waste products.", userAnswer: "It pumps blood.", status: "wrong" },
    { id: 9, type: 'mcq', question: "If a dozen eggs cost $3, how much do 4 eggs cost?", options: ["$1", "$1.50", "$2", "$0.75"], correctAnswer: "$1", userAnswer: "$1", status: "correct" },
    { id: 10, type: 'drawing', question: "Complete the pattern: (Pattern 1), (Pattern 2), (Pattern 3), ...", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Pattern", userAnswer: null, status: "skipped" },
    { id: 11, type: 'mcq', question: "What is the square root of 81?", options: ["7", "8", "9", "10"], correctAnswer: "9", userAnswer: "9", status: "correct" },
    { id: 12, type: 'mcq', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars", userAnswer: "Mars", status: "correct" },
    { id: 13, type: 'short_answer', question: "Name two primary colors.", correctAnswer: "Red, Yellow, Blue", userAnswer: "Red and Green", status: "wrong" },
    { id: 14, type: 'mcq', question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: "7", userAnswer: "6", status: "wrong" },
    { id: 15, type: 'drawing', question: "Identify the missing part of the figure.", image: "https://via.placeholder.com/150/FFFF00/000000?text=Missing+Part", userAnswer: null, status: "skipped" },
];

const ReviewAnswersPage = () => {
    const [openQuestionId, setOpenQuestionId] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const questionRefs = useRef({});

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleQuestion = (id) => {
        setOpenQuestionId(openQuestionId === id ? null : id);
    };

    const scrollToQuestion = (id) => {
        questionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!isDesktop) {
            setIsSidePanelOpen(false); // Close drawer on mobile after selection
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'correct': return <CheckCircle size={18} className="text-green-400" />;
            case 'wrong': return <XCircle size={18} className="text-red-400" />;
            case 'skipped': return <MinusCircle size={18} className="text-slate-400" />;
            default: return null;
        }
    };

    const getStatusTagClasses = (status) => {
        switch (status) {
            case 'correct': return 'bg-green-600/30 text-green-200 border-green-500/50';
            case 'wrong': return 'bg-red-600/30 text-red-200 border-red-500/50';
            case 'skipped': return 'bg-slate-700/30 text-slate-400 border-slate-600/50';
            default: return '';
        }
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            <Header />

            <main className="flex-grow flex relative z-10">
                {/* Side Panel (Desktop) / Mobile Drawer Button */}
                {isDesktop ? (
                    <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 overflow-y-auto animate-fade-in-left">
                        <h3 className="text-lg font-bold text-white mb-4">Questions</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {mockReviewQuestions.map((q, index) => {
                                let bgColor = 'bg-slate-700 hover:bg-slate-600';
                                if (q.status === 'correct') bgColor = 'bg-green-600/50 hover:bg-green-500/50';
                                else if (q.status === 'wrong') bgColor = 'bg-red-600/50 hover:bg-red-500/50';
                                else if (q.status === 'skipped') bgColor = 'bg-slate-600/50 hover:bg-slate-500/50';

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => scrollToQuestion(q.id)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-colors ${bgColor}`}
                                    >
                                        {q.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsSidePanelOpen(true)}
                        className="fixed bottom-24 right-6 z-40 p-4 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-500 transition-colors flex items-center justify-center"
                    >
                        <Menu size={24} />
                    </button>
                )}

                {/* Mobile Side Panel Drawer */}
                {!isDesktop && isSidePanelOpen && (
                    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex">
                        <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto animate-slide-in-left">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white">Questions</h3>
                                <button onClick={() => setIsSidePanelOpen(false)} className="text-slate-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {mockReviewQuestions.map((q, index) => {
                                    let bgColor = 'bg-slate-700 hover:bg-slate-600';
                                    if (q.status === 'correct') bgColor = 'bg-green-600/50 hover:bg-green-500/50';
                                    else if (q.status === 'wrong') bgColor = 'bg-red-600/50 hover:bg-red-500/50';
                                    else if (q.status === 'skipped') bgColor = 'bg-slate-600/50 hover:bg-slate-500/50';

                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => scrollToQuestion(q.id)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-colors ${bgColor}`}
                                        >
                                            {q.id}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex-grow" onClick={() => setIsSidePanelOpen(false)}></div> {/* Overlay to close drawer */}
                    </div>
                )}

                {/* Main Review Content */}
                <div className="flex-grow p-4 sm:p-8 lg:p-12 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Review Your Answers</h1>
                            <p className="mt-2 text-lg text-slate-400">Test: General Aptitude Mock Test</p>
                        </div>

                        <div className="space-y-6">
                            {mockReviewQuestions.map((q) => (
                                <div
                                    key={q.id}
                                    ref={(el) => (questionRefs.current[q.id] = el)}
                                    className={`glass-effect rounded-2xl p-6 transition-all duration-300
                                        ${q.status === 'correct' ? 'border-green-500/50 hover:shadow-green-900/30' : ''}
                                        ${q.status === 'wrong' ? 'border-red-500/50 hover:shadow-red-900/30' : ''}
                                        ${q.status === 'skipped' ? 'border-slate-700/50 hover:shadow-slate-900/30' : ''}
                                    `}
                                >
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleQuestion(q.id)}
                                    >
                                        <h2 className="text-xl font-bold text-white flex items-center">
                                            Q{q.id}. {q.question}
                                            <span className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusTagClasses(q.status)}`}>
                                                {getStatusIcon(q.status)} {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                                            </span>
                                        </h2>
                                        {openQuestionId === q.id ? (
                                            <ChevronUp size={24} className="text-slate-400" />
                                        ) : (
                                            <ChevronDown size={24} className="text-slate-400" />
                                        )}
                                    </div>

                                    {openQuestionId === q.id && (
                                        <div className="mt-6 pt-4 border-t border-slate-700 animate-fade-in-up">
                                            {q.image && (
                                                <img src={q.image} alt="Question Diagram" className="mb-4 max-w-full h-auto rounded-lg shadow-md" />
                                            )}

                                            <div className="mb-4">
                                                <p className="text-slate-400 text-sm mb-1">Your Answer:</p>
                                                <div className={`p-3 rounded-lg border ${q.status === 'correct' ? 'bg-green-900/30 border-green-500 text-green-200' : q.status === 'wrong' ? 'bg-red-900/30 border-red-500 text-red-200' : 'bg-slate-800/50 border-slate-700 text-slate-300'}`}>
                                                    {q.userAnswer !== null ? q.userAnswer : "N/A (Skipped)"}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-slate-400 text-sm mb-1">Correct Answer:</p>
                                                <div className="p-3 rounded-lg bg-green-900/30 border border-green-500 text-green-200">
                                                    {q.correctAnswer}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 z-20 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    to="/results"
                    className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                >
                    Back to Results
                </Link>
                <Link
                    to="/mock-tests"
                    className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                    Try Another Test
                </Link>
                <Link
                    to="/dashboard"
                    className="w-full sm:w-auto text-center px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                    Back to Dashboard
                </Link>
            </div>

            <Footer minimal="Review your mistakes and come back stronger 💡" />
        </div>
    );
};

export default ReviewAnswersPage;