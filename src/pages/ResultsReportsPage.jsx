"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Filter, ChevronDown, Download, Eye, TrendingUp, Award, CheckCircle, XCircle, MinusCircle, CalendarDays, BookOpen, User } from 'lucide-react';

// Mock Data for Tests (for filter dropdown)
const mockTests = [
    { id: 1, name: "Reasoning - Pattern Recognition" },
    { id: 2, name: "Maths - Basic Arithmetic" },
    { id: 3, name: "Drawing - Figure Completion" },
    { id: 4, name: "Language - Story Comprehension" },
    { id: 5, name: "Reasoning - Series Completion" },
    { id: 6, name: "Maths - Advanced Algebra" },
];

// Mock Data for Student Results
const mockResults = [
    { id: 1, studentName: "Anusha Sharma", class: "Class 6", testName: "Reasoning - Pattern Recognition", score: 92, rank: 1, status: "Passed", date: "2024-08-15" },
    { id: 2, studentName: "Rahul Verma", class: "Class 6", testName: "Maths - Basic Arithmetic", score: 85, rank: 3, status: "Passed", date: "2024-08-14" },
    { id: 3, studentName: "Priya Singh", class: "Class 7", testName: "Drawing - Figure Completion", score: 78, rank: 5, status: "Passed", date: "2024-08-13" },
    { id: 4, student: "Amit Kumar", class: "Class 6", testName: "Language - Story Comprehension", score: 60, rank: 10, status: "Failed", date: "2024-08-12" },
    { id: 5, studentName: "Sneha Reddy", class: "Class 7", testName: "Reasoning - Series Completion", score: 95, rank: 2, status: "Passed", date: "2024-08-11" },
    { id: 6, studentName: "Vikram Yadav", class: "Class 6", testName: "Maths - Advanced Algebra", score: 70, rank: 8, status: "Passed", date: "2024-08-10" },
    { id: 7, studentName: "Divya Patel", class: "Class 8", testName: "Reasoning - Pattern Recognition", score: 88, rank: 4, status: "Passed", date: "2024-08-09" },
    { id: 8, studentName: "Rohan Gupta", class: "Class 7", testName: "Maths - Basic Arithmetic", score: 55, rank: 12, status: "Failed", date: "2024-08-08" },
    { id: 9, studentName: "Anusha Sharma", class: "Class 6", testName: "Maths - Basic Arithmetic", score: 90, rank: 1, status: "Passed", date: "2024-08-07" },
    { id: 10, studentName: "Priya Singh", class: "Class 7", testName: "Language - Story Comprehension", score: 82, rank: 6, status: "Passed", date: "2024-08-06" },
];

const ResultsReportsPage = () => {
    const [filteredTests, setFilteredTests] = useState(mockResults);
    const [selectedTest, setSelectedTest] = useState('All');
    const [selectedClass, setSelectedClass] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDesktop, setIsDesktop] = useState(false);

    const availableClasses = ["All", ...new Set(mockResults.map(result => result.class))];
    const availableTestNames = ["All", ...new Set(mockTests.map(test => test.name))];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedTest, selectedClass, startDate, endDate]); // Re-apply filters when dependencies change

    const applyFilters = () => {
        let filtered = mockResults;

        if (selectedTest !== 'All') {
            filtered = filtered.filter(result => result.testName === selectedTest);
        }
        if (selectedClass !== 'All') {
            filtered = filtered.filter(result => result.class === selectedClass);
        }
        if (startDate) {
            filtered = filtered.filter(result => new Date(result.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(result => new Date(result.date) <= new Date(endDate));
        }
        setFilteredTests(filtered);
    };

    // Calculate analytics summary
    const totalScores = filteredTests.reduce((sum, result) => sum + result.score, 0);
    const averageScore = filteredTests.length > 0 ? (totalScores / filteredTests.length).toFixed(2) : 'N/A';
    const highestScore = filteredTests.length > 0 ? Math.max(...filteredTests.map(result => result.score)) : 'N/A';
    const lowestScore = filteredTests.length > 0 ? Math.min(...filteredTests.map(result => result.score)) : 'N/A';
    const passedCount = filteredTests.filter(result => result.status === 'Passed').length;
    const passPercentage = filteredTests.length > 0 ? ((passedCount / filteredTests.length) * 100).toFixed(2) : 'N/A';

    const handleDownloadCSV = () => {
        alert("Downloading CSV report...");
        // In a real app, you'd generate and download a CSV file here.
    };

    const handleDownloadPDF = () => {
        alert("Downloading PDF report...");
        // In a real app, you'd generate and download a PDF file here.
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <BarChart size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <TrendingUp size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📊 Results & Reports</h1>
                            <p className="mt-2 text-lg text-slate-400">Analyze student performance and generate detailed insights.</p>
                        </div>

                        {/* Filters Toolbar */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Filter size={24} className="mr-3 text-cyan-400" /> Filter Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="relative">
                                    <label htmlFor="select-test" className="block text-sm font-medium text-slate-300 mb-1">Select Test</label>
                                    <select
                                        id="select-test"
                                        className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={selectedTest}
                                        onChange={(e) => setSelectedTest(e.target.value)}
                                    >
                                        {availableTestNames.map(testName => (
                                            <option key={testName} value={testName}>{testName}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="select-class" className="block text-sm font-medium text-slate-300 mb-1">Class/Grade</label>
                                    <select
                                        id="select-class"
                                        className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        {availableClasses.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div>
                                    <label htmlFor="start-date" className="block text-sm font-medium text-slate-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        id="start-date"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-date" className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        id="end-date"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Apply Filters button is now handled by useEffect on filter state changes */}
                        </div>

                        {/* Analytics Summary */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BarChart size={24} className="mr-3 text-purple-400" /> Performance Summary</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Average Score</p>
                                    <p className="text-2xl font-bold text-cyan-400">{averageScore}%</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Highest Score</p>
                                    <p className="text-2xl font-bold text-green-400">{highestScore}%</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Lowest Score</p>
                                    <p className="text-2xl font-bold text-red-400">{lowestScore}%</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Pass Rate</p>
                                    <p className="text-2xl font-bold text-yellow-400">{passPercentage}%</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400 h-48 flex items-center justify-center">
                                <p>Performance distribution chart placeholder</p>
                            </div>
                        </div>

                        {/* Results Table / Card View */}
                        {isDesktop ? (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Student Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Class</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Test Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score (%)</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {filteredTests.length > 0 ? (
                                            filteredTests.map((result, index) => (
                                                <tr key={result.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                                                        <User size={18} className="mr-2 text-slate-400" /> {result.studentName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{result.class}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{result.testName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{result.score}%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{result.rank}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${result.status === 'Passed' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                            {result.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                        <div className="flex items-center justify-center space-x-3">
                                                            <Link to={`/admin/student-performance/${result.id}`} className="text-purple-400 hover:text-purple-300" title="View Detailed Report"><Eye size={18} /></Link>
                                                            <button onClick={handleDownloadPDF} className="text-yellow-400 hover:text-yellow-300" title="Download PDF"><Download size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-slate-400">No results found matching your criteria.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                {filteredTests.length > 0 ? (
                                    filteredTests.map((result, index) => (
                                        <div key={result.id} className="glass-effect rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg" style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-bold text-white flex items-center">
                                                    <User size={20} className="mr-2 text-slate-400" /> {result.studentName}
                                                </h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${result.status === 'Passed' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                    {result.status}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 mb-4">
                                                <div className="flex items-center"><BookOpen size={16} className="mr-2 text-slate-500" /> {result.testName}</div>
                                                <div className="flex items-center"><CalendarDays size={16} className="mr-2 text-slate-500" /> {result.date}</div>
                                                <div className="flex items-center"><Award size={16} className="mr-2 text-slate-500" /> Score: <span className="font-semibold text-cyan-400 ml-1">{result.score}%</span></div>
                                                <div className="flex items-center"><TrendingUp size={16} className="mr-2 text-slate-500" /> Rank: <span className="font-semibold text-white ml-1">{result.rank}</span></div>
                                            </div>
                                            <div className="flex justify-end space-x-3 border-t border-slate-800 pt-3">
                                                <Link to={`/admin/student-performance/${result.id}`} className="text-purple-400 hover:text-purple-300" title="View Detailed Report"><Eye size={20} /></Link>
                                                <button onClick={handleDownloadPDF} className="text-yellow-400 hover:text-yellow-300" title="Download PDF"><Download size={20} /></button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-400 py-10">
                                        No results found matching your criteria. Try adjusting your filters.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Export & Download Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                            <button
                                onClick={handleDownloadCSV}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Download CSV
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Analyze performance, drive success 📈" />
        </div>
    );
};

export default ResultsReportsPage;