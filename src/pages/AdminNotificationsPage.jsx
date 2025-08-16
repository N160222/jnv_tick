"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateAnnouncementModal from '../components/CreateAnnouncementModal';
import { BellRing, PlusCircle, Edit, Trash2, Eye, Search, Filter, ChevronDown, X, CalendarDays, Users, Layers, User, Activity, TrendingUp, BarChart } from 'lucide-react';

// Mock Data for Announcements
const initialAnnouncements = [
    {
        id: 1,
        title: "Mock Test Schedule Update",
        message: "Dear students, please note the revised schedule for the upcoming Reasoning Mock Test. The test will now be held on 25th August at 10:00 AM.",
        type: "Exam Update",
        recipients: "Specific Batch(es)",
        selectedBatches: ['class6a', 'class6b'],
        selectedStudents: [],
        attachments: [],
        schedule: "Send Now",
        sentOn: "2024-08-15",
        status: "Sent",
        readCount: 150, // Mock analytics
        totalRecipients: 200, // Mock analytics
    },
    {
        id: 2,
        title: "Important Fee Reminder",
        message: "This is a gentle reminder for the pending tuition fees. Please ensure payment by 20th August to avoid any interruptions in service.",
        type: "Urgent Alert",
        recipients: "Specific Student(s)",
        selectedBatches: [],
        selectedStudents: [1, 4], // Anusha Sharma, Amit Kumar
        attachments: [],
        schedule: "Send Now",
        sentOn: "2024-08-14",
        status: "Sent",
        readCount: 2,
        totalRecipients: 2,
    },
    {
        id: 3,
        title: "July Performance Results Published",
        message: "The detailed performance reports for all tests attempted in July are now available on your student dashboard. Review your progress!",
        type: "Result Published",
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        attachments: ['July_Report_Summary.pdf'],
        schedule: "Send Now",
        sentOn: "2024-08-12",
        status: "Sent",
        readCount: 1000,
        totalRecipients: 1250,
    },
    {
        id: 4,
        title: "Upcoming Holiday Announcement",
        message: "The academy will remain closed on 26th January for Republic Day. Classes will resume on 27th January.",
        type: "General Info",
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        attachments: [],
        schedule: "Schedule for later",
        scheduledDate: "2025-01-20",
        status: "Scheduled",
        readCount: 0,
        totalRecipients: 1250,
    },
    {
        id: 5,
        title: "New AI Tutor Features",
        message: "Exciting news! Our AI Tutor now supports voice input and provides instant feedback on drawing questions. Try it out!",
        type: "General Info",
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        attachments: [],
        schedule: "Send Now",
        sentOn: "2024-08-10",
        status: "Sent",
        readCount: 800,
        totalRecipients: 1250,
    },
    {
        id: 6,
        title: "Draft: New Course Launch",
        message: "We are planning to launch a new advanced course for Class 7 students. More details coming soon!",
        type: "General Info",
        recipients: "All Students",
        selectedBatches: [],
        selectedStudents: [],
        attachments: [],
        schedule: "Send Now",
        sentOn: null,
        status: "Draft",
        readCount: 0,
        totalRecipients: 0,
    },
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


const AdminNotificationsPage = () => {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);

    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterRecipient, setFilterRecipient] = useState('All'); // 'All', 'All Students', 'Specific Batch(es)', 'Specific Student(s)'
    const [filterBatch, setFilterBatch] = useState('All');
    const [filterStudent, setFilterStudent] = useState('All');
    const [isDesktop, setIsDesktop] = useState(false);

    const announcementTypes = ["All", "General Info", "Exam Update", "Result Published", "Urgent Alert"];
    const statuses = ["All", "Sent", "Scheduled", "Draft"];
    const recipientOptions = ["All", "All Students", "Specific Batch(es)", "Specific Student(s)"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getRecipientNames = (announcement) => {
        if (announcement.recipients === 'All Students') return 'All Students';
        if (announcement.recipients === 'Specific Batch(es)' && announcement.selectedBatches.length > 0) {
            return announcement.selectedBatches.map(id => mockBatches.find(b => b.id === id)?.name || id).join(', ');
        }
        if (announcement.recipients === 'Specific Student(s)' && announcement.selectedStudents.length > 0) {
            return announcement.selectedStudents.map(id => mockStudents.find(s => s.id === id)?.name || id).join(', ');
        }
        return 'N/A';
    };

    const filteredAnnouncements = announcements.filter(announcement => {
        const matchesType = filterType === 'All' || announcement.type === filterType;
        const matchesStatus = filterStatus === 'All' || announcement.status === filterStatus;
        
        let matchesRecipient = true;
        if (filterRecipient !== 'All') {
            matchesRecipient = announcement.recipients === filterRecipient;
        }

        let matchesBatch = true;
        if (filterBatch !== 'All' && announcement.recipients === 'Specific Batch(es)') {
            matchesBatch = announcement.selectedBatches.includes(filterBatch);
        }

        let matchesStudent = true;
        if (filterStudent !== 'All' && announcement.recipients === 'Specific Student(s)') {
            matchesStudent = announcement.selectedStudents.includes(parseInt(filterStudent));
        }

        return matchesType && matchesStatus && matchesRecipient && matchesBatch && matchesStudent;
    });

    const handleCreateAnnouncement = () => {
        setEditingAnnouncement(null);
        setIsModalOpen(true);
    };

    const handleEditAnnouncement = (announcement) => {
        setEditingAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const handleSaveAnnouncement = (newAnnouncementData) => {
        if (newAnnouncementData.id && announcements.some(a => a.id === newAnnouncementData.id)) {
            setAnnouncements(prev => prev.map(a => a.id === newAnnouncementData.id ? newAnnouncementData : a));
        } else {
            const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
            setAnnouncements(prev => [...prev, { ...newAnnouncementData, id: newId }]);
        }
    };

    const handleDeleteAnnouncement = (announcement) => {
        setAnnouncementToDelete(announcement);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setAnnouncements(prev => prev.filter(a => a.id !== announcementToDelete.id));
        setShowDeleteConfirm(false);
        setAnnouncementToDelete(null);
    };

    const handleCancelScheduled = (announcementId) => {
        setAnnouncements(prev => prev.map(a => a.id === announcementId ? { ...a, status: 'Cancelled' } : a));
        alert("Announcement scheduled has been cancelled (mock).");
    };

    const getStatusTagClasses = (status) => {
        switch (status) {
            case 'Sent': return 'bg-green-600/30 text-green-200 border-green-500/50';
            case 'Scheduled': return 'bg-yellow-600/30 text-yellow-200 border-yellow-500/50';
            case 'Draft': return 'bg-slate-700/30 text-slate-400 border-slate-600/50';
            case 'Cancelled': return 'bg-red-600/30 text-red-200 border-red-500/50';
            default: return '';
        }
    };

    const getTypeTagClasses = (type) => {
        switch (type) {
            case 'General Info': return 'bg-blue-600/30 text-blue-200 border-blue-500/50';
            case 'Exam Update': return 'bg-cyan-600/30 text-cyan-200 border-cyan-500/50';
            case 'Result Published': return 'bg-purple-600/30 text-purple-200 border-purple-500/50';
            case 'Urgent Alert': return 'bg-red-600/30 text-red-200 border-red-500/50';
            default: return '';
        }
    };

    // Mock Analytics Data
    const totalAnnouncements = announcements.length;
    const sentAnnouncements = announcements.filter(a => a.status === 'Sent').length;
    const scheduledAnnouncements = announcements.filter(a => a.status === 'Scheduled').length;
    const draftAnnouncements = announcements.filter(a => a.status === 'Draft').length;

    const totalReads = announcements.reduce((sum, a) => sum + (a.readCount || 0), 0);
    const totalPossibleReads = announcements.reduce((sum, a) => sum + (a.totalRecipients || 0), 0);
    const overallReadRate = totalPossibleReads > 0 ? ((totalReads / totalPossibleReads) * 100).toFixed(1) : 'N/A';

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <BellRing size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Activity size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📢 Notifications & Announcements</h1>
                                <p className="mt-2 text-lg text-slate-400">Manage and send important updates to your students.</p>
                            </div>
                            <button
                                onClick={handleCreateAnnouncement}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Create New Announcement
                            </button>
                        </div>

                        {/* Analytics Overview */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BarChart size={24} className="mr-3 text-purple-400" /> Analytics Overview (Mock)</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Total Announcements</p>
                                    <p className="text-2xl font-bold text-white">{totalAnnouncements}</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Sent</p>
                                    <p className="text-2xl font-bold text-green-400">{sentAnnouncements}</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Scheduled</p>
                                    <p className="text-2xl font-bold text-yellow-400">{scheduledAnnouncements}</p>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                                    <p className="text-sm text-slate-400">Overall Read Rate</p>
                                    <p className="text-2xl font-bold text-cyan-400">{overallReadRate}%</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Note: Detailed analytics (e.g., per-batch read rates, fastest responding batches) are future enhancements requiring backend integration.</p>
                        </div>

                        {/* Filters */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Filter size={24} className="mr-3 text-cyan-400" /> Filters</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="relative">
                                    <label htmlFor="filterType" className="sr-only">Filter by Type</label>
                                    <select id="filterType" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                        {announcementTypes.map(type => <option key={type} value={type}>{type}</option>)}
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
                                <div className="relative">
                                    <label htmlFor="filterRecipient" className="sr-only">Filter by Recipient Type</label>
                                    <select id="filterRecipient" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterRecipient} onChange={(e) => setFilterRecipient(e.target.value)}>
                                        {recipientOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {(filterRecipient === 'Specific Batch(es)' || filterRecipient === 'All') && (
                                    <div className="relative">
                                        <label htmlFor="filterBatch" className="sr-only">Filter by Batch</label>
                                        <select id="filterBatch" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
                                            <option value="All">All Batches</option>
                                            {mockBatches.map(batch => <option key={batch.id} value={batch.id}>{batch.name}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                )}
                                {(filterRecipient === 'Specific Student(s)' || filterRecipient === 'All') && (
                                    <div className="relative">
                                        <label htmlFor="filterStudent" className="sr-only">Filter by Student</label>
                                        <select id="filterStudent" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            value={filterStudent} onChange={(e) => setFilterStudent(e.target.value)}>
                                            <option value="All">All Students</option>
                                            {mockStudents.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Announcements List */}
                        {filteredAnnouncements.length > 0 ? (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Target Audience</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Sent/Scheduled On</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {filteredAnnouncements.map((announcement, index) => (
                                            <tr key={announcement.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                <td className="px-6 py-4 max-w-xs truncate text-sm font-medium text-white">{announcement.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeTagClasses(announcement.type)}`}>
                                                        {announcement.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs truncate text-sm text-slate-300">{getRecipientNames(announcement)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                    {announcement.status === 'Sent' ? announcement.sentOn : announcement.scheduledDate || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusTagClasses(announcement.status)}`}>
                                                        {announcement.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <button onClick={() => handleEditAnnouncement(announcement)} className="text-blue-400 hover:text-blue-300" title="Edit Announcement"><Edit size={18} /></button>
                                                        {announcement.status === 'Scheduled' && (
                                                            <button onClick={() => handleCancelScheduled(announcement.id)} className="text-yellow-400 hover:text-yellow-300" title="Cancel Scheduled"><Clock size={18} /></button>
                                                        )}
                                                        <button onClick={() => handleDeleteAnnouncement(announcement)} className="text-red-400 hover:text-red-300" title="Delete Announcement"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <BellRing size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                <h2 className="text-2xl font-bold text-white mb-3">No announcements yet.</h2>
                                <p className="text-slate-400 max-w-md mx-auto">All your important updates and notifications will appear here.</p>
                                <button
                                    onClick={handleCreateAnnouncement}
                                    className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                >
                                    <PlusCircle size={20} className="mr-2" /> Create Your First Announcement
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Keep your students informed 📢" />

            <CreateAnnouncementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                announcementData={editingAnnouncement}
                onSave={handleSaveAnnouncement}
            />

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 text-center shadow-xl animate-scale-in max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
                        <p className="text-slate-300 mb-6">Are you sure you want to remove "<span className="font-semibold text-red-400">{announcementToDelete?.title}</span>"?</p>
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

export default AdminNotificationsPage;