"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlusCircle, Edit, Trash2, BookOpen, SlidersHorizontal, CalendarDays, Brain, ClipboardPen, ArrowLeft, X, LayoutDashboard } from 'lucide-react';

// Mock Data for Templates
const initialTemplates = [
    { id: 1, name: "Reasoning - 20Q - Medium", subjects: ["Reasoning"], difficulty: "Medium", numQuestions: 20, duration: 30, dateCreated: "2024-08-20" },
    { id: 2, name: "Maths & Language - 30Q - Easy", subjects: ["Mathematics", "Language"], difficulty: "Easy", numQuestions: 30, duration: 45, dateCreated: "2024-08-18" },
    { id: 3, name: "Drawing - 15Q - Hard", subjects: ["Drawing"], difficulty: "Hard", numQuestions: 15, duration: 25, dateCreated: "2024-08-15" },
];

// Add/Edit Template Modal Component
const AddEditTemplateModal = ({ isOpen, onClose, templateData, onSave }) => {
    const allSubjects = ["Reasoning", "Mathematics", "Language", "Drawing"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        subjects: [],
        difficulty: 'Medium',
        numQuestions: 20,
        duration: 30,
        dateCreated: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (templateData) {
            setFormData(templateData);
        } else {
            setFormData({
                id: null,
                name: '',
                subjects: [],
                difficulty: 'Medium',
                numQuestions: 20,
                duration: 30,
                dateCreated: new Date().toISOString().split('T')[0],
            });
        }
    }, [templateData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (subject) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.subjects.length === 0) {
            alert("Please select at least one subject.");
            return;
        }
        if (formData.numQuestions < 5 || formData.numQuestions > 50) {
            alert("Number of questions must be between 5 and 50.");
            return;
        }
        if (formData.duration < 10 || formData.duration > 120) {
            alert("Test duration must be between 10 and 120 minutes.");
            return;
        }
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
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{templateData ? 'Edit Template' : 'Create New Template'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Template Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Subjects</label>
                        <div className="flex flex-wrap gap-2">
                            {allSubjects.map(subject => (
                                <button
                                    key={subject}
                                    type="button"
                                    onClick={() => handleSubjectChange(subject)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                                        ${formData.subjects.includes(subject)
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 shadow-md'
                                            : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500'
                                        }`}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                        <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}
                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                            {difficulties.map(diff => (
                                <option key={diff} value={diff}>{diff}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-300 mb-2">Number of Questions (5-50)</label>
                        <input type="number" id="numQuestions" name="numQuestions" value={formData.numQuestions} onChange={handleChange}
                            min="5" max="50"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">Test Duration (minutes)</label>
                        <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}
                            min="10" max="120"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
                        {templateData ? 'Save Changes' : 'Create Template'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Delete Confirmation Modal Component
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

const AITestTemplatesPage = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState(initialTemplates);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCreateTemplate = () => {
        setEditingTemplate(null);
        setIsAddEditModalOpen(true);
    };

    const handleEditTemplate = (template) => {
        setEditingTemplate(template);
        setIsAddEditModalOpen(true);
    };

    const handleSaveTemplate = (newTemplateData) => {
        if (newTemplateData.id) {
            // Edit existing template
            setTemplates(prev => prev.map(t => t.id === newTemplateData.id ? newTemplateData : t));
        } else {
            // Add new template
            const newId = Math.max(...templates.map(t => t.id), 0) + 1; // Generate new ID
            setTemplates(prev => [...prev, { ...newTemplateData, id: newId }]);
        }
    };

    const handleDeleteTemplate = (template) => {
        setTemplateToDelete(template);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
        setShowDeleteConfirm(false);
        setTemplateToDelete(null);
    };

    const handleUseTemplate = (template) => {
        navigate('/admin/ai-test-generation', { state: { templateData: template } });
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
                        <ClipboardPen size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📝 AI Test Templates</h1>
                                <p className="mt-2 text-lg text-slate-400">Create and manage reusable test structures for AI generation.</p>
                            </div>
                            <button
                                onClick={handleCreateTemplate}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Create New Template
                            </button>
                        </div>

                        {/* Template List Grid */}
                        {templates.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                {templates.map((template, index) => (
                                    <div key={template.id} className="glass-effect rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-900/30" style={{ animationDelay: `${index * 50}ms` }}>
                                        <h3 className="text-xl font-bold text-white mb-3">{template.name}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4 text-sm">
                                            <span className="px-3 py-1 bg-blue-600/30 text-blue-200 border border-blue-500/50 rounded-full">
                                                {template.subjects.join(', ')}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-600/30 text-purple-200 border border-purple-500/50 rounded-full">
                                                {template.difficulty}
                                            </span>
                                        </div>
                                        <div className="text-slate-400 text-sm space-y-1 flex-grow">
                                            <p className="flex items-center"><BookOpen size={16} className="mr-2" /> {template.numQuestions} Questions</p>
                                            <p className="flex items-center"><SlidersHorizontal size={16} className="mr-2" /> {template.duration} Minutes</p>
                                            <p className="flex items-center"><CalendarDays size={16} className="mr-2" /> Created: {template.dateCreated}</p>
                                        </div>
                                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={() => handleUseTemplate(template)}
                                                className="flex-grow px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105"
                                            >
                                                Use Template
                                            </button>
                                            <button
                                                onClick={() => handleEditTemplate(template)}
                                                className="px-4 py-2 border border-blue-600 text-blue-400 font-semibold rounded-lg hover:bg-blue-900/30 transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTemplate(template)}
                                                className="px-4 py-2 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <Brain size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                <h2 className="text-2xl font-bold text-white mb-3">No AI templates yet.</h2>
                                <p className="text-slate-400 max-w-md mx-auto">Create one to save time when generating tests and ensure consistency across your mock exams.</p>
                                <button
                                    onClick={handleCreateTemplate}
                                    className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                >
                                    <PlusCircle size={20} className="mr-2" /> Create Your First Template
                                </button>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/admin/ai-test-generation"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Back to AI Test Generation
                            </Link>
                            <Link
                                to="/admin-dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 border border-purple-600 text-purple-300 font-semibold rounded-lg hover:bg-purple-900/30 hover:text-white transition-colors duration-200 flex items-center justify-center"
                            >
                                <LayoutDashboard size={20} className="mr-2" /> Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Streamline your test creation 🚀" />

            <AddEditTemplateModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                templateData={editingTemplate}
                onSave={handleSaveTemplate}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                itemName={templateToDelete?.name}
            />
        </div>
    );
};

export default AITestTemplatesPage;