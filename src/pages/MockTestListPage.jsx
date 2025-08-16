import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Clock, Search, Filter, ChevronDown } from 'lucide-react';

// Mock data for tests
const mockTests = [
    { id: 1, title: "Reasoning - Pattern Recognition", subject: "Reasoning", difficulty: "Easy", questions: 20, time: "30 min" },
    { id: 2, title: "Maths - Basic Arithmetic", subject: "Maths", difficulty: "Easy", questions: 25, time: "40 min" },
    { id: 3, title: "Drawing - Figure Completion", subject: "Drawing", difficulty: "Medium", questions: 15, time: "25 min" },
    { id: 4, title: "Language - Story Comprehension", subject: "Language Stories", difficulty: "Medium", questions: 30, time: "45 min" },
    { id: 5, title: "Reasoning - Series Completion", subject: "Reasoning", difficulty: "Hard", questions: 22, time: "35 min" },
    { id: 6, title: "Maths - Advanced Algebra", subject: "Maths", difficulty: "Hard", questions: 28, time: "50 min" },
    { id: 7, title: "Drawing - Embedded Figures", subject: "Drawing", difficulty: "Easy", questions: 18, time: "30 min" },
    { id: 8, title: "Language - Grammar Basics", subject: "Language Stories", difficulty: "Easy", questions: 25, time: "35 min" },
    { id: 9, title: "Reasoning - Classification", subject: "Reasoning", difficulty: "Medium", questions: 20, time: "30 min" },
    { id: 10, title: "Maths - Geometry Fundamentals", subject: "Maths", difficulty: "Medium", questions: 22, time: "40 min" },
    { id: 11, title: "Reasoning - Analogy", subject: "Reasoning", difficulty: "Easy", questions: 20, time: "30 min" },
    { id: 12, title: "Maths - Fractions & Decimals", subject: "Maths", difficulty: "Medium", questions: 25, time: "40 min" },
    { id: 13, title: "Drawing - Mirror Images", subject: "Drawing", difficulty: "Hard", questions: 15, time: "25 min" },
    { id: 14, title: "Language - Sentence Structure", subject: "Language Stories", difficulty: "Hard", questions: 30, time: "45 min" },
];

const TestCard = ({ test }) => {
    const difficultyColors = {
        Easy: "bg-green-600/30 text-green-200 border-green-500/50 shadow-green-900/30",
        Medium: "bg-yellow-600/30 text-yellow-200 border-yellow-500/50 shadow-yellow-900/30",
        Hard: "bg-red-600/30 text-red-200 border-red-500/50 shadow-red-900/30",
    };

    return (
        <div className="group relative glass-effect rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/30">
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                 style={{ background: `radial-gradient(circle at center, ${test.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.1)' : test.difficulty === 'Medium' ? 'rgba(250, 204, 21, 0.1)' : 'rgba(239, 68, 68, 0.1)'}, transparent 70%)` }}>
            </div>
            <div className="relative z-10 flex-grow">
                <h3 className="text-xl font-bold text-white mb-3">{test.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-xs bg-blue-600/30 text-blue-200 border border-blue-500/50 rounded-full">
                        {test.subject}
                    </span>
                    <span className={`px-3 py-1 text-xs border rounded-full ${difficultyColors[test.difficulty]}`}>
                        {test.difficulty}
                    </span>
                </div>
                <div className="flex items-center text-slate-400 text-sm space-x-4 mb-6">
                    <div className="flex items-center">
                        <BookOpen size={16} className="mr-1" /> {test.questions} Questions
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="mr-1" /> {test.time}
                    </div>
                </div>
            </div>
            <Link
                to="/test-interface" // Placeholder for P5
                className="relative z-10 w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform group-hover:scale-105"
            >
                Start Test
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Good Luck!
            </div>
        </div>
    );
};

const MockTestListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [showHologram, setShowHologram] = useState(false);

    const subjects = ["All", ...new Set(mockTests.map(test => test.subject))];
    const difficulties = ["All", "Easy", "Medium", "Hard"];

    const filteredTests = mockTests.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              test.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = selectedSubject === 'All' || test.subject === selectedSubject;
        const matchesDifficulty = selectedDifficulty === 'All' || test.difficulty === selectedDifficulty;
        return matchesSearch && matchesSubject && matchesDifficulty;
    });

    useEffect(() => {
        // Simple check for desktop (larger than lg breakpoint)
        const handleResize = () => {
            setShowHologram(window.innerWidth >= 1024); // lg breakpoint is 1024px
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-12 sm:py-16 section-bg-gradient relative overflow-hidden">
                {/* Holographic Doorway Effect (Desktop Only) */}
                {showHologram && (
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-96 bg-gradient-to-t from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-l-full blur-xl opacity-30 animate-pulse-slow hidden lg:block"
                        onMouseEnter={() => { /* Add more complex hover animation if desired */ }}
                        onMouseLeave={() => { /* Reset animation */ }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white text-center text-sm font-bold opacity-50">
                            Exam Portal
                        </div>
                    </div>
                )}

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-12 text-center animate-fade-in-up">
                        <h1 className="text-4xl font-extrabold text-white">Choose Your Mock Test</h1>
                        <p className="mt-2 text-lg text-slate-400">Select a test and begin your preparation journey.</p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title or subject..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <select
                                className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                            >
                                {difficulties.map(difficulty => (
                                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* Test Cards Grid */}
                    {filteredTests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            {filteredTests.map(test => (
                                <TestCard key={test.id} test={test} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 py-10">
                            No tests found matching your criteria. Try adjusting your search or filters.
                        </div>
                    )}

                    {/* Pagination / Load More (mocked) */}
                    {filteredTests.length > 5 && ( // Show "Load More" if there are more than 5 results
                        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                Load More Tests
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MockTestListPage;