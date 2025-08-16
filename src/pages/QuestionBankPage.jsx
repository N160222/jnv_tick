"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlusCircle, Edit, Trash2, Eye, Search, Filter, ChevronDown, X, BookOpen, ClipboardList, Download, ListChecks, CheckCircle, Circle, SquarePen, Brain } from 'lucide-react';

// Mock Data for Questions
const initialQuestions = [
    { id: 1, text: "What is the capital of India?", subject: "General Knowledge", difficulty: "Easy", type: "MCQ", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correctAnswer: "Delhi", marks: 1, origin: "Manual" },
    { id: 2, text: "True or False: The square root of 144 is 12.", subject: "Mathematics", difficulty: "Easy", type: "True-False", options: ["True", "False"], correctAnswer: "True", marks: 1, origin: "AI" },
    { id: 3, text: "Explain the concept of 'Prime Numbers' in your own words.", subject: "Mathematics", difficulty: "Medium", type: "Short Answer", correctAnswer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.", marks: 3, origin: "Manual" },
    { id: 4, text: "Identify the missing figure in the sequence: Circle, Square, Triangle, ...", subject: "Reasoning", difficulty: "Medium", type: "Drawing", marks: 2, origin: "AI" },
    { id: 5, text: "Which of these is a synonym for 'happy'?", subject: "Language", difficulty: "Easy", type: "MCQ", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: "Joyful", marks: 1, origin: "Manual" },
    { id: 6, text: "What is 7 multiplied by 8?", subject: "Mathematics", difficulty: "Easy", type: "MCQ", options: ["49", "56", "64", "72"], correctAnswer: "56", marks: 1, origin: "Manual" },
    { id: 7, text: "True or False: Water boils at 100 degrees Celsius at sea level.", subject: "Science", difficulty: "Medium", type: "True-False", options: ["True", "False"], correctAnswer: "True", marks: 1, origin: "AI" },
    { id: 8, text: "Describe the main function of the heart.", subject: "Science", difficulty: "Medium", type: "Short Answer", correctAnswer: "The heart's main function is to pump blood throughout the body, delivering oxygen and nutrients to cells and removing waste products.", marks: 3, origin: "Manual" },
    { id: 9, text: "If a dozen eggs cost $3, how much do 4 eggs cost?", subject: "Mathematics", difficulty: "Hard", type: "MCQ", options: ["$1", "$1.50", "$2", "$0.75"], correctAnswer: "$1", marks: 2, origin: "AI" },
    { id: 10, text: "Complete the pattern: (Pattern 1), (Pattern 2), (Pattern 3), ...", subject: "Reasoning", difficulty: "Hard", type: "Drawing", marks: 2, origin: "Manual" },
];

// Add/Edit Question Modal Component (adapted for Question Bank)
const AddEditQuestionModal = ({ isOpen, onClose, questionData, onSave }) => {
    const questionTypes = ["MCQ", "True-False", "Short Answer", "Drawing"];
    const subjects = ["General Knowledge", "Mathematics", "Reasoning", "Language", "Science"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const [formData, setFormData] = useState({
        id: null,
        text: '',
        subject: '',
        difficulty: 'Medium',
        type: 'MCQ',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 1,
        origin: 'Manual', // Default to manual for new questions
    });

    useEffect(() => {
        if (questionData) {
            setFormData({
                ...questionData,
                options: questionData.options && questionData.options.length < 2 ? [...questionData.options, '', ''] : questionData.options || ['', '', '', ''],
            });
        } else {
            setFormData({
                id: null,
                text: '',
                subject: '',
                difficulty: 'Medium',
                type: 'MCQ',
                options: ['', '', '', ''],
                correctAnswer: '',
                marks: 1,
                origin: 'Manual',
            });
        }
    }, [questionData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData(prev => ({ ...prev, options: newOptions }));
    };

    const handleAddOption = () => {
        if (formData.options.length < 6) {
            setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
        }
    };

    const handleRemoveOption = (index) => {
        if (formData.options.length > 2) {
            const newOptions = formData.options.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                options: newOptions,
                correctAnswer: newOptions.includes(prev.correctAnswer) ? prev.correctAnswer : '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.text.trim()) {
            alert("Question text cannot be empty.");
            return;
        }
        if (!formData.subject) {
            alert("Please select a subject.");
            return;
        }

        if (formData.type === 'MCQ' || formData.type === 'True-False') {
            const validOptions = formData.options.filter(opt => opt.trim() !== '');
            if (validOptions.length < 2) {
                alert("Please provide at least two options.");
                return;
            }
            if (!formData.correctAnswer || !validOptions.includes(formData.correctAnswer)) {
                alert("Please select a valid correct answer from the provided options.");
                return;
            }
        }
        
        if (formData.marks < 1) {
            alert("Marks for the question must be at least 1.");
            return;
        }

        onSave({
            ...formData,
            options: (formData.type === 'MCQ' || formData.type === 'True-False') ? formData.options.filter(opt => opt.trim() !== '') : [], // Only save options for MCQ/True-False
            id: formData.id || Date.now(),
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{questionData ? 'Edit Question' : 'Add New Question'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="questionText" className="block text-sm font-medium text-slate-300 mb-2">Question Text</label>
                        <textarea id="questionText" name="text" value={formData.text} onChange={handleChange}
                            rows="3"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                            <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
                                className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required>
                                <option value="">Select Subject</option>
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                        </div>
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                            <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}
                                className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                                {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-2">Question Type</label>
                        <select id="type" name="type" value={formData.type} onChange={handleChange}
                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                            {questionTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                    </div>

                    {(formData.type === 'MCQ' || formData.type === 'True-False') && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Options (Select Correct Answer)</label>
                            <div className="space-y-3">
                                {formData.options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            value={option}
                                            checked={formData.correctAnswer === option}
                                            onChange={() => setFormData(prev => ({ ...prev, correctAnswer: option }))}
                                            className="form-radio h-5 w-5 text-green-500 bg-slate-800 border-slate-700 focus:ring-green-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="flex-grow bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            required={index < 2}
                                            disabled={formData.type === 'True-False' && (option === 'True' || option === 'False')}
                                        />
                                        {formData.options.length > 2 && formData.type === 'MCQ' && (
                                            <button type="button" onClick={() => handleRemoveOption(index)} className="text-red-400 hover:text-red-300">
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {formData.options.length < 6 && formData.type === 'MCQ' && (
                                <button type="button" onClick={handleAddOption} className="mt-4 px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center">
                                    <PlusCircle size={18} className="mr-2" /> Add Option
                                </button>
                            )}
                        </div>
                    )}

                    {formData.type === 'Short Answer' && (
                        <div>
                            <label htmlFor="correctAnswer" className="block text-sm font-medium text-slate-300 mb-2">Expected Answer</label>
                            <textarea id="correctAnswer" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange}
                                rows="3"
                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" placeholder="Enter the expected correct answer." required />
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="marks" className="block text-sm font-medium text-slate-300 mb-2">Marks for this Question</label>
                        <input type="number" id="marks" name="marks" value={formData.marks} onChange={handleChange}
                            min="1"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
                        {questionData ? 'Save Changes' : 'Add Question'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Preview Question Modal Component
const PreviewQuestionModal = ({ isOpen, onClose, question }) => {
    if (!isOpen || !question) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Question Preview</h3>
                <div className="mb-6 text-center">
                    <span className="px-3 py-1 text-sm bg-blue-600/30 text-blue-200 border border-blue-500/50 rounded-full mr-2">{question.subject}</span>
                    <span className="px-3 py-1 text-sm bg-purple-600/30 text-purple-200 border border-purple-500/50 rounded-full mr-2">{question.difficulty}</span>
                    <span className="px-3 py-1 text-sm bg-green-600/30 text-green-200 border border-green-500/50 rounded-full">{question.type}</span>
                </div>

                <div className="mb-8">
                    <p className="text-xl text-slate-300 leading-relaxed mb-4">{question.text}</p>
                    {(question.type === 'MCQ' || question.type === 'True-False') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {question.options.map((option, index) => (
                                <div key={index} className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                                    ${question.correctAnswer === option
                                        ? 'bg-green-600/50 border-green-500 text-white'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-300'
                                    }`}
                                >
                                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'Short Answer' && (
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-slate-300">
                            <p className="font-medium">Expected Answer:</p>
                            <p className="mt-2">{question.correctAnswer}</p>
                        </div>
                    )}
                    {question.type === 'Drawing' && (
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400 h-48 flex items-center justify-center">
                            <p>Drawing/Diagram question (visual content not available in mock)</p>
                        </div>
                    )}
                    <p className="text-slate-400 text-sm mt-4 text-right">Marks: {question.marks}</p>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
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


const QuestionBankPage = () => {
    const [questions, setQuestions] = useState(initialQuestions);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('All');
    const [filterDifficulty, setFilterDifficulty] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [filterOrigin, setFilterOrigin] = useState('All'); // 'All', 'AI', 'Manual'
    const [isDesktop, setIsDesktop] = useState(false);

    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewingQuestion, setPreviewingQuestion] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const subjects = ["All", ...new Set(initialQuestions.map(q => q.subject))];
    const difficulties = ["All", "Easy", "Medium", "Hard"];
    const questionTypes = ["All", ...new Set(initialQuestions.map(q => q.type))];
    const origins = ["All", "AI", "Manual"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredQuestions = questions.filter(question => {
        const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject === 'All' || question.subject === filterSubject;
        const matchesDifficulty = filterDifficulty === 'All' || question.difficulty === filterDifficulty;
        const matchesType = filterType === 'All' || question.type === filterType;
        const matchesOrigin = filterOrigin === 'All' || question.origin === filterOrigin;
        return matchesSearch && matchesSubject && matchesDifficulty && matchesType && matchesOrigin;
    });

    const handleAddQuestion = () => {
        setEditingQuestion(null);
        setIsAddEditModalOpen(true);
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setIsAddEditModalOpen(true);
    };

    const handleSaveQuestion = (newQuestionData) => {
        if (newQuestionData.id && questions.some(q => q.id === newQuestionData.id)) {
            setQuestions(prev => prev.map(q => q.id === newQuestionData.id ? newQuestionData : q));
        } else {
            setQuestions(prev => [...prev, newQuestionData]);
        }
    };

    const handleDeleteQuestion = (question) => {
        setQuestionToDelete(question);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
        setShowDeleteConfirm(false);
        setQuestionToDelete(null);
        setSelectedQuestions(prev => prev.filter(id => id !== questionToDelete.id)); // Deselect if deleted
    };

    const handlePreviewQuestion = (question) => {
        setPreviewingQuestion(question);
        setShowPreviewModal(true);
    };

    const handleCheckboxChange = (questionId) => {
        setSelectedQuestions(prev =>
            prev.includes(questionId)
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedQuestions(filteredQuestions.map(q => q.id));
        } else {
            setSelectedQuestions([]);
        }
    };

    const handleExportSelected = () => {
        if (selectedQuestions.length === 0) {
            alert("Please select questions to export.");
            return;
        }
        const selectedData = questions.filter(q => selectedQuestions.includes(q.id));
        console.log("Exporting selected questions:", selectedData);
        alert(`Exporting ${selectedQuestions.length} questions to CSV/Excel (mock).`);
    };

    const handleAddToNewTest = () => {
        if (selectedQuestions.length === 0) {
            alert("Please select questions to add to a new test.");
            return;
        }
        const selectedData = questions.filter(q => selectedQuestions.includes(q.id));
        console.log("Adding selected questions to new test:", selectedData);
        alert(`Adding ${selectedQuestions.length} questions to a new test (mock).`);
        // In a real app, this would navigate to a test creation page with pre-filled questions
    };

    const handleDeleteSelected = () => {
        if (selectedQuestions.length === 0) {
            alert("Please select questions to delete.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${selectedQuestions.length} selected questions?`)) {
            setQuestions(prev => prev.filter(q => !selectedQuestions.includes(q.id)));
            setSelectedQuestions([]);
            alert("Selected questions deleted successfully!");
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
                        <BookOpen size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <ClipboardList size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">📚 Question Bank</h1>
                                <p className="mt-2 text-lg text-slate-400">Centralized repository of all your test questions.</p>
                            </div>
                            <button
                                onClick={handleAddQuestion}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Add New Question
                            </button>
                        </div>

                        {/* Filters & Search */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center"><Filter size={24} className="mr-3 text-purple-400" /> Filters & Search</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="relative lg:col-span-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by question text..."
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="filterSubject" className="sr-only">Filter by Subject</label>
                                    <select id="filterSubject" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                                        {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="filterDifficulty" className="sr-only">Filter by Difficulty</label>
                                    <select id="filterDifficulty" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                                        {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="filterType" className="sr-only">Filter by Type</label>
                                    <select id="filterType" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                        {questionTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="filterOrigin" className="sr-only">Filter by Origin</label>
                                    <select id="filterOrigin" className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value)}>
                                        {origins.map(origin => <option key={origin} value={origin}>{origin}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        {selectedQuestions.length > 0 && (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                <span className="text-lg font-bold text-white">{selectedQuestions.length} questions selected</span>
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={handleExportSelected} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                                        <Download size={20} className="mr-2" /> Export Selected
                                    </button>
                                    <button onClick={handleAddToNewTest} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center">
                                        <PlusCircle size={20} className="mr-2" /> Add to New Test
                                    </button>
                                    <button onClick={handleDeleteSelected} className="px-6 py-3 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors flex items-center">
                                        <Trash2 size={20} className="mr-2" /> Delete Selected
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Question List Table */}
                        {filteredQuestions.length > 0 ? (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                <input type="checkbox" className="form-checkbox h-4 w-4 text-cyan-500 rounded border-slate-700 bg-slate-900"
                                                    onChange={handleSelectAll}
                                                    checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                                                    disabled={filteredQuestions.length === 0}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Question</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Difficulty</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Marks</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Origin</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {filteredQuestions.map((question, index) => (
                                            <tr key={question.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-cyan-500 rounded border-slate-700 bg-slate-900"
                                                        checked={selectedQuestions.includes(question.id)}
                                                        onChange={() => handleCheckboxChange(question.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 max-w-xs truncate text-sm font-medium text-white">{question.text}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{question.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{question.difficulty}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{question.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{question.marks}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${question.origin === 'AI' ? 'bg-blue-600/30 text-blue-200' : 'bg-purple-600/30 text-purple-200'}`}>
                                                        {question.origin}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <button onClick={() => handlePreviewQuestion(question)} className="text-cyan-400 hover:text-cyan-300" title="Preview Question"><Eye size={18} /></button>
                                                        <button onClick={() => handleEditQuestion(question)} className="text-blue-400 hover:text-blue-300" title="Edit Question"><Edit size={18} /></button>
                                                        <button onClick={() => handleDeleteQuestion(question)} className="text-red-400 hover:text-red-300" title="Delete Question"><Trash2 size={18} /></button>
                                                        <button onClick={() => alert(`Adding '${question.text}' to test (mock)`)} className="text-green-400 hover:text-green-300" title="Add to Test"><PlusCircle size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <ListChecks size={64} className="text-cyan-400 mx-auto mb-6 animate-pulse-slow" />
                                <h2 className="text-2xl font-bold text-white mb-3">No questions added yet.</h2>
                                <p className="text-slate-400 max-w-md mx-auto">Start building your question bank by adding new questions or generating them with AI.</p>
                                <button
                                    onClick={handleAddQuestion}
                                    className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                >
                                    <PlusCircle size={20} className="mr-2" /> Add Your First Question
                                </button>
                            </div>
                        )}

                        {/* Pagination (Mocked) */}
                        {filteredQuestions.length > 10 && (
                            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                    Load More Questions
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Build your ultimate question bank 🧠" />

            <AddEditQuestionModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                questionData={editingQuestion}
                onSave={handleSaveQuestion}
            />

            <PreviewQuestionModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                question={previewingQuestion}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                itemName={questionToDelete?.text}
            />
        </div>
    );
};

export default QuestionBankPage;