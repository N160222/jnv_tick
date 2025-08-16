"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, BarChart, LineChart, TrendingUp, Award, CalendarDays, BookOpen, Search, Filter, ChevronDown, PlusCircle, Download, LayoutDashboard, ArrowLeft, Brain, User as UserIcon, Layers, Scale, Clock } from 'lucide-react';

// --- Mock Data ---
const mockStudentsData = [
    {
        id: 1, name: "Anusha Sharma", email: "anusha.sharma@example.com", classGrade: "Class 6", avatar: "https://i.pravatar.cc/150?img=48",
        testHistory: [
            { date: "2024-08-01", subject: "Mathematics", score: 85, timeTaken: 30, correct: 17, wrong: 3, skipped: 0 },
            { date: "2024-08-05", subject: "Reasoning", score: 92, timeTaken: 25, correct: 18, wrong: 2, skipped: 0 },
            { date: "2024-08-10", subject: "Language", score: 78, timeTaken: 40, correct: 20, wrong: 5, skipped: 5 },
            { date: "2024-08-15", subject: "Mathematics", score: 90, timeTaken: 28, correct: 19, wrong: 1, skipped: 0 },
            { date: "2024-08-20", subject: "Reasoning", score: 95, timeTaken: 22, correct: 19, wrong: 1, skipped: 0 },
        ]
    },
    {
        id: 2, name: "Rahul Verma", email: "rahul.verma@example.com", classGrade: "Class 6", avatar: "https://i.pravatar.cc/150?img=68",
        testHistory: [
            { date: "2024-08-02", subject: "Mathematics", score: 70, timeTaken: 35, correct: 14, wrong: 6, skipped: 0 },
            { date: "2024-08-07", subject: "Reasoning", score: 80, timeTaken: 30, correct: 16, wrong: 4, skipped: 0 },
            { date: "2024-08-12", subject: "Language", score: 65, timeTaken: 45, correct: 15, wrong: 10, skipped: 5 },
            { date: "2024-08-17", subject: "Mathematics", score: 75, timeTaken: 32, correct: 15, wrong: 5, skipped: 0 },
            { date: "2024-08-22", subject: "Reasoning", score: 85, timeTaken: 28, correct: 17, wrong: 3, skipped: 0 },
        ]
    },
    {
        id: 3, name: "Priya Singh", email: "priya.singh@example.com", classGrade: "Class 7", avatar: "https://i.pravatar.cc/150?img=25",
        testHistory: [
            { date: "2024-08-03", subject: "Mathematics", score: 90, timeTaken: 28, correct: 18, wrong: 2, skipped: 0 },
            { date: "2024-08-08", subject: "Reasoning", score: 88, timeTaken: 27, correct: 17, wrong: 3, skipped: 0 },
            { date: "2024-08-13", subject: "Language", score: 92, timeTaken: 38, correct: 23, wrong: 2, skipped: 0 },
            { date: "2024-08-18", subject: "Mathematics", score: 95, timeTaken: 25, correct: 19, wrong: 1, skipped: 0 },
            { date: "2024-08-23", subject: "Reasoning", score: 90, timeTaken: 26, correct: 18, wrong: 2, skipped: 0 },
        ]
    },
    {
        id: 4, name: "Amit Kumar", email: "amit.kumar@example.com", classGrade: "Class 6", avatar: "https://i.pravatar.cc/150?img=60",
        testHistory: [
            { date: "2024-08-04", subject: "Mathematics", score: 60, timeTaken: 40, correct: 12, wrong: 8, skipped: 0 },
            { date: "2024-08-09", subject: "Reasoning", score: 70, timeTaken: 35, correct: 14, wrong: 6, skipped: 0 },
            { date: "2024-08-14", subject: "Language", score: 55, timeTaken: 50, correct: 10, wrong: 15, skipped: 5 },
            { date: "2024-08-19", subject: "Mathematics", score: 65, timeTaken: 38, correct: 13, wrong: 7, skipped: 0 },
            { date: "2024-08-24", subject: "Reasoning", score: 75, timeTaken: 30, correct: 15, wrong: 5, skipped: 0 },
        ]
    },
    {
        id: 5, name: "Sneha Reddy", email: "sneha.reddy@example.com", classGrade: "Class 7", avatar: "https://i.pravatar.cc/150?img=32",
        testHistory: [
            { date: "2024-08-06", subject: "Mathematics", score: 88, timeTaken: 29, correct: 18, wrong: 2, skipped: 0 },
            { date: "2024-08-11", subject: "Reasoning", score: 90, timeTaken: 24, correct: 18, wrong: 2, skipped: 0 },
            { date: "2024-08-16", subject: "Language", score: 85, timeTaken: 35, correct: 21, wrong: 4, skipped: 0 },
            { date: "2024-08-21", subject: "Mathematics", score: 92, timeTaken: 27, correct: 18, wrong: 2, skipped: 0 },
            { date: "2024-08-26", subject: "Reasoning", score: 93, timeTaken: 23, correct: 19, wrong: 1, skipped: 0 },
        ]
    },
];

const mockBatches = [
    { id: 'class6a', name: "Class 6 - Batch A", studentIds: [1, 4] },
    { id: 'class6b', name: "Class 6 - Batch B", studentIds: [2] },
    { id: 'class7a', name: "Class 7 - Batch A", studentIds: [3, 5] },
];

const allSubjects = ["All", "Mathematics", "Reasoning", "Language", "Drawing", "Science", "General Knowledge"];
const dateRanges = ["All Time", "Last 7 Days", "Last 30 Days", "Last 90 Days"];

// --- Helper Functions for Calculations ---
const calculateMetrics = (entities, selectedSubject, dateRange) => {
    let totalScore = 0;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalSkipped = 0;
    let totalTimeTaken = 0;
    let testsAttempted = 0;

    const subjectScores = {};
    const subjectCounts = {};
    const performanceTrend = {}; // { 'YYYY-MM-DD': avgScore }

    entities.forEach(entity => {
        const relevantTests = entity.testHistory.filter(test => {
            const testDate = new Date(test.date);
            const today = new Date();
            let matchesDate = true;

            if (dateRange === 'Last 7 Days') {
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                matchesDate = testDate >= sevenDaysAgo;
            } else if (dateRange === 'Last 30 Days') {
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                matchesDate = testDate >= thirtyDaysAgo;
            } else if (dateRange === 'Last 90 Days') {
                const ninetyDaysAgo = new Date(today);
                ninetyDaysAgo.setDate(today.getDate() - 90);
                matchesDate = testDate >= ninetyDaysAgo;
            }

            const matchesSubject = selectedSubject === 'All' || test.subject === selectedSubject;
            return matchesDate && matchesSubject;
        });

        relevantTests.forEach(test => {
            totalScore += test.score;
            totalCorrect += test.correct;
            totalWrong += test.wrong;
            totalSkipped += test.skipped;
            totalQuestions += (test.correct + test.wrong + test.skipped);
            totalTimeTaken += test.timeTaken;
            testsAttempted++;

            // For Subject-wise performance
            subjectScores[test.subject] = (subjectScores[test.subject] || 0) + test.score;
            subjectCounts[test.subject] = (subjectCounts[test.subject] || 0) + 1;

            // For Performance Trend
            if (!performanceTrend[test.date]) {
                performanceTrend[test.date] = { totalScore: 0, count: 0 };
            }
            performanceTrend[test.date].totalScore += test.score;
            performanceTrend[test.date].count++;
        });
    });

    const avgScore = testsAttempted > 0 ? (totalScore / testsAttempted).toFixed(1) : 'N/A';
    const accuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 'N/A';
    const avgTimePerQuestion = totalQuestions > 0 ? (totalTimeTaken / totalQuestions).toFixed(1) : 'N/A';

    const avgSubjectPerformance = Object.keys(subjectScores).map(subject => ({
        subject,
        average: (subjectScores[subject] / subjectCounts[subject]).toFixed(1)
    }));

    let strongestSubject = 'N/A';
    let weakestSubject = 'N/A';
    if (avgSubjectPerformance.length > 0) {
        const sortedSubjects = [...avgSubjectPerformance].sort((a, b) => b.average - a.average);
        strongestSubject = sortedSubjects[0].subject;
        weakestSubject = sortedSubjects[sortedSubjects.length - 1].subject;
    }

    const sortedPerformanceTrend = Object.keys(performanceTrend)
        .sort()
        .map(date => ({
            date,
            score: (performanceTrend[date].totalScore / performanceTrend[date].count).toFixed(1)
        }));

    // Mock Improvement Rate (simple calculation based on first and last test in trend)
    let improvementRate = 'N/A';
    if (sortedPerformanceTrend.length >= 2) {
        const firstScore = parseFloat(sortedPerformanceTrend[0].score);
        const lastScore = parseFloat(sortedPerformanceTrend[sortedPerformanceTrend.length - 1].score);
        if (firstScore > 0) {
            improvementRate = (((lastScore - firstScore) / firstScore) * 100).toFixed(1) + '%';
        }
    }

    return {
        avgScore,
        accuracy,
        testsAttempted,
        avgTimePerQuestion,
        strongestSubject,
        weakestSubject,
        improvementRate,
        avgSubjectPerformance,
        performanceTrend: sortedPerformanceTrend,
    };
};

// --- Components for Display ---
const MetricCard = ({ title, value, icon, colorClass }) => (
    <div className={`glass-effect rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClass}`}>
        <div className={`p-2 rounded-full inline-block mb-2 ${colorClass.replace('border-', 'bg-').replace('/50', '/30')}`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
    </div>
);

const ChartContainer = ({ title, children, icon }) => (
    <div className="glass-effect rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">{icon} {title}</h2>
        {children}
    </div>
);

const renderBarChart = (data, valueKey, labelKey, color) => {
    if (data.length === 0) return <p className="text-slate-400 text-center py-4">No data for this chart.</p>;
    const maxValue = Math.max(...data.map(d => parseFloat(d[valueKey])));
    return (
        <div className="h-48 w-full flex items-end justify-around p-2">
            {data.map((d, i) => (
                <div key={i} className="flex flex-col items-center mx-2">
                    <div
                        className={`w-8 ${color} rounded-t-lg transition-all duration-500`}
                        style={{ height: `${(parseFloat(d[valueKey]) / maxValue) * 100}%` }}
                    ></div>
                    <span className="mt-2 text-xs text-white">{d[valueKey]}%</span>
                    <span className="text-xs text-slate-400 mt-1">{d[labelKey]}</span>
                </div>
            ))}
        </div>
    );
};

const renderLineChart = (data, color) => {
    if (data.length < 2) return <p className="text-slate-400 text-center py-4">Not enough data points for a trend.</p>;
    const maxScore = Math.max(...data.map(d => parseFloat(d.score)));
    const minScore = Math.min(...data.map(d => parseFloat(d.score)));
    const range = maxScore - minScore;

    return (
        <div className="relative h-48 w-full p-2">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {data.map((d, i) => {
                    if (i === 0) return null;
                    const prevData = data[i - 1];
                    const x1 = ( (i - 1) / (data.length - 1) ) * 100;
                    const y1 = 100 - ((parseFloat(prevData.score) - minScore) / range) * 100;
                    const x2 = ( i / (data.length - 1) ) * 100;
                    const y2 = 100 - ((parseFloat(d.score) - minScore) / range) * 100;
                    return (
                        <line
                            key={`line-${i}`}
                            x1={`${x1}%`} y1={`${y1}%`}
                            x2={`${x2}%`} y2={`${y2}%`}
                            stroke={color}
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
            {data.map((d, i) => {
                const x = ( i / (data.length - 1) ) * 100;
                const y = 100 - ((parseFloat(d.score) - minScore) / range) * 100;
                return (
                    <circle key={`point-${i}`} cx={`${x}%`} cy={`${y}%`} r="2" fill={color} />
                );
            })}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 mt-2 px-2">
                {data.map((d, i) => (
                    <span key={i}>{d.date.substring(5)}</span>
                ))}
            </div>
        </div>
    );
};


const StudentComparisonPage = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [comparisonMode, setComparisonMode] = useState('batches'); // 'batches' or 'students'
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('All Time');
    const [selectedSubject, setSelectedSubject] = useState('All');

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Derived state for comparison entities
    const entitiesToCompare = [];
    if (comparisonMode === 'batches') {
        selectedBatches.forEach(batchId => {
            const batch = mockBatches.find(b => b.id === batchId);
            if (batch) {
                const studentsInBatch = mockStudentsData.filter(s => batch.studentIds.includes(s.id));
                entitiesToCompare.push({ id: batch.id, name: batch.name, type: 'batch', testHistory: studentsInBatch.flatMap(s => s.testHistory) });
            }
        });
    } else { // comparisonMode === 'students'
        selectedStudents.forEach(studentId => {
            const student = mockStudentsData.find(s => s.id === studentId);
            if (student) {
                entitiesToCompare.push({ id: student.id, name: student.name, type: 'student', testHistory: student.testHistory, avatar: student.avatar });
            }
        });
    }

    const comparisonResults = entitiesToCompare.map(entity => ({
        id: entity.id,
        name: entity.name,
        type: entity.type,
        avatar: entity.avatar,
        metrics: calculateMetrics([entity], selectedSubject, dateRange), // Pass entity as array for calculateMetrics
        subjectPerformance: calculateMetrics([entity], selectedSubject, dateRange).avgSubjectPerformance,
        performanceTrend: calculateMetrics([entity], selectedSubject, dateRange).performanceTrend,
    }));

    // Filtered students for selection dropdown/search
    const availableStudents = mockStudentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedStudents.includes(student.id)
    );

    const handleAddStudent = (studentId) => {
        if (selectedStudents.length < 5) {
            setSelectedStudents(prev => [...prev, studentId]);
            setSearchTerm(''); // Clear search after adding
        } else {
            alert("You can compare a maximum of 5 students.");
        }
    };

    const handleRemoveStudent = (studentId) => {
        setSelectedStudents(prev => prev.filter(id => id !== studentId));
    };

    const handleBatchSelect = (batchId) => {
        setSelectedBatches(prev =>
            prev.includes(batchId)
                ? prev.filter(id => id !== batchId)
                : [...prev, batchId]
        );
    };

    const getComparisonColor = (index) => {
        const colors = ['#06b6d4', '#8b5cf6', '#22c55e', '#facc15', '#ef4444']; // Cyan, Purple, Green, Yellow, Red
        return colors[index % colors.length];
    };

    const getComparisonColorClass = (index) => {
        const classes = [
            'border-cyan-500/50 hover:shadow-cyan-900/30',
            'border-purple-500/50 hover:shadow-purple-900/30',
            'border-green-500/50 hover:shadow-green-900/30',
            'border-yellow-500/50 hover:shadow-yellow-900/30',
            'border-red-500/50 hover:shadow-red-900/30',
        ];
        return classes[index % classes.length];
    };

    // Mock AI Insights
    const generateMockInsights = () => {
        if (comparisonResults.length < 2) return [];

        const insights = [];
        const entity1 = comparisonResults[0];
        const entity2 = comparisonResults[1];

        // Insight 1: Overall Score Comparison
        if (parseFloat(entity1.metrics.avgScore) > parseFloat(entity2.metrics.avgScore)) {
            insights.push(`${entity1.name} consistently scores higher (${entity1.metrics.avgScore}%) than ${entity2.name} (${entity2.metrics.avgScore}%).`);
        } else if (parseFloat(entity2.metrics.avgScore) > parseFloat(entity1.metrics.avgScore)) {
            insights.push(`${entity2.name} consistently scores higher (${entity2.metrics.avgScore}%) than ${entity1.name} (${entity1.metrics.avgScore}%).`);
        }

        // Insight 2: Subject-wise strength/weakness
        const entity1Math = entity1.subjectPerformance.find(s => s.subject === 'Mathematics')?.average;
        const entity2Math = entity2.subjectPerformance.find(s => s.subject === 'Mathematics')?.average;
        if (entity1Math && entity2Math) {
            if (parseFloat(entity1Math) > parseFloat(entity2Math)) {
                insights.push(`${entity1.name} shows stronger performance in Mathematics.`);
            } else if (parseFloat(entity2Math) > parseFloat(entity1Math)) {
                insights.push(`${entity2.name} excels in Mathematics compared to ${entity1.name}.`);
            }
        }

        // Insight 3: Improvement Rate
        if (entity1.metrics.improvementRate !== 'N/A' && entity2.metrics.improvementRate !== 'N/A') {
            const imp1 = parseFloat(entity1.metrics.improvementRate);
            const imp2 = parseFloat(entity2.metrics.improvementRate);
            if (imp1 > imp2) {
                insights.push(`${entity1.name} has a higher improvement rate (${entity1.metrics.improvementRate}) over the selected period.`);
            } else if (imp2 > imp1) {
                insights.push(`${entity2.name} shows significant improvement (${entity2.metrics.improvementRate}) in recent performance.`);
            }
        } else if (entity1.metrics.improvementRate !== 'N/A') {
            insights.push(`${entity1.name} shows a notable improvement of ${entity1.metrics.improvementRate}.`);
        } else if (entity2.metrics.improvementRate !== 'N/A') {
            insights.push(`${entity2.name} shows a notable improvement of ${entity2.metrics.improvementRate}.`);
        }

        // Insight 4: Tests Attempted vs Accuracy
        if (parseFloat(entity1.metrics.testsAttempted) > parseFloat(entity2.metrics.testsAttempted) && parseFloat(entity1.metrics.accuracy) < parseFloat(entity2.metrics.accuracy)) {
            insights.push(`${entity1.name} attempts more tests but ${entity2.name} maintains higher accuracy.`);
        } else if (parseFloat(entity2.metrics.testsAttempted) > parseFloat(entity1.metrics.testsAttempted) && parseFloat(entity2.metrics.accuracy) < parseFloat(entity1.metrics.accuracy)) {
            insights.push(`${entity2.name} attempts more tests but ${entity1.name} maintains higher accuracy.`);
        }

        return insights.length > 0 ? insights : ["No specific AI insights generated for this comparison yet. Try different selections."];
    };

    const mockInsights = generateMockInsights();

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Scale size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Users size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">⚖️ Student Comparison</h1>
                            <p className="mt-2 text-lg text-slate-400">Compare performance between batches or individual students.</p>
                        </div>

                        {/* Mode Toggle & Filters */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <div className="flex bg-slate-800/50 border border-slate-700 rounded-lg p-1 mb-4 sm:mb-0">
                                    <button
                                        onClick={() => { setComparisonMode('batches'); setSelectedStudents([]); }}
                                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${comparisonMode === 'batches' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        Compare Batches
                                    </button>
                                    <button
                                        onClick={() => { setComparisonMode('students'); setSelectedBatches([]); }}
                                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${comparisonMode === 'students' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        Compare Students
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <div className="relative">
                                        <label htmlFor="dateRange" className="sr-only">Date Range</label>
                                        <select id="dateRange" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                                            {dateRanges.map(range => <option key={range} value={range}>{range}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="subjectFilter" className="sr-only">Subject Filter</label>
                                        <select id="subjectFilter" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                                            {allSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Setup */}
                            {comparisonMode === 'batches' ? (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Batches (max 5)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {mockBatches.map(batch => (
                                            <button
                                                key={batch.id}
                                                onClick={() => handleBatchSelect(batch.id)}
                                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedBatches.includes(batch.id) ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50'}`}
                                                disabled={selectedBatches.length >= 5 && !selectedBatches.includes(batch.id)}
                                            >
                                                {batch.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Students (max 5)</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedStudents.map(studentId => {
                                            const student = mockStudentsData.find(s => s.id === studentId);
                                            return student ? (
                                                <span key={student.id} className="flex items-center bg-slate-700/50 text-white px-3 py-1 rounded-full text-sm">
                                                    <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full mr-2" />
                                                    {student.name}
                                                    <button onClick={() => handleRemoveStudent(student.id)} className="ml-2 text-red-400 hover:text-red-300">
                                                        <X size={16} />
                                                    </button>
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search and add student..."
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {searchTerm && availableStudents.length > 0 && (
                                            <div className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded-md mt-1 max-h-48 overflow-y-auto">
                                                {availableStudents.map(student => (
                                                    <button
                                                        key={student.id}
                                                        onClick={() => handleAddStudent(student.id)}
                                                        className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 flex items-center"
                                                    >
                                                        <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                                        {student.name} ({student.classGrade})
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {comparisonResults.length === 0 ? (
                            <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <Scale size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                <h2 className="text-2xl font-bold text-white mb-3">No entities selected for comparison.</h2>
                                <p className="text-slate-400 max-w-md mx-auto">Please select at least one {comparisonMode === 'batches' ? 'batch' : 'student'} to view performance comparison.</p>
                            </div>
                        ) : (
                            <>
                                {/* Comparison Metrics */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    {comparisonResults.map((result, index) => (
                                        <div key={result.id} className={`glass-effect rounded-2xl p-6 sm:p-8 ${getComparisonColorClass(index)} animate-fade-in-up`} style={{ animationDelay: `${400 + index * 100}ms` }}>
                                            <div className="flex items-center mb-6">
                                                {result.type === 'student' && result.avatar ? (
                                                    <img src={result.avatar} alt={result.name} className="w-16 h-16 rounded-full mr-4 border-2 border-cyan-500" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full mr-4 bg-slate-700 flex items-center justify-center">
                                                        <Layers size={32} className="text-slate-400" />
                                                    </div>
                                                )}
                                                <h2 className="text-2xl font-bold text-white">{result.name}</h2>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <MetricCard title="Avg. Score" value={`${result.metrics.avgScore}%`} icon={<BarChart size={24} className="text-blue-400" />} colorClass="border-blue-500/50" />
                                                <MetricCard title="Accuracy" value={`${result.metrics.accuracy}%`} icon={<TrendingUp size={24} className="text-green-400" />} colorClass="border-green-500/50" />
                                                <MetricCard title="Tests Attempted" value={result.metrics.testsAttempted} icon={<BookOpen size={24} className="text-purple-400" />} colorClass="border-purple-500/50" />
                                                <MetricCard title="Avg. Time/Q" value={`${result.metrics.avgTimePerQuestion}s`} icon={<Clock size={24} className="text-yellow-400" />} colorClass="border-yellow-500/50" />
                                                <MetricCard title="Strongest Subject" value={result.metrics.strongestSubject} icon={<Award size={24} className="text-cyan-400" />} colorClass="border-cyan-500/50" />
                                                <MetricCard title="Weakest Subject" value={result.metrics.weakestSubject} icon={<X size={24} className="text-red-400" />} colorClass="border-red-500/50" />
                                                <MetricCard title="Improvement Rate" value={result.metrics.improvementRate} icon={<LineChart size={24} className="text-orange-400" />} colorClass="border-orange-500/50" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Visualizations */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    <ChartContainer title="Avg Score by Subject" icon={<BarChart size={24} className="mr-3 text-cyan-400" />}>
                                        {comparisonResults.map((result, index) => (
                                            <div key={result.id} className="mb-6 last:mb-0">
                                                <h3 className="text-lg font-semibold text-white mb-2">{result.name}</h3>
                                                {renderBarChart(result.subjectPerformance, 'average', 'subject', `bg-[${getComparisonColor(index)}]`)}
                                            </div>
                                        ))}
                                    </ChartContainer>
                                    <ChartContainer title="Performance Trend Over Time" icon={<LineChart size={24} className="mr-3 text-purple-400" />}>
                                        {comparisonResults.map((result, index) => (
                                            <div key={result.id} className="mb-6 last:mb-0">
                                                <h3 className="text-lg font-semibold text-white mb-2">{result.name}</h3>
                                                {renderLineChart(result.performanceTrend, getComparisonColor(index))}
                                            </div>
                                        ))}
                                    </ChartContainer>
                                </div>

                                {/* Table Comparison */}
                                <ChartContainer title="Detailed Comparison Table" icon={<Scale size={24} className="mr-3 text-green-400" />}>
                                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                                        <table className="min-w-full divide-y divide-slate-800">
                                            <thead className="bg-slate-800/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Metric</th>
                                                    {comparisonResults.map((result, index) => (
                                                        <th key={result.id} className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                            {result.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800">
                                                {[
                                                    { label: 'Avg. Score (%)', key: 'avgScore' },
                                                    { label: 'Accuracy (%)', key: 'accuracy' },
                                                    { label: 'Tests Attempted', key: 'testsAttempted' },
                                                    { label: 'Avg. Time per Question (s)', key: 'avgTimePerQuestion' },
                                                    { label: 'Strongest Subject', key: 'strongestSubject' },
                                                    { label: 'Weakest Subject', key: 'weakestSubject' },
                                                    { label: 'Improvement Rate', key: 'improvementRate' },
                                                ].map((metric, mIndex) => (
                                                    <tr key={mIndex} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{metric.label}</td>
                                                        {comparisonResults.map((result, rIndex) => (
                                                            <td key={`${result.id}-${metric.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                                {result.metrics[metric.key]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </ChartContainer>

                                {/* AI Insights Section */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Brain size={24} className="mr-3 text-orange-400" /> AI-Powered Insights</h2>
                                    <ul className="space-y-3 text-slate-300 list-disc list-inside">
                                        {mockInsights.map((insight, index) => (
                                            <li key={index}>{insight}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Export Options */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                                    <button
                                        onClick={() => alert("Downloading comparison report as PDF...")}
                                        className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <Download size={20} className="mr-2" /> Download PDF
                                    </button>
                                    <button
                                        onClick={() => alert("Downloading comparison report as Excel...")}
                                        className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <Download size={20} className="mr-2" /> Download Excel
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Back to Analytics Dashboard */}
                        <div className="flex justify-center mt-12">
                            <Link
                                to="/admin/analytics-dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-200 flex items-center justify-center"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Back to Analytics Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Compare, analyze, and optimize student performance 📊" />
        </div>
    );
};

export default StudentComparisonPage;