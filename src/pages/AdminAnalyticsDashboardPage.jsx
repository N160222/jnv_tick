"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, BookOpen, BarChart, Gift, Activity, TrendingUp, PieChart, CalendarDays, Clock, LineChart, Download, Filter, ChevronDown, LayoutDashboard, Brain, X } from 'lucide-react';

// Mock Data for KPIs
const mockKpis = [
    { id: 1, title: "Total Students Registered", value: "1,250", icon: <Users size={32} className="text-cyan-400" />, color: "cyan" },
    { id: 2, title: "Total Tests Created", value: "120", icon: <BookOpen size={32} className="text-blue-400" />, color: "blue" },
    { id: 3, title: "Total Tests Attempted", value: "8,500", icon: <Activity size={32} className="text-green-400" />, color: "green" },
    { id: 4, title: "Avg. Score (All Students)", value: "82.5%", icon: <BarChart size={32} className="text-yellow-400" />, color: "yellow" },
    { id: 5, title: "Avg. Accuracy %", value: "88.1%", icon: <TrendingUp size={32} className="text-purple-400" />, color: "purple" },
];

// Mock Data for Charts and Tables
const mockActivityData = [
    { date: "Aug 1", tests: 150 }, { date: "Aug 2", tests: 160 }, { date: "Aug 3", tests: 140 },
    { date: "Aug 4", tests: 180 }, { date: "Aug 5", tests: 170 }, { date: "Aug 6", tests: 190 },
    { date: "Aug 7", tests: 200 }, { date: "Aug 8", tests: 185 }, { date: "Aug 9", tests: 175 },
    { date: "Aug 10", tests: 210 }, { date: "Aug 11", tests: 220 }, { date: "Aug 12", tests: 195 },
    { date: "Aug 13", tests: 230 }, { date: "Aug 14", tests: 240 }, { date: "Aug 15", tests: 215 },
];

const mockSubjectDistribution = [
    { subject: "Mathematics", questions: 3000 },
    { subject: "Reasoning", questions: 2500 },
    { subject: "Language", questions: 2000 },
    { subject: "Drawing", questions: 1000 },
];

const mockTestModes = [
    { mode: "AI-Generated", count: 5000 },
    { mode: "Manual", count: 2500 },
    { mode: "Template-based", count: 1000 },
];

const mockBatchPerformance = [
    { batch: "Class 6 - Batch A", avgScore: 85, passRate: 92 },
    { batch: "Class 6 - Batch B", avgScore: 80, passRate: 88 },
    { batch: "Class 7 - Batch A", avgScore: 88, passRate: 95 },
    { batch: "Class 7 - Batch B", avgScore: 78, passRate: 85 },
];

const mockTopBottomStudents = {
    top: [
        { name: "Anusha Sharma", score: 95 },
        { name: "Priya Singh", score: 93 },
        { name: "Rahul Verma", score: 92 },
        { name: "Sneha Reddy", score: 91 },
        { name: "Vikram Yadav", score: 90 },
    ],
    bottom: [
        { name: "Kiran Kumar", score: 55 },
        { name: "Deepak Jain", score: 58 },
        { name: "Meena Devi", score: 60 },
        { name: "Suresh Babu", score: 62 },
        { name: "Geeta Rani", score: 65 },
    ],
};

const mockDifficultSubjects = [
    { subject: "Advanced Algebra", accuracy: 65 },
    { subject: "Figure Completion", accuracy: 70 },
    { subject: "Sentence Structure", accuracy: 72 },
    { subject: "Data Interpretation", accuracy: 75 },
];

const mockEngagement = {
    avgTimePerTest: "35 min",
    retentionRate: "75%", // % of students returning for multiple tests
    heatmap: Array.from({ length: 30 }, (_, i) => ({
        date: `2024-08-${i + 1}`,
        activity: Math.floor(Math.random() * 100) // 0-99 activity level
    }))
};

const AdminAnalyticsDashboardPage = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for empty state

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCardColorClass = (color) => {
        switch (color) {
            case 'cyan': return 'border-cyan-500/50 hover:shadow-cyan-900/30';
            case 'blue': return 'border-blue-500/50 hover:shadow-blue-900/30';
            case 'green': return 'border-green-500/50 hover:shadow-green-900/30';
            case 'yellow': return 'border-yellow-500/50 hover:shadow-yellow-900/30';
            case 'purple': return 'border-purple-500/50 hover:shadow-purple-900/30';
            default: return '';
        }
    };

    const handleDownloadReport = (format) => {
        alert(`Downloading overall analytics report as ${format}...`);
    };

    // Mock chart rendering helpers
    const renderLineChart = (data) => {
        if (data.length === 0) return <p className="text-slate-400">No data for this chart.</p>;
        const maxTests = Math.max(...data.map(d => d.tests));
        return (
            <div className="relative h-48 w-full flex items-end justify-around p-2">
                {data.map((d, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 w-2 h-full bg-blue-500/20 rounded-t-full"
                        style={{
                            left: `${(i / (data.length - 1)) * 100}%`,
                            height: `${(d.tests / maxTests) * 100}%`,
                            transition: 'height 0.5s ease-out',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white">{d.tests}</div>
                    </div>
                ))}
                <div className="absolute inset-0">
                    {data.length > 1 && data.map((d, i) => {
                        if (i === 0) return null;
                        const prevData = data[i - 1];
                        const x1 = ( (i - 1) / (data.length - 1) ) * 100;
                        const y1 = 100 - (prevData.tests / maxTests) * 100;
                        const x2 = ( i / (data.length - 1) ) * 100;
                        const y2 = 100 - (d.tests / maxTests) * 100;
                        return (
                            <svg key={`line-${i}`} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <line
                                    x1={`${x1}%`} y1={`${y1}%`}
                                    x2={`${x2}%`} y2={`${y2}%`}
                                    stroke="#06b6d4"
                                    strokeWidth="2"
                                    className="animate-draw-line"
                                />
                            </svg>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderBarChart = (data, valueKey, labelKey, color) => {
        if (data.length === 0) return <p className="text-slate-400">No data for this chart.</p>;
        const maxValue = Math.max(...data.map(d => d[valueKey]));
        return (
            <div className="h-48 w-full flex items-end justify-around p-2">
                {data.map((d, i) => (
                    <div key={i} className="flex flex-col items-center mx-2">
                        <div
                            className={`w-8 ${color} rounded-t-lg transition-all duration-500`}
                            style={{ height: `${(d[valueKey] / maxValue) * 100}%` }}
                        ></div>
                        <span className="mt-2 text-xs text-white">{d[valueKey]}</span>
                        <span className="text-xs text-slate-400 mt-1">{d[labelKey]}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderPieChart = (data, valueKey, labelKey, colors) => {
        if (data.length === 0) return <p className="text-slate-400">No data for this chart.</p>;
        const total = data.reduce((sum, d) => sum + d[valueKey], 0);
        let currentAngle = 0;
        const conicGradientParts = data.map((d, i) => {
            const percentage = (d[valueKey] / total) * 100;
            const startAngle = currentAngle;
            currentAngle += percentage;
            return `${colors[i % colors.length]} ${startAngle}% ${currentAngle}%`;
        }).join(', ');

        return (
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                    background: `conic-gradient(${conicGradientParts})`
                }}
            >
                <div className="absolute w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center text-sm text-slate-400">
                    Total: {total}
                </div>
                <div className="absolute -bottom-20 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                    {data.map((d, i) => (
                        <div key={i} className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[i % colors.length] }}></span>
                            {d[labelKey]} ({(d[valueKey] / total * 100).toFixed(0)}%)
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const pieColors = ['#06b6d4', '#8b5cf6', '#22c55e', '#facc15', '#ef4444']; // Cyan, Purple, Green, Yellow, Red

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <LayoutDashboard size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <BarChart size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📈 Analytics Dashboard</h1>
                                <p className="mt-2 text-lg text-slate-400">Overall insights into student activity and system performance.</p>
                            </div>
                            <div className="flex items-center mt-6 sm:mt-0 space-x-4">
                                <div className="relative">
                                    <select
                                        className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                    >
                                        <option value="Today">Today</option>
                                        <option value="Last 7 Days">Last 7 Days</option>
                                        <option value="Last 30 Days">Last 30 Days</option>
                                        <option value="Custom Range">Custom Range (Mock)</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative group">
                                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                        <Download size={20} className="mr-2" /> Export
                                    </button>
                                    <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                                        <button onClick={() => handleDownloadReport('PDF')} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">Download PDF</button>
                                        <button onClick={() => handleDownloadReport('CSV')} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">Download CSV</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showEmptyState ? (
                            <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up">
                                <BarChart size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                <h2 className="text-2xl font-bold text-white mb-3">No analytics available.</h2>
                                <p className="text-slate-400 max-w-md mx-auto">Data will appear here as students start attempting tests and interacting with the platform.</p>
                                <Link
                                    to="/admin/manage-tests"
                                    className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                >
                                    <BookOpen size={20} className="mr-2" /> Create First Test
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Top KPIs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                                    {mockKpis.map((kpi, index) => (
                                        <div
                                            key={kpi.id}
                                            className={`glass-effect rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${getCardColorClass(kpi.color)}`}
                                            style={{ animationDelay: `${100 * index}ms` }}
                                        >
                                            <div className={`p-3 rounded-full inline-block mb-4 bg-slate-700/50`}>
                                                {kpi.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{kpi.value}</h3>
                                            <p className="text-slate-400 text-sm">{kpi.title}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Activity Overview Section */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Activity size={24} className="mr-3 text-cyan-400" /> Activity Overview</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><LineChart size={20} className="mr-2 text-blue-400" /> Tests Attempted Over Time</h3>
                                            {renderLineChart(mockActivityData)}
                                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                                {mockActivityData.map((d, i) => (
                                                    <span key={i}>{d.date.substring(5)}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><BarChart size={20} className="mr-2 text-green-400" /> Subjects Distribution</h3>
                                            {renderBarChart(mockSubjectDistribution, 'questions', 'subject', 'bg-green-500')}
                                        </div>
                                        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center">
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><PieChart size={20} className="mr-2 text-yellow-400" /> Test Modes Used</h3>
                                            {renderPieChart(mockTestModes, 'count', 'mode', pieColors)}
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Insights */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><TrendingUp size={24} className="mr-3 text-purple-400" /> Performance Insights</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4">Batch-wise Performance Summary</h3>
                                            <div className="overflow-x-auto rounded-xl border border-slate-800">
                                                <table className="min-w-full divide-y divide-slate-800">
                                                    <thead className="bg-slate-800/50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Batch</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Avg Score</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Pass %</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-800">
                                                        {mockBatchPerformance.map((data, i) => (
                                                            <tr key={i} className="bg-slate-900/30 hover:bg-slate-800/50">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{data.batch}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-400">{data.avgScore}%</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">{data.passRate}%</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4">Top & Bottom Students</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                                    <h4 className="text-md font-semibold text-white mb-2">Top 5 Students</h4>
                                                    <ul className="space-y-1 text-sm text-slate-300">
                                                        {mockTopBottomStudents.top.map((s, i) => (
                                                            <li key={i} className="flex justify-between"><span>{s.name}</span> <span className="text-green-400">{s.score}%</span></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                                    <h4 className="text-md font-semibold text-white mb-2">Bottom 5 Students</h4>
                                                    <ul className="space-y-1 text-sm text-slate-300">
                                                        {mockTopBottomStudents.bottom.map((s, i) => (
                                                            <li key={i} className="flex justify-between"><span>{s.name}</span> <span className="text-red-400">{s.score}%</span></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4">
                                                <h4 className="text-md font-semibold text-white mb-2">Most Difficult Subjects</h4>
                                                <ul className="space-y-1 text-sm text-slate-300">
                                                    {mockDifficultSubjects.map((s, i) => (
                                                        <li key={i} className="flex justify-between"><span>{s.subject}</span> <span className="text-yellow-400">{s.accuracy}% Avg. Accuracy</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Engagement Metrics */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Clock size={24} className="mr-3 text-yellow-400" /> Engagement Metrics</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center">
                                            <h3 className="text-lg font-semibold text-white mb-4">Student Activity Heatmap (Last 30 Days)</h3>
                                            <div className="grid grid-cols-7 gap-1 text-xs text-slate-400">
                                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                                    <div key={day} className="text-center font-bold">{day}</div>
                                                ))}
                                                {mockEngagement.heatmap.map((day, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 rounded-sm flex items-center justify-center"
                                                        style={{ backgroundColor: `rgba(6, 182, 212, ${day.activity / 100 * 0.8 + 0.2})` }} // Cyan gradient
                                                        title={`Aug ${i + 1}: ${day.activity} activity`}
                                                    >
                                                        {i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                                <h3 className="text-lg font-semibold text-white mb-2">Average Time Spent per Test</h3>
                                                <p className="text-4xl font-bold text-cyan-400">{mockEngagement.avgTimePerTest}</p>
                                            </div>
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                                <h3 className="text-lg font-semibold text-white mb-2">Student Retention Rate</h3>
                                                <p className="text-4xl font-bold text-green-400">{mockEngagement.retentionRate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* AI-powered Insights Box */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Brain size={24} className="mr-3 text-orange-400" /> AI-Powered Insights</h2>
                                    <ul className="space-y-3 text-slate-300">
                                        <li className="flex items-start">
                                            <X size={20} className="flex-shrink-0 mr-3 text-red-400 mt-1" />
                                            <span>**Math accuracy dropped by 12%** in the last 30 days. Consider reviewing recent math test content.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <TrendingUp size={20} className="flex-shrink-0 mr-3 text-green-400 mt-1" />
                                            <span>**Batch B students performed 15% better** than Batch A in reasoning this quarter. Analyze their learning patterns.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CalendarDays size={20} className="flex-shrink-0 mr-3 text-blue-400 mt-1" />
                                            <span>**Weekend test attempts are 30% higher** than weekdays. Schedule more live sessions or support during weekends.</span>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/admin/student-reports-performance"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Back to Student Reports
                            </Link>
                            <button
                                onClick={() => handleDownloadReport('PDF')}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Download Full Report
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Data-driven decisions for success 📊" />
        </div>
    );
};

export default AdminAnalyticsDashboardPage;