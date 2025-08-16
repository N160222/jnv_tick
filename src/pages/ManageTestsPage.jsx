"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, PlusCircle, Edit, Trash2, Eye, Search, Filter, ChevronDown, X, CalendarDays, GraduationCap, Clock } from 'lucide-react';

// Mock Data for Tests
const initialTests = [
    { id: 1, name: "Reasoning - Pattern Recognition", subject: "Reasoning", classGrade: "Class 6", duration: 30, createdOn: "2024-08-01", status: "Active" },
    { id: 2, name: "Maths - Basic Arithmetic", subject: "Maths", classGrade: "Class 6", duration: 40, createdOn: "2024-08-05", status: "Active" },
    { id: 3, name: "Drawing - Figure Completion", subject: "Drawing", classGrade: "Class 6", duration: 25, createdOn: "2024-08-10", status: "Inactive" },
    { id: 4, name: "Language - Story Comprehension", subject: "Language", classGrade: "Class 7", duration: 45, createdOn: "2024-08-12", status: "Active" },
    { id: 5, name: "Reasoning - Series Completion", subject: "Reasoning", classGrade: "Class 7", duration: 35, createdOn: "2024-08-15", status: "Active" },
    { id: 6, name: "Maths - Advanced Algebra", subject: "Maths", classGrade: "Class 8", duration: 50, createdOn: "2024-08-18", status: "Inactive" },
];

// Add/Edit Test Modal Component
const AddEditTestModal = ({ isOpen, onClose, testData, onSave }) => {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        subject: '',
        classGrade: '',
        duration: '',
        createdOn: new Date().toISOString().split('T')[0], // Default to today
        status: 'Active',
    });

    useEffect(() => {
        if (testData) {
            setFormData(testData);
        } else {
            setFormData({
                id: null,
                name: '',
                subject: '',
                classGrade: '',
                duration: '',
                createdOn: new Date().toISOString().split('T')[0],
                status: 'Active',
            });
        }
    }, [testData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{testData ? 'Edit Test' : 'Create New Test'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Test Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="classGrade" className="block text-sm font-medium text-slate-300 mb-2">Class/Grade</label>
                        <input type="text" id="classGrade" name="classGrade" value={formData.classGrade} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">Duration (minutes)</label>
                        <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange}
                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
                        {testData ? 'Save Changes' : 'Create Test'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Delete Confirmation Modal Component (Reused from ManageStudentsPage)
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 text-center shadow-xl animate-scale-in max-w-sm w-full">
                <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
                <p className="text-slate-300 mb-6">Are you sure you want to remove <span className="font-semibold text-red-400">{itemName}</span>?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                    >
                        Yes, Remove
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const ManageTestsPage = () => {
    const [tests, setTests] = useState(initialTests);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('All');
    const [filterClass, setFilterClass] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isDesktop, setIsDesktop] = useState(false);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);

    const subjects = ["All", ...new Set(initialTests.map(test => test.subject))];
    const classes = ["All", ...new Set(initialTests.map(test => test.classGrade))];
    const statuses = ["All", "Active", "Inactive"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredTests = tests.filter(test => {
        const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              test.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject === 'All' || test.subject === filterSubject;
        const matchesClass = filterClass === 'All' || test.classGrade === filterClass;
        const matchesStatus = filterStatus === 'All' || test.status === filterStatus;
        return matchesSearch && matchesSubject && matchesClass && matchesStatus;
    });

    const handleCreateTest = () => {
        setEditingTest(null);
        setIsAddEditModalOpen(true);
    };

    const handleEditTest = (test) => {
        setEditingTest(test);
        setIsAddEditModalOpen(true);
    };

    const handleSaveTest = (newTestData) => {
        if (newTestData.id) {
            // Edit existing test
            setTests(prev => prev.map(t => t.id === newTestData.id ? newTestData : t));
        } else {
            // Add new test
            const newId = Math.max(...tests.map(t => t.id), 0) + 1; // Generate new ID
            setTests(prev => [...prev, { ...newTestData, id: newId }]);
        }
    };

    const handleDeleteTest = (test) => {
        setTestToDelete(test);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setTests(prev => prev.filter(t => t.id !== testToDelete.id));
        setShowDeleteConfirm(false);
        setTestToDelete(null);
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <BookOpen size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <GraduationCap size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📘 Manage Tests</h1>
                                <p className="mt-2 text-lg text-slate-400">Create and organize tests for students with ease.</p>
                            </div>
                            <button
                                onClick={handleCreateTest}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Create New Test
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or subject..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
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
                                    value={filterClass}
                                    onChange={(e) => setFilterClass(e.target.value)}
                                >
                                    {classes.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    className="appearance-none w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-8 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        {/* Test List Table (Desktop) / Card View (Mobile) */}
                        {isDesktop ? (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Test Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Class/Grade</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Created On</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {filteredTests.length > 0 ? (
                                            filteredTests.map((test, index) => (
                                                <tr key={test.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{test.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.classGrade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.duration} min</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{test.createdOn}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${test.status === 'Active' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                            {test.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                        <div className="flex items-center justify-center space-x-3">
                                                            <button onClick={() => handleEditTest(test)} className="text-blue-400 hover:text-blue-300" title="Edit Test"><Edit size={18} /></button>
                                                            <button onClick={() => handleDeleteTest(test)} className="text-red-400 hover:text-red-300" title="Delete Test"><Trash2 size={18} /></button>
                                                            <Link to={`/admin/manage-questions/${test.id}`} className="text-yellow-400 hover:text-yellow-300" title="View Questions"><BookOpen size={18} /></Link>
                                                            <Link to={`/admin/test-preview/${test.id}`} className="text-purple-400 hover:text-purple-300" title="Preview Test"><Eye size={18} /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-slate-400">No tests found matching your criteria.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                {filteredTests.length > 0 ? (
                                    filteredTests.map((test, index) => (
                                        <div key={test.id} className="glass-effect rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg" style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className="flex items-center mb-3">
                                                <BookOpen size={24} className="text-cyan-400 mr-4" />
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{test.name}</h3>
                                                    <p className="text-slate-400 text-sm">{test.subject} - {test.classGrade}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 mb-4">
                                                <div className="flex items-center"><Clock size={16} className="mr-2 text-slate-500" /> {test.duration} min</div>
                                                <div className="flex items-center"><CalendarDays size={16} className="mr-2 text-slate-500" /> {test.createdOn}</div>
                                                <div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${test.status === 'Active' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                        {test.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-3 border-t border-slate-800 pt-3">
                                                <button onClick={() => handleEditTest(test)} className="text-blue-400 hover:text-blue-300" title="Edit Test"><Edit size={20} /></button>
                                                <button onClick={() => handleDeleteTest(test)} className="text-red-400 hover:text-red-300" title="Delete Test"><Trash2 size={20} /></button>
                                                <Link to={`/admin/manage-questions/${test.id}`} className="text-yellow-400 hover:text-yellow-300" title="View Questions"><BookOpen size={20} /></Link>
                                                <Link to={`/admin/test-preview/${test.id}`} className="text-purple-400 hover:text-purple-300" title="Preview Test"><Eye size={20} /></Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-400 py-10">
                                        No tests found matching your criteria. Try adjusting your search or filters.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pagination (Mocked) */}
                        {filteredTests.length > 5 && (
                            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                    Load More Tests
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Manage your tests with precision 📚" />

            <AddEditTestModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                testData={editingTest}
                onSave={handleSaveTest}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                itemName={testToDelete?.name}
            />
        </div>
    );
};

export default ManageTestsPage;