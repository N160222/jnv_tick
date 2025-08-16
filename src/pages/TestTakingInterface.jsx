"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestHeader from '../components/TestHeader';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, Menu, X, Book, PenTool } from 'lucide-react';

// Mock data for a test
const mockTestQuestions = [
    { id: 1, type: 'mcq', question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correctAnswer: "Delhi" },
    { id: 2, type: 'drawing', question: "Draw the next figure in the sequence: Circle, Square, Triangle, ...", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Diagram" },
    { id: 3, type: 'mcq', question: "Which number comes next in the series: 2, 4, 6, 8, ...?", options: ["9", "10", "11", "12"], correctAnswer: "10" },
    { id: 4, type: 'short_answer', question: "Explain the concept of 'Prime Numbers' in your own words." },
    { id: 5, type: 'mcq', question: "What is 7 multiplied by 8?", options: ["49", "56", "64", "72"], correctAnswer: "56" },
    { id: 6, type: 'drawing', question: "Identify the odd one out: (Image A), (Image B), (Image C), (Image D)", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Figures" },
    { id: 7, type: 'mcq', question: "Which of these is a mammal?", options: ["Snake", "Fish", "Bird", "Cow"], correctAnswer: "Cow" },
    { id: 8, type: 'short_answer', question: "Describe the main function of the heart." },
    { id: 9, type: 'mcq', question: "If a dozen eggs cost $3, how much do 4 eggs cost?", options: ["$1", "$1.50", "$2", "$0.75"], correctAnswer: "$1" },
    { id: 10, type: 'drawing', question: "Complete the pattern: (Pattern 1), (Pattern 2), (Pattern 3), ...", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Pattern" },
];

const TestTakingInterface = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(mockTestQuestions.length).fill(null)); // null: skipped, 'answered': answered
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds for mock timer
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const totalQuestions = mockTestQuestions.length;
    const currentQuestion = mockTestQuestions[currentQuestionIndex];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmitTest(); // Auto-submit on timer end
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
        if (!isDesktop) {
            setIsSidePanelOpen(false); // Close drawer on mobile after selection
        }
    };

    const handleAnswerSelection = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = option; // Store the selected option
        setAnswers(newAnswers);
    };

    const handleQuitTest = () => {
        setShowQuitModal(true);
    };

    const confirmQuit = () => {
        setShowQuitModal(false);
        navigate('/dashboard'); // Go back to dashboard
    };

    const handleSubmitTest = () => {
        setShowSubmitModal(true);
    };

    const confirmSubmit = () => {
        setShowSubmitModal(false);
        navigate('/results'); // Placeholder for P6
    };

    const getQuestionStatus = (index) => {
        if (index === currentQuestionIndex) return 'current';
        if (answers[index] !== null) return 'answered';
        return 'skipped';
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Book size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <PenTool size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <TestHeader testTitle="Mock Test: General Aptitude" studentName="Anusha" onQuitTest={handleQuitTest} />

            <main className="flex-grow flex relative z-10">
                {/* Side Panel (Desktop) / Mobile Drawer Button */}
                {isDesktop ? (
                    <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 overflow-y-auto animate-fade-in-left">
                        <h3 className="text-lg font-bold text-white mb-4">Questions</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {mockTestQuestions.map((_, index) => {
                                const status = getQuestionStatus(index);
                                let bgColor = 'bg-slate-700 hover:bg-slate-600';
                                if (status === 'current') bgColor = 'bg-blue-600 hover:bg-blue-500';
                                else if (status === 'answered') bgColor = 'bg-green-600/50 hover:bg-green-500/50';
                                else if (status === 'skipped') bgColor = 'bg-red-600/50 hover:bg-red-500/50';

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleQuestionClick(index)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-colors ${bgColor}`}
                                    >
                                        {index + 1}
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
                                {mockTestQuestions.map((_, index) => {
                                    const status = getQuestionStatus(index);
                                    let bgColor = 'bg-slate-700 hover:bg-slate-600';
                                    if (status === 'current') bgColor = 'bg-blue-600 hover:bg-blue-500';
                                    else if (status === 'answered') bgColor = 'bg-green-600/50 hover:bg-green-500/50';
                                    else if (status === 'skipped') bgColor = 'bg-red-600/50 hover:bg-red-500/50';

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleQuestionClick(index)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-colors ${bgColor}`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex-grow" onClick={() => setIsSidePanelOpen(false)}></div> {/* Overlay to close drawer */}
                    </div>
                )}

                {/* Main Test Content */}
                <div className="flex-grow p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center">
                    <div className="glass-effect rounded-2xl p-6 sm:p-8 w-full max-w-3xl animate-fade-in-up">
                        {/* Top Row: Question Number & Timer */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
                            <span className="text-lg font-semibold text-white">
                                Q {currentQuestionIndex + 1} of {totalQuestions}
                            </span>
                            <div className={`text-2xl font-bold ${timeLeft <= 120 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        {/* Question Box */}
                        <div className="mb-8">
                            <p className="text-xl text-slate-300 leading-relaxed">{currentQuestion.question}</p>
                            {currentQuestion.image && (
                                <img src={currentQuestion.image} alt="Question Diagram" className="mt-4 max-w-full h-auto rounded-lg shadow-md" />
                            )}
                        </div>

                        {/* Answer Options Section */}
                        {currentQuestion.type === 'mcq' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelection(option)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                                            ${answers[currentQuestionIndex] === option
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/30'
                                                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500'
                                            }`}
                                    >
                                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                                    </button>
                                ))}
                            </div>
                        )}
                        {currentQuestion.type === 'drawing' && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400 h-48 flex items-center justify-center">
                                <p>Drawing/Diagram input area (mock)</p>
                            </div>
                        )}
                        {currentQuestion.type === 'short_answer' && (
                            <textarea
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition h-32"
                                placeholder="Type your answer here..."
                            ></textarea>
                        )}

                        {/* Navigation Row */}
                        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-700">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                <ChevronLeft size={20} className="mr-2" /> Previous
                            </button>
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105 flex items-center"
                                >
                                    Next <ChevronRight size={20} className="ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitTest}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                                >
                                    Submit Test
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal={true} /> {/* Pass a prop to make footer minimal */}

            {/* Quit Confirmation Modal */}
            {showQuitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center shadow-xl animate-scale-in">
                        <h3 className="text-xl font-bold text-white mb-4">Quit Test?</h3>
                        <p className="text-slate-300 mb-6">Are you sure you want to quit? Your progress will not be saved.</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={confirmQuit}
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                            >
                                Yes, Quit
                            </button>
                            <button
                                onClick={() => setShowQuitModal(false)}
                                className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center shadow-xl animate-scale-in">
                        <h3 className="text-xl font-bold text-white mb-4">Submit Test?</h3>
                        <p className="text-slate-300 mb-6">Are you sure you want to submit your test?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={confirmSubmit}
                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                            >
                                Yes, Submit
                            </button>
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestTakingInterface;