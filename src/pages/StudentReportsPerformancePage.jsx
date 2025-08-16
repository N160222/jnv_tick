"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Award, BarChart, CheckCircle, XCircle, MinusCircle, Edit, LogOut, Book, Bell, Settings, ArrowLeft, TrendingUp, PieChart, ClipboardPen, CalendarDays, GraduationCap, Phone, Mail, BookOpen, Eye, Download, Search, Filter, ChevronDown, ListChecks, LayoutDashboard } from 'lucide-react';

// Mock Data for Students and their performance
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
        lastActive: "2024-08-25",
        testHistory: [
            { id: 101, name: "Reasoning - Pattern Recognition", date: "2024-08-15", subject: "Reasoning", score: 92, timeTaken: "25 min", rank: 1, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}, {q:3, status:'wrong'}, {q:4, status:'correct'}, {q:5, status:'skipped'}] },
            { id: 102, name: "Maths - Basic Arithmetic", date: "2024-08-14", subject: "Mathematics", score: 85, timeTaken: "30 min", rank: 3, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'correct'}] },
            { id: 103, name: "Drawing - Figure Completion", date: "2024-08-13", subject: "Drawing", score: 78, timeTaken: "20 min", rank: 5, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'skipped'}, {q:3, status:'correct'}, {q:4, status:'wrong'}, {q:5, status:'correct'}] },
            { id: 104, name: "Language - Story Comprehension", date: "2024-08-12", subject: "Language", score: 95, timeTaken: "35 min", rank: 1, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'correct'}] },
            { id: 105, name: "Reasoning - Series Completion", date: "2024-08-11", subject: "Reasoning", score: 88, timeTaken: "28 min", rank: 2, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'wrong'}] },
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
        lastActive: "2024-08-24",
        testHistory: [
            { id: 201, name: "Maths - Basic Arithmetic", date: "2024-08-16", subject: "Mathematics", score: 70, timeTaken: "40 min", rank: 8, status: "Completed", breakdown: [{q:1, status:'wrong'}, {q:2, status:'correct'}, {q:3, status:'correct'}, {q:4, status:'wrong'}, {q:5, status:'correct'}] },
            { id: 202, name: "Language - Grammar Basics", date: "2024-08-15", subject: "Language", score: 82, timeTaken: "30 min", rank: 4, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'correct'}] },
            { id: 203, name: "Reasoning - Analogy", date: "2024-08-14", subject: "Reasoning", score: 65, timeTaken: "35 min", rank: 10, status: "Completed", breakdown: [{q:1, status:'wrong'}, {q:2, status:'wrong'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'skipped'}] },
        ],
        teacherNotes: "Rahul is a keen learner but struggles with complex problem-solving. Encourage more practice in challenging areas.",
    },
    {
        id: 3,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        phone: "9988776655",
        classGrade: "Class 7",
        rollNo: "JNV-003",
        avatar: "https://i.pravatar.cc/150?img=25",
        totalTests: 10,
        averageScore: 80,
        bestScore: 90,
        overallRank: "3rd (Class 7)",
        lastActive: "2024-08-23",
        testHistory: [
            { id: 301, name: "Science - Ecosystems", date: "2024-08-20", subject: "Science", score: 90, timeTaken: "45 min", rank: 1, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'correct'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'correct'}] },
            { id: 302, name: "Maths - Geometry", date: "2024-08-18", subject: "Mathematics", score: 75, timeTaken: "50 min", rank: 5, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}, {q:3, status:'correct'}, {q:4, status:'wrong'}, {q:5, status:'correct'}] },
        ],
        teacherNotes: "Priya is very consistent. Focus on improving speed in longer tests.",
    },
    {
        id: 4,
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "9000111222",
        classGrade: "Class 6",
        rollNo: "JNV-004",
        avatar: "https://i.pravatar.cc/150?img=60",
        totalTests: 8,
        averageScore: 60,
        bestScore: 70,
        overallRank: "10th (Class 6)",
        lastActive: "2024-08-22",
        testHistory: [
            { id: 401, name: "Reasoning - Classification", date: "2024-08-21", subject: "Reasoning", score: 55, timeTaken: "30 min", rank: 12, status: "Completed", breakdown: [{q:1, status:'wrong'}, {q:2, status:'wrong'}, {q:3, status:'skipped'}, {q:4, status:'correct'}, {q:5, status:'wrong'}] },
            { id: 402, name: "Language - Vocabulary", date: "2024-08-19", subject: "Language", score: 65, timeTaken: "25 min", rank: 8, status: "Completed", breakdown: [{q:1, status:'correct'}, {q:2, status:'wrong'}, {q:3, status:'correct'}, {q:4, status:'correct'}, {q:5, status:'wrong'}] },
        ],
        teacherNotes: "Amit needs more focused practice in core subjects. Encourage daily short quizzes.",
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

const StudentReportsPerformancePage = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'individual'
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('All');
    const [filterDateRange, setFilterDateRange] = useState('All Time'); // 'All Time', 'Last 7 Days', 'Last 30 Days'
    const [selectedStudentsForBulk, setSelectedStudentsForBulk] = useState([]);

    const availableClasses = ["All", ...new Set(mockStudentsData.map(s => s.classGrade))];
    const dateRanges = ["All Time", "Last 7 Days", "Last 30 Days"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredStudents = mockStudentsData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = filterClass === 'All' || student.classGrade === filterClass;

        const studentLastActiveDate = new Date(student.lastActive);
        const today = new Date();
        let matchesDateRange = true;

        if (filterDateRange === 'Last 7 Days') {
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            matchesDateRange = studentLastActiveDate >= sevenDaysAgo;
        } else if (filterDateRange === 'Last 30 Days') {
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);
            matchesDateRange = studentLastActiveDate >= thirtyDaysAgo;
        }

        return matchesSearch && matchesClass && matchesDateRange;
    });

    const handleViewReport = (student) => {
        setSelectedStudent(student);
        setViewMode('individual');
    };

    const handleBackToList = () => {
        setSelectedStudent(null);
        setViewMode('list');
    };

    const handleDownloadIndividualReport = (student) => {
        alert(`Downloading PDF report for ${student.name}...`);
    };

    const handleCheckboxChange = (studentId) => {
        setSelectedStudentsForBulk(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudentsForBulk(filteredStudents.map(s => s.id));
        } else {
            setSelectedStudentsForBulk([]);
        }
    };

    const handleGenerateBatchSummary = () => {
        if (selectedStudentsForBulk.length === 0) {
            alert("Please select students to generate a batch summary.");
            return;
        }
        const selectedData = mockStudentsData.filter(s => selectedStudentsForBulk.includes(s.id));
        const totalScores = selectedData.reduce((sum, s) => sum + s.averageScore, 0);
        const avgScore = (totalScores / selectedData.length).toFixed(2);
        const highestScore = Math.max(...selectedData.map(s => s.bestScore));
        const lowestScore = Math.min(...selectedData.map(s => s.averageScore));

        alert(`Batch Summary for ${selectedData.length} students:\nAverage Score: ${avgScore}%\nHighest Score: ${highestScore}%\nLowest Score: ${lowestScore}%`);
    };

    const handleExportBatchReport = (format) => {
        if (selectedStudentsForBulk.length === 0) {
            alert(`Please select students to export to ${format}.`);
            return;
        }
        const selectedData = mockStudentsData.filter(s => selectedStudentsForBulk.includes(s.id));
        alert(`Exporting batch report for ${selectedData.length} students to ${format} (mock).`);
    };

    // Helper for individual student report charts
    const getAccuracyDistribution = (testHistory) => {
        let correct = 0;
        let wrong = 0;
        let skipped = 0;
        testHistory.forEach(test => {
            test.breakdown?.forEach(q => {
                if (q.status === 'correct') correct++;
                else if (q.status === 'wrong') wrong++;
                else if (q.status === 'skipped') skipped++;
            });
        });
        const total = correct + wrong + skipped;
        return {
            correct: total > 0 ? ((correct / total) * 100).toFixed(0) : 0,
            wrong: total > 0 ? ((wrong / total) * 100).toFixed(0) : 0,
            skipped: total > 0 ? ((skipped / total) * 100).toFixed(0) : 0,
            totalQuestions: total
        };
    };

    const getSubjectPerformance = (testHistory) => {
        const subjectScores = {};
        const subjectCounts = {};
        testHistory.forEach(test => {
            subjectScores[test.subject] = (subjectScores[test.subject] || 0) + test.score;
            subjectCounts[test.subject] = (subjectCounts[test.subject] || 0) + 1;
        });
        return Object.keys(subjectScores).map(subject => ({
            subject,
            average: (subjectScores[subject] / subjectCounts[subject]).toFixed(0)
        }));
    };

    const getScoresOverTime = (testHistory) => {
        return testHistory.map(test => ({ date: test.date, score: test.score })).reverse(); // Reverse to show chronologically
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
                        {viewMode === 'list' && (
                            <>
                                <div className="mb-8 text-center lg:text-left">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📊 Student Reports & Performance</h1>
                                    <p className="mt-2 text-lg text-slate-400">Analyze student performance and generate detailed insights.</p>
                                </div>

                                {/* Filters & Search */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Filter size={24} className="mr-3 text-purple-400" /> Filters & Search</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="relative lg:col-span-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Search student by name, email, or roll no..."
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="filterClass" className="sr-only">Filter by Class/Batch</label>
                                            <select id="filterClass" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                                                {availableClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="filterDateRange" className="sr-only">Filter by Date Range</label>
                                            <select id="filterDateRange" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={filterDateRange} onChange={(e) => setFilterDateRange(e.target.value)}>
                                                {dateRanges.map(range => <option key={range} value={range}>{range}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Bulk Actions */}
                                {selectedStudentsForBulk.length > 0 && (
                                    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                        <span className="text-lg font-bold text-white">{selectedStudentsForBulk.length} students selected</span>
                                        <div className="flex flex-wrap gap-3">
                                            <button onClick={handleGenerateBatchSummary} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center">
                                                <ListChecks size={20} className="mr-2" /> Generate Batch Summary
                                            </button>
                                            <button onClick={() => handleExportBatchReport('CSV')} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                                                <Download size={20} className="mr-2" /> Export CSV
                                            </button>
                                            <button onClick={() => handleExportBatchReport('PDF')} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                                                <Download size={20} className="mr-2" /> Export PDF
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Student List Table */}
                                {filteredStudents.length > 0 ? (
                                    <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                        <table className="min-w-full divide-y divide-slate-800">
                                            <thead className="bg-slate-800/50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-cyan-500 rounded border-slate-700 bg-slate-900"
                                                            onChange={handleSelectAll}
                                                            checked={selectedStudentsForBulk.length === filteredStudents.length && filteredStudents.length > 0}
                                                            disabled={filteredStudents.length === 0}
                                                        />
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Student Name</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email / Roll No</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tests Attempted</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Avg. Score</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Accuracy %</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Active</th>
                                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800">
                                                {filteredStudents.map((student, index) => (
                                                    <tr key={student.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input type="checkbox" className="form-checkbox h-4 w-4 text-cyan-500 rounded border-slate-700 bg-slate-900"
                                                                checked={selectedStudentsForBulk.includes(student.id)}
                                                                onChange={() => handleCheckboxChange(student.id)}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                                                            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                                            {student.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.email} / {student.rollNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.totalTests}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{student.averageScore}%</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">{student.averageScore + 5}%</td> {/* Mock accuracy */}
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.lastActive}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                            <button onClick={() => handleViewReport(student)} className="text-purple-400 hover:text-purple-300" title="View Detailed Report"><Eye size={18} /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                        <BarChart size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                        <h2 className="text-2xl font-bold text-white mb-3">No student reports available.</h2>
                                        <p className="text-slate-400 max-w-md mx-auto">Reports will appear here once students attempt tests or match your filter criteria.</p>
                                        <Link
                                            to="/admin/manage-students"
                                            className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                        >
                                            <Users size={20} className="mr-2" /> Manage Students
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                        {viewMode === 'individual' && selectedStudent && (
                            <>
                                {/* Header Section for Individual Report */}
                                <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                                    <div className="flex items-center mb-4 sm:mb-0">
                                        <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-20 h-20 rounded-full mr-4 border-4 border-cyan-500 shadow-lg" />
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{selectedStudent.name}</h1>
                                            <p className="mt-1 text-lg text-slate-400">{selectedStudent.classGrade} | Roll No: {selectedStudent.rollNo}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleBackToList} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center">
                                        <ArrowLeft size={20} className="mr-2" /> Back to All Reports
                                    </button>
                                </div>

                                {/* Performance Summary Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                    <StatCard
                                        title="Total Tests Taken"
                                        value={selectedStudent.totalTests}
                                        icon={<Book size={24} className="text-blue-400" />}
                                        colorClass="border-blue-500/50 hover:shadow-blue-900/30"
                                    />
                                    <StatCard
                                        title="Average Score %"
                                        value={`${selectedStudent.averageScore}%`}
                                        icon={<BarChart size={24} className="text-green-400" />}
                                        colorClass="border-green-500/50 hover:shadow-green-900/30"
                                    />
                                    <StatCard
                                        title="Best Score"
                                        value={`${selectedStudent.bestScore}%`}
                                        icon={<Award size={24} className="text-yellow-400" />}
                                        colorClass="border-yellow-500/50 hover:shadow-yellow-900/30"
                                    />
                                    <StatCard
                                        title="Overall Rank"
                                        value={selectedStudent.overallRank}
                                        icon={<TrendingUp size={24} className="text-purple-400" />}
                                        colorClass="border-purple-500/50 hover:shadow-purple-900/30"
                                    />
                                </div>

                                {/* Progress Charts Section */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BarChart size={24} className="mr-3 text-green-400" /> Progress Charts</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Line Graph: Scores over time */}
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <h3 className="text-lg font-semibold text-white mb-4">Scores Over Time</h3>
                                            <div className="relative h-48 w-full flex items-end justify-around p-2">
                                                {/* Mock Line Graph */}
                                                {getScoresOverTime(selectedStudent.testHistory).map((data, i, arr) => (
                                                    <div
                                                        key={i}
                                                        className="absolute bottom-0 w-2 h-full bg-blue-500/20 rounded-t-full"
                                                        style={{
                                                            left: `${(i / (arr.length - 1)) * 100}%`,
                                                            height: `${data.score}%`,
                                                            transition: 'height 0.5s ease-out',
                                                            transform: 'translateX(-50%)'
                                                        }}
                                                    >
                                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white">{data.score}</div>
                                                    </div>
                                                ))}
                                                <div className="absolute inset-0">
                                                    {getScoresOverTime(selectedStudent.testHistory).length > 1 && getScoresOverTime(selectedStudent.testHistory).map((data, i, arr) => {
                                                        if (i === 0) return null;
                                                        const prevData = arr[i - 1];
                                                        const x1 = ( (i - 1) / (arr.length - 1) ) * 100;
                                                        const y1 = 100 - prevData.score; // Invert score for SVG y-axis
                                                        const x2 = ( i / (arr.length - 1) ) * 100;
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
                                                {getScoresOverTime(selectedStudent.testHistory).map((data, i) => (
                                                    <span key={i}>{data.date.substring(5)}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bar Chart: Subject-wise performance */}
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <h3 className="text-lg font-semibold text-white mb-4">Subject Performance</h3>
                                            <div className="h-48 w-full flex items-end justify-around p-2">
                                                {getSubjectPerformance(selectedStudent.testHistory).map((data, i) => (
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
                                                        #22c55e 0% ${getAccuracyDistribution(selectedStudent.testHistory).correct}%,
                                                        #ef4444 ${getAccuracyDistribution(selectedStudent.testHistory).correct}% ${parseFloat(getAccuracyDistribution(selectedStudent.testHistory).correct) + parseFloat(getAccuracyDistribution(selectedStudent.testHistory).wrong)}%,
                                                        #64748b ${parseFloat(getAccuracyDistribution(selectedStudent.testHistory).correct) + parseFloat(getAccuracyDistribution(selectedStudent.testHistory).wrong)}% 100%
                                                    )`
                                                }}
                                            >
                                                <div className="absolute w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center text-sm text-slate-400">
                                                    Total: {getAccuracyDistribution(selectedStudent.testHistory).totalQuestions}
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                                                <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Correct ({getAccuracyDistribution(selectedStudent.testHistory).correct}%)</div>
                                                <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Wrong ({getAccuracyDistribution(selectedStudent.testHistory).wrong}%)</div>
                                                <div className="flex items-center"><span className="w-3 h-3 bg-slate-500 rounded-full mr-2"></span> Skipped ({getAccuracyDistribution(selectedStudent.testHistory).skipped}%)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Test History */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
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
                                                {selectedStudent.testHistory.length > 0 ? (
                                                    selectedStudent.testHistory.map((test, index) => (
                                                        <tr key={test.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{test.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.subject}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{test.score}%</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.timeTaken}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${test.status === 'Completed' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                                    {test.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                                <Link to={`/admin/student-performance/${selectedStudent.id}`} className="text-purple-400 hover:text-purple-300" title="View Breakdown"><Eye size={18} /></Link>
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

                                {/* Teacher Notes Section */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center"><ClipboardPen size={24} className="mr-3 text-yellow-400" /> Teacher Notes</h2>
                                    <textarea
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition h-40"
                                        placeholder="Add your remarks about student performance here..."
                                        value={selectedStudent.teacherNotes}
                                        onChange={(e) => setSelectedStudent(prev => ({ ...prev, teacherNotes: e.target.value }))}
                                    ></textarea>
                                    <button
                                        onClick={() => alert("Notes saved!")}
                                        className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Save Notes
                                    </button>
                                </div>

                                {/* Download & Share Options */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                                    <button
                                        onClick={() => handleDownloadIndividualReport(selectedStudent)}
                                        className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <Download size={20} className="mr-2" /> Download Report PDF
                                    </button>
                                    <Link
                                        to="/admin/results-reports"
                                        className="w-full sm:w-auto text-center px-8 py-3 border border-purple-600 text-purple-300 font-semibold rounded-lg hover:bg-purple-900/30 hover:text-white transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <BarChart size={20} className="mr-2" /> View Overall Test Reports
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Detailed insights for student success 📈" />
        </div>
    );
};

export default StudentReportsPerformancePage;