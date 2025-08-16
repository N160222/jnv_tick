"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Brain, BookOpen, SlidersHorizontal, PlusCircle, Save, ArrowLeft, FileText, Loader, CheckCircle, XCircle } from 'lucide-react';

const AITestGenerationPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation hook
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
    const [numQuestions, setNumQuestions] = useState(20);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTest, setGeneratedTest] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);

    const allSubjects = ["Reasoning", "Mathematics", "Language", "Drawing"];
    const difficulties = ["Easy", "Medium", "Hard"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to pre-fill form if templateData is passed via location state
    useEffect(() => {
        if (location.state?.templateData) {
            const { subjects, difficulty, numQuestions } = location.state.templateData;
            setSelectedSubjects(subjects || []);
            setSelectedDifficulty(difficulty || 'Medium');
            setNumQuestions(numQuestions || 20);
            // Clear the state so it doesn't persist on refresh/back
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]); // Depend on location.state

    const handleSubjectChange = (subject) => {
        setSelectedSubjects(prev =>
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    const handleGenerateTest = () => {
        if (selectedSubjects.length === 0) {
            alert("Please select at least one subject.");
            return;
        }
        if (numQuestions < 5 || numQuestions > 50) {
            alert("Number of questions must be between 5 and 50.");
            return;
        }

        setIsGenerating(true);
        setGeneratedTest(null); // Clear previous generated test

        setTimeout(() => {
            const generatedName = `AI Test #${Math.floor(Math.random() * 1000)}`;
            const totalGeneratedQuestions = numQuestions;
            const questionsPerSubject = Math.floor(totalGeneratedQuestions / selectedSubjects.length);
            const remainder = totalGeneratedQuestions % selectedSubjects.length;

            const sections = selectedSubjects.map((subject, index) => ({
                name: subject,
                questions: questionsPerSubject + (index < remainder ? 1 : 0)
            }));

            setGeneratedTest({
                id: Date.now(), // Unique ID for mock
                name: generatedName,
                subject: selectedSubjects.join(', '),
                difficulty: selectedDifficulty,
                totalQuestions: totalGeneratedQuestions,
                sections: sections,
                previewQuestions: [
                    { id: 1, text: "What is the capital of India?", type: "MCQ" },
                    { id: 2, text: "Draw the next figure in the sequence: Circle, Square, Triangle, ...", type: "Drawing" },
                ]
            });
            setIsGenerating(false);
        }, 3000); // Simulate AI generation time
    };

    const handleSaveTest = () => {
        alert(`Test "${generatedTest.name}" saved to database!`);
        // In a real app, you'd send generatedTest data to your backend
        navigate('/admin/manage-tests'); // Navigate to manage tests page
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Brain size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        {/* Floating test papers effect */}
                        <FileText size={48} className="absolute top-1/4 left-1/4 text-blue-500 animate-float-1" />
                        <FileText size={36} className="absolute bottom-1/4 right-1/4 text-purple-500 animate-float-2" />
                        <FileText size={56} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 animate-float-3" />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center">
                                <Brain size={36} className="mr-3 text-cyan-400 animate-pulse-slow" /> AI Test Generator
                            </h1>
                            <p className="mt-2 text-lg text-slate-400">Craft new mock tests with intelligent automation.</p>
                        </div>

                        {/* Test Generation Form */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><SlidersHorizontal size={24} className="mr-3 text-purple-400" /> Test Configuration</h2>

                            {/* Step 1: Select Subject */}
                            <div className="mb-6">
                                <label className="block text-lg font-medium text-slate-300 mb-3">Step 1: Select Subject(s)</label>
                                <div className="flex flex-wrap gap-3">
                                    {allSubjects.map(subject => (
                                        <button
                                            key={subject}
                                            type="button"
                                            onClick={() => handleSubjectChange(subject)}
                                            className={`px-5 py-2 rounded-full font-semibold transition-all duration-200
                                                ${selectedSubjects.includes(subject)
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 shadow-md'
                                                    : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500'
                                                }`}
                                        >
                                            {subject}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Select Difficulty Level */}
                            <div className="mb-6">
                                <label className="block text-lg font-medium text-slate-300 mb-3">Step 2: Select Difficulty Level</label>
                                <div className="flex flex-wrap gap-3">
                                    {difficulties.map(difficulty => (
                                        <label key={difficulty} className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="difficulty"
                                                value={difficulty}
                                                checked={selectedDifficulty === difficulty}
                                                onChange={() => setSelectedDifficulty(difficulty)}
                                                className="form-radio h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                                            />
                                            <span className="ml-2 text-slate-300">{difficulty}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Number of Questions */}
                            <div className="mb-8">
                                <label htmlFor="numQuestions" className="block text-lg font-medium text-slate-300 mb-3">Step 3: Number of Questions (5-50)</label>
                                <input
                                    type="number"
                                    id="numQuestions"
                                    min="5"
                                    max="50"
                                    value={numQuestions}
                                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                />
                            </div>

                            {/* Generate Test Button */}
                            <button
                                onClick={handleGenerateTest}
                                disabled={isGenerating}
                                className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader size={24} className="mr-3 animate-spin" /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <Brain size={24} className="mr-3" /> Generate Test with AI
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Preview Card */}
                        {generatedTest && (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center"><FileText size={24} className="mr-3 text-green-400" /> Test Preview</h2>
                                <div className="mb-4">
                                    <p className="text-slate-400 text-sm">Test Name:</p>
                                    <p className="text-white text-lg font-semibold">{generatedTest.name}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-slate-400 text-sm">Subject(s):</p>
                                    <p className="text-white text-lg font-semibold">{generatedTest.subject}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-slate-400 text-sm">Difficulty:</p>
                                    <p className="text-white text-lg font-semibold">{generatedTest.difficulty}</p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-slate-400 text-sm">Total Questions:</p>
                                    <p className="text-white text-lg font-semibold">{generatedTest.totalQuestions}</p>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-4">Section Breakdown:</h3>
                                <ul className="list-disc list-inside text-slate-300 mb-6">
                                    {generatedTest.sections.map((section, index) => (
                                        <li key={index}>{section.name}: {section.questions} Questions</li>
                                    ))}
                                </ul>

                                <h3 className="text-lg font-bold text-white mb-4">Example Questions:</h3>
                                <div className="space-y-4 mb-8">
                                    {generatedTest.previewQuestions.map((q, index) => (
                                        <div key={q.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <p className="text-slate-300 font-medium">Q{index + 1}. {q.text}</p>
                                            <p className="text-slate-500 text-sm mt-1">Type: {q.type}</p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSaveTest}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-lime-600 text-slate-900 font-bold text-lg rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <Save size={24} className="mr-3" /> Save Test to Database
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Action Buttons */}
            <div className="sticky bottom-0 z-20 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    to="/admin/ai-test-templates"
                    className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to AI Test Templates
                </Link>
                <Link
                    to="/admin/manage-tests"
                    className="w-full sm:w-auto text-center px-8 py-3 border border-purple-600 text-purple-300 font-semibold rounded-lg hover:bg-purple-900/30 hover:text-white transition-colors duration-200"
                >
                    Go to Manage Tests
                </Link>
            </div>

            <Footer minimal="Generate smart, learn smart 🧠" />
        </div>
    );
};

export default AITestGenerationPage;