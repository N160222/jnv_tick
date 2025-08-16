"use client";

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Award, BarChart, CheckCircle, XCircle, MinusCircle, Edit, LogOut, Book, Bell, Settings, ArrowLeft, TrendingUp, PieChart, ClipboardPen, CalendarDays, GraduationCap, Phone, Mail, BookOpen, Eye, Download } from 'lucide-react';

// Mock Data for a single student (in a real app, this would come from an API)
const mockStudentsData = [
    {
        id: 1,
        name: "Anusha Sharma",
        email: "anusha.sharma@example.com",
        phone: "9876543210",
        classGrade: "Class 6",
        rollNo: "JNV-001",
        avatar: "https://i.pravatar.cc/150?img=48",
        totalTests: 15,
        averageScore: 88,
        bestScore: 95,
        overallRank: "1st (Class 6)",
        testHistory: [
            { id: 101, name: "Reasoning - Pattern Recognition", date: "2024-08-15", subject: "Reasoning", score: 92, timeTaken: "25 min", rank: 1, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}] },
            { id: 102, name: "Maths - Basic Arithmetic", date: "2024-08-14", subject: "Maths", score: 85, timeTaken: "30 min", rank: 3, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}] },
            { id: 103, name: "Drawing - Figure Completion", date: "2024-08-13", subject: "Drawing", score: 78, timeTaken: "20 min", rank: 5, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'skipped'}] },
            { id: 104, name: "Language - Story Comprehension", date: "2024-08-12", subject: "Language", score: 95, timeTaken: "35 min", rank: 1, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}] },
            { id: 105, name: "Reasoning - Series Completion", date: "2024-08-11", subject: "Reasoning", score: 88, timeTaken: "28 min", rank: 2, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}] },
        ],
        teacherNotes: "Anusha shows strong analytical skills, especially in Reasoning. Needs to improve speed in Maths. Consistent effort is commendable.",
    },
    {
        id: 2,
        name: "Rahul Verma",
        email: "rahul.verma@example.com",
        phone: "9123456789",
        classGrade: "Class 6",
        rollNo: "JNV-002",
        avatar: "https://i.pravatar.cc/150?img=68",
        totalTests: 12,
        averageScore: 75,
        bestScore: 82,
        overallRank: "5th (Class 6)",
        testHistory: [
            { id: 201, name: "Maths - Basic Arithmetic", date: "2024-08-16", subject: "Maths", score: 70, timeTaken: "40 min", rank: 8, status: "Passed", breakdown: [{q:1, status:'wrong'}, {q:2, status:'correct'}] },
            { id: 202, name: "Language - Grammar Basics", date: "2024-08-15", subject: "Language", score: 82, timeTaken: "30 min", rank: 4, status: "Passed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}] },
        ],
        teacherNotes: "Rahul is a keen learner but struggles with complex problem-solving. Encourage more practice in challenging areas.",
    },
];

const StatCard = ({ title, value, icon, colorClass }) => (
    <div className={`glass-effect rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClass}`}>
        <div className={`p-3 rounded-full inline-block mb-4 ${colorClass.replace('border-', 'bg-').replace('/50', '/30')}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
    </div>
);

const StudentPerformanceReportPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = mockStudentsData.find(s => s.id === parseInt(id));
    const [isDesktop, setIsDesktop] = useState(false);
    const [teacherNotes, setTeacherNotes] = useState(student?.teacherNotes || '');
    const [showTestDetailModal, setShowTestDetailModal] = useState(false);
    const [selectedTestDetail, setSelectedTestDetail] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!student) {
        return (
            <div className="min-h-screen flex flex-col main-bg-gradient text-white">
                <Header isAdmin={true} />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center glass-effect rounded-2xl p-8">
                        <h1 className="text-3xl font-bold mb-4">Student Not Found</h1>
                        <p className="text-slate-400 mb-6">The student profile you are looking for does not exist.</p>
                        <Link to="/admin/results-reports" className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center mx-auto w-fit">
                            <ArrowLeft size={20} className="mr-2" /> Back to Results & Reports
                        </Link>
                    </div>
                </main>
                <Footer minimal="Student not found 😔" />
            </div>
        );
    }

    const handleSaveNotes = () => {
        alert("✅ Teacher notes saved successfully!");
        console.log("Saved notes for", student.name, ":", teacherNotes);
    };

    const handleExportPDF = () => {
        alert(`Downloading PDF report for ${student.name}...`);
    };

    const handleExportCSV = () => {
        alert(`Downloading CSV report for ${student.name}...`);
    };

    const handlePrintCertificate = () => {
        alert(`Generating performance certificate for ${student.name}...`);
    };

    const openTestDetailModal = (test) => {
        setSelectedTestDetail(test);
        setShowTestDetailModal(true);
    };

    const closeTestDetailModal = () => {
        setShowTestDetailModal(false);
        setSelectedTestDetail(null);
    };

    // Mock data for charts
    const scoresOverTime = student.testHistory.map(test => ({ date: test.date, score: test.score })).reverse();
    const subjectPerformance = student.testHistory.reduce((acc, test) => {
        acc[test.subject] = (acc[test.subject] || 0) + test.score;
        return acc;
    }, {});
    const subjectCounts = student.testHistory.reduce((acc, test) => {
        acc[test.subject] = (acc[test.subject] || 0) + 1;
        return acc;
    }, {});
    const avgSubjectPerformance = Object.keys(subjectPerformance).map(subject => ({
        subject,
        average: (subjectPerformance[subject] / subjectCounts[subject]).toFixed(0)
    }));

    const accuracyDistribution = {
        correct: student.testHistory.reduce((sum, test) => sum + (test.breakdown?.filter(q => q.status === 'correct').length || 0), 0),
        wrong: student.testHistory.reduce((sum, test) => sum + (test.breakdown?.filter(q => q.status === 'wrong').length || 0), 0),
        skipped: student.testHistory.reduce((sum, test) => sum + (test.breakdown?.filter(q => q.status === 'skipped').length || 0), 0),
    };
    const totalQuestionsAttempted = accuracyDistribution.correct + accuracyDistribution.wrong + accuracyDistribution.skipped;
    const correctPercentage = totalQuestionsAttempted > 0 ? ((accuracyDistribution.correct / totalQuestionsAttempted) * 100).toFixed(0) : 0;
    const wrongPercentage = totalQuestionsAttempted > 0 ? ((accuracyDistribution.wrong / totalQuestionsAttempted) * 100).toFixed(0) : 0;
    const skippedPercentage = totalQuestionsAttempted > 0 ? ((accuracyDistribution.skipped / totalQuestionsAttempted) * 100).toFixed(0) : 0;

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <User size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <TrendingUp size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        {/* Header Section */}
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full mr-4 border-4 border-cyan-500 shadow-lg" />
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{student.name}</h1>
                                    <p className="mt-1 text-lg text-slate-400">{student.classGrade} | Roll No: {student.rollNo}</p>
                                </div>
                            </div>
                            <Link to="/admin/results-reports" className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center">
                                <ArrowLeft size={20} className="mr-2" /> Back to Reports
                            </Link>
                        </div>

                        {/* Performance Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <StatCard
                                title="Total Tests Taken"
                                value={student.totalTests}
                                icon={<Book size={24} className="text-blue-400" />}
                                colorClass="border-blue-500/50 hover:shadow-blue-900/30"
                            />
                            <StatCard
                                title="Average Score %"
                                value={`${student.averageScore}%`}
                                icon={<BarChart size={24} className="text-green-400" />}
                                colorClass="border-green-500/50 hover:shadow-green-900/30"
                            />
                            <StatCard
                                title="Best Score"
                                value={`${student.bestScore}%`}
                                icon={<Award size={24} className="text-yellow-400" />}
                                colorClass="border-yellow-500/50 hover:shadow-yellow-900/30"
                            />
                            <StatCard
                                title="Overall Rank"
                                value={student.overallRank}
                                icon={<TrendingUp size={24} className="text-purple-400" />}
                                colorClass="border-purple-500/50 hover:shadow-purple-900/30"
                            />
                        </div>

                        {/* Detailed Test History */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BookOpen size={24} className="mr-3 text-cyan-400" /> Detailed Test History</h2>
                            <div className="overflow-x-auto rounded-xl border border-slate-800">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Test Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score (%)</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Time Taken</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {student.testHistory.length > 0 ? (
                                            student.testHistory.map((test, index) => (
                                                <tr key={test.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{test.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{test.score}%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.timeTaken}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${test.status === 'Passed' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                            {test.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                        <button onClick={() => openTestDetailModal(test)} className="text-purple-400 hover:text-purple-300" title="View Breakdown"><Eye size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-slate-400">No test history available for this student.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Progress Charts Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BarChart size={24} className="mr-3 text-green-400" /> Progress Charts</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Line Graph: Scores over time */}
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Scores Over Time</h3>
                                    <div className="relative h-48 w-full flex items-end justify-around p-2">
                                        {/* Mock Line Graph */}
                                        {scoresOverTime.map((data, i) => (
                                            <div
                                                key={i}
                                                className="absolute bottom-0 w-2 h-full bg-blue-500/20 rounded-t-full"
                                                style={{
                                                    left: `${(i / (scoresOverTime.length - 1)) * 100}%`,
                                                    height: `${data.score}%`,
                                                    transition: 'height 0.5s ease-out',
                                                    transform: 'translateX(-50%)'
                                                }}
                                            >
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white">{data.score}</div>
                                            </div>
                                        ))}
                                        <div className="absolute inset-0">
                                            {scoresOverTime.length > 1 && scoresOverTime.map((data, i) => {
                                                if (i === 0) return null;
                                                const prevData = scoresOverTime[i - 1];
                                                const x1 = ( (i - 1) / (scoresOverTime.length - 1) ) * 100;
                                                const y1 = 100 - prevData.score; // Invert score for SVG y-axis
                                                const x2 = ( i / (scoresOverTime.length - 1) ) * 100;
                                                const y2 = 100 - data.score; // Invert score for SVG y-axis
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
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        {scoresOverTime.map((data, i) => (
                                            <span key={i}>{data.date.substring(5)}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bar Chart: Subject-wise performance */}
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Subject Performance</h3>
                                    <div className="h-48 w-full flex items-end justify-around p-2">
                                        {avgSubjectPerformance.map((data, i) => (
                                            <div key={i} className="flex flex-col items-center mx-2">
                                                <div
                                                    className="w-8 bg-purple-500 rounded-t-lg transition-all duration-500"
                                                    style={{ height: `${data.average}%` }}
                                                ></div>
                                                <span className="mt-2 text-xs text-white">{data.average}%</span>
                                                <span className="text-xs text-slate-400 mt-1">{data.subject}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pie Chart: Accuracy distribution */}
                                <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center">
                                    <h3 className="text-lg font-semibold text-white mb-4">Accuracy Distribution</h3>
                                    <div className="relative w-48 h-48 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                        style={{
                                            background: `conic-gradient(
                                                #22c55e 0% ${correctPercentage}%,
                                                #ef4444 ${correctPercentage}% ${parseFloat(correctPercentage) + parseFloat(wrongPercentage)}%,
                                                #64748b ${parseFloat(correctPercentage) + parseFloat(wrongPercentage)}% 100%
                                            )`
                                        }}
                                    >
                                        <div className="absolute w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center text-sm text-slate-400">
                                            Total: {totalQuestionsAttempted}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                                        <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Correct ({correctPercentage}%)</div>
                                        <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Wrong ({wrongPercentage}%)</div>
                                        <div className="flex items-center"><span className="w-3 h-3 bg-slate-500 rounded-full mr-2"></span> Skipped ({skippedPercentage}%)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teacher Notes Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><ClipboardPen size={24} className="mr-3 text-yellow-400" /> Teacher Notes</h2>
                            <textarea
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition h-40"
                                placeholder="Add your remarks about student performance here..."
                                value={teacherNotes}
                                onChange={(e) => setTeacherNotes(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleSaveNotes}
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Save Notes
                            </button>
                        </div>

                        {/* Download & Share Options */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                            <button
                                onClick={handleExportCSV}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Export CSV
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Download size={20} className="mr-2" /> Export PDF
                            </button>
                            <button
                                onClick={handlePrintCertificate}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Award size={20} className="mr-2" /> Print Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Detailed insights for student success 📈" />

            {/* Test Detail Modal */}
            {showTestDetailModal && selectedTestDetail && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-2xl w-full relative">
                        <button onClick={closeTestDetailModal} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-white mb-4 text-center">Test Breakdown: {selectedTestDetail.name}</h3>
                        <p className="text-slate-400 text-center mb-6">Score: <span className="font-semibold text-cyan-400">{selectedTestDetail.score}%</span> | Status: <span className={`font-semibold ${selectedTestDetail.status === 'Passed' ? 'text-green-400' : 'text-red-400'}`}>{selectedTestDetail.status}</span></p>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedTestDetail.breakdown && selectedTestDetail.breakdown.length > 0 ? (
                                selectedTestDetail.breakdown.map((q, index) => (
                                    <div key={index} className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between">
                                        <span className="text-slate-300">Question {q.q}</span>
                                        {q.status === 'correct' && <CheckCircle size={20} className="text-green-400" />}
                                        {q.status === 'wrong' && <XCircle size={20} className="text-red-400" />}
                                        {q.status === 'skipped' && <MinusCircle size={20} className="text-slate-400" />}
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-center">No question breakdown available for this test.</p>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={closeTestDetailModal}
                                className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentPerformanceReportPage;