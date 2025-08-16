"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScheduleTestModal from '../components/ScheduleTestModal';
import TestCalendar from '../components/TestCalendar'; // Will create this next
import { PlusCircle, CalendarDays, Edit, Trash2, Eye, Filter, ChevronDown, Clock, Users, BookOpen, LayoutDashboard, X } from 'lucide-react';

// Mock Data for Scheduled Tests
const initialScheduledTests = [
    {
        id: 1,
        title: "Science Quiz - Chapter 3",
        description: "Short quiz on Ecosystems.",
        source: "Question Bank",
        testId: "qb-123",
        dateTime: "2024-09-01T10:00",
        duration: 45,
        recipients: "Specific Batch(es)",
        selectedBatches: ['class6a'],
        selectedStudents: [],
        negativeMarking: false,
        autoSubmit: true,
        allowRetake: false,
        autoNotify: true,
        status: "Scheduled"
    },
    {
        id: 2,
        title: "Math Mock Test - Full Syllabus",
        description: "Comprehensive mock test covering all math topics for JNV.",
        source: "AI Generated",
        testId: "ai-456",
        dateTime: "2024-09-05T11:30",
        duration: 90,
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        negativeMarking: true,
        autoSubmit: true,
        allowRetake: false,
        autoNotify: true,
        status: "Scheduled"
    },
    {
        id: 3,
        title: "English Grammar Practice",
        description: "Practice test on advanced grammar rules.",
        source: "Template",
        testId: "temp-789",
        dateTime: "2024-09-10T09:00",
        duration: 30,
        recipients: "Specific Student(s)",
        selectedBatches: [],
        selectedStudents: [1], // Anusha Sharma
        negativeMarking: false,
        autoSubmit: true,
        allowRetake: true,
        autoNotify: true,
        status: "Scheduled"
    },
    {
        id: 4,
        title: "Reasoning - Figure Analysis",
        description: "Draft test for figure analysis.",
        source: "Manual",
        testId: "man-101",
        dateTime: "2024-09-15T14:00",
        duration: 60,
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        negativeMarking: false,
        autoSubmit: false,
        allowRetake: false,
        autoNotify: false,
        status: "Draft"
    }
];

// Mock Data for recipients (same as in modal for consistency)
const mockBatches = [
    { id: 'class6a', name: "Class 6 - Batch A" },
    { id: 'class6b', name: "Class 6 - Batch B" },
    { id: 'class7a', name: "Class 7 - Batch A" },
    { id: 'class7b', name: "Class 7 - Batch B" },
];

const mockStudents = [
    { id: 1, name: "Anusha Sharma", classGrade: "Class 6" },
    { id: 2, name: "Rahul Verma", classGrade: "Class 6" },
    { id: 3, name: "Priya Singh", classGrade: "Class 7" },
    { id: 4, name: "Amit Kumar", classGrade: "Class 6" },
    { id: 5, name: "Sneha Reddy", classGrade: "Class 7" },
];


const TestSchedulingPage = () => {
    const [scheduledTests, setScheduledTests] = useState(initialScheduledTests);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

    const [filterBatch, setFilterBatch] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDate, setFilterDate] = useState(''); // For filtering by specific date
    const [isDesktop, setIsDesktop] = useState(false);

    const statuses = ["All", "Scheduled", "Draft", "Completed", "Cancelled"]; // Added Completed, Cancelled for realism

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getRecipientNames = (test) => {
        if (test.recipients === 'All Students') return 'All Students';
        if (test.recipients === 'Specific Batch(es)' && test.selectedBatches.length > 0) {
            return test.selectedBatches.map(id => mockBatches.find(b => b.id === id)?.name || id).join(', ');
        }
        if (test.recipients === 'Specific Student(s)' && test.selectedStudents.length > 0) {
            return test.selectedStudents.map(id => mockStudents.find(s => s.id === id)?.name || id).join(', ');
        }
        return 'N/A';
    };

    const filteredTests = scheduledTests.filter(test => {
        const matchesBatch = filterBatch === 'All' || (test.recipients === 'Specific Batch(es)' && test.selectedBatches.includes(filterBatch)) || (test.recipients === 'All Students' && filterBatch === 'All');
        const matchesStatus = filterStatus === 'All' || test.status === filterStatus;
        const matchesDate = filterDate === '' || test.dateTime.startsWith(filterDate);
        return matchesBatch && matchesStatus && matchesDate;
    });

    const handleScheduleNewTest = () => {
        setEditingTest(null);
        setIsModalOpen(true);
    };

    const handleEditTest = (test) => {
        setEditingTest(test);
        setIsModalOpen(true);
    };

    const handleSaveTest = (newTestData) => {
        if (newTestData.id && scheduledTests.some(t => t.id === newTestData.id)) {
            setScheduledTests(prev => prev.map(t => t.id === newTestData.id ? newTestData : t));
        } else {
            const newId = Math.max(...scheduledTests.map(t => t.id), 0) + 1;
            setScheduledTests(prev => [...prev, { ...newTestData, id: newId }]);
        }
    };

    const handleDeleteTest = (test) => {
        setTestToDelete(test);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setScheduledTests(prev => prev.filter(t => t.id !== testToDelete.id));
        setShowDeleteConfirm(false);
        setTestToDelete(null);
    };

    const handleCancelTest = (testId) => {
        setScheduledTests(prev => prev.map(t => t.id === testId ? { ...t, status: 'Cancelled' } : t));
        alert("Test cancelled (mock).");
    };

    const handlePublishTest = (testId) => {
        setScheduledTests(prev => prev.map(t => t.id === testId ? { ...t, status: 'Scheduled' } : t));
        alert("Test published (mock).");
    };

    const getStatusTagClasses = (status) => {
        switch (status) {
            case 'Scheduled': return 'bg-blue-600/30 text-blue-200 border-blue-500/50';
            case 'Draft': return 'bg-slate-700/30 text-slate-400 border-slate-600/50';
            case 'Completed': return 'bg-green-600/30 text-green-200 border-green-500/50';
            case 'Cancelled': return 'bg-red-600/30 text-red-200 border-red-500/50';
            default: return '';
        }
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <CalendarDays size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Clock size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📅 Test Scheduling</h1>
                                <p className="mt-2 text-lg text-slate-400">Organize and manage all your upcoming tests.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-0">
                                <button
                                    onClick={handleScheduleNewTest}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <PlusCircle size={20} className="mr-2" /> Schedule New Test
                                </button>
                                <button
                                    onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                                    className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <CalendarDays size={20} className="mr-2" /> {viewMode === 'list' ? 'View Calendar' : 'View List'}
                                </button>
                            </div>
                        </div>

                        {viewMode === 'list' ? (
                            <>
                                {/* Filters */}
                                <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Filter size={24} className="mr-3 text-purple-400" /> Filters</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="relative">
                                            <label htmlFor="filterBatch" className="sr-only">Filter by Batch</label>
                                            <select id="filterBatch" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
                                                <option value="All">All Batches</option>
                                                {mockBatches.map(batch => <option key={batch.id} value={batch.id}>{batch.name}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="filterStatus" className="sr-only">Filter by Status</label>
                                            <select id="filterStatus" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        </div>
                                        <div>
                                            <label htmlFor="filterDate" className="sr-only">Filter by Date</label>
                                            <input type="date" id="filterDate" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                                value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Scheduled Tests List */}
                                {filteredTests.length > 0 ? (
                                    <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                        <table className="min-w-full divide-y divide-slate-800">
                                            <thead className="bg-slate-800/50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Test Name</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date & Time</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Assigned To</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800">
                                                {filteredTests.map((test, index) => (
                                                    <tr key={test.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                        <td className="px-6 py-4 max-w-xs truncate text-sm font-medium text-white">{test.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                            {new Date(test.dateTime).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.duration} min</td>
                                                        <td className="px-6 py-4 max-w-xs truncate text-sm text-slate-300">{getRecipientNames(test)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusTagClasses(test.status)}`}>
                                                                {test.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                            <div className="flex items-center justify-center space-x-3">
                                                                <button onClick={() => handleEditTest(test)} className="text-blue-400 hover:text-blue-300" title="Edit Test"><Edit size={18} /></button>
                                                                {test.status === 'Scheduled' && (
                                                                    <button onClick={() => handleCancelTest(test.id)} className="text-yellow-400 hover:text-yellow-300" title="Cancel Test"><X size={18} /></button>
                                                                )}
                                                                {test.status === 'Draft' && (
                                                                    <button onClick={() => handlePublishTest(test.id)} className="text-green-400 hover:text-green-300" title="Publish Test"><BookOpen size={18} /></button>
                                                                )}
                                                                <button onClick={() => handleDeleteTest(test)} className="text-red-400 hover:text-red-300" title="Delete Test"><Trash2 size={18} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                        <CalendarDays size={64} className="mx-auto mb-6 text-slate-600 animate-pulse-slow" />
                                        <h2 className="text-2xl font-bold text-white mb-3">No tests scheduled yet.</h2>
                                        <p className="text-slate-400 max-w-md mx-auto">Create one to begin organizing your mock exams and quizzes.</p>
                                        <button
                                            onClick={handleScheduleNewTest}
                                            className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                        >
                                            <PlusCircle size={20} className="mr-2" /> Schedule Your First Test
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center"><CalendarDays size={24} className="mr-3 text-cyan-400" /> Calendar View</h2>
                                <TestCalendar scheduledTests={scheduledTests} />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Manage your test schedule with precision 📅" />

            <ScheduleTestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                testData={editingTest}
                onSave={handleSaveTest}
                mockBatches={mockBatches}
                mockStudents={mockStudents}
            />

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 text-center shadow-xl animate-scale-in max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
                        <p className="text-slate-300 mb-6">Are you sure you want to remove "<span className="font-semibold text-red-400">{testToDelete?.title}</span>"?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                            >
                                Yes, Remove
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
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

export default TestSchedulingPage;