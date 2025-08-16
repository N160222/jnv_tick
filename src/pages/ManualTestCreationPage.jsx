"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlusCircle, Edit, Trash2, BookOpen, SlidersHorizontal, CalendarDays, Brain, ClipboardPen, ArrowLeft, X, LayoutDashboard, CheckCircle, Circle, SquarePen, ListChecks, Save, Upload, Eye } from 'lucide-react';

// Add/Edit Question Modal Component
const AddEditQuestionModal = ({ isOpen, onClose, questionData, onSave }) => {
    const [formData, setFormData] = useState({
        id: null,
        text: '',
        options: ['', '', '', ''], // Start with 4 options
        correctAnswer: '',
        marks: 1,
    });

    useEffect(() => {
        if (questionData) {
            setFormData({
                ...questionData,
                options: questionData.options.length < 2 ? [...questionData.options, '', ''] : questionData.options, // Ensure at least 2 options
            });
        } else {
            setFormData({
                id: null,
                text: '',
                options: ['', '', '', ''],
                correctAnswer: '',
                marks: 1,
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
                correctAnswer: newOptions.includes(prev.correctAnswer) ? prev.correctAnswer : '', // Clear if correct answer removed
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.text.trim()) {
            alert("Question text cannot be empty.");
            return;
        }
        const validOptions = formData.options.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
            alert("Please provide at least two options.");
            return;
        }
        if (!formData.correctAnswer || !validOptions.includes(formData.correctAnswer)) {
            alert("Please select a valid correct answer from the provided options.");
            return;
        }
        if (formData.marks < 1) {
            alert("Marks for the question must be at least 1.");
            return;
        }

        onSave({
            ...formData,
            options: validOptions, // Save only non-empty options
            id: formData.id || Date.now(), // Assign new ID if not editing
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
                                        required={index < 2} // Require first two options
                                    />
                                    {formData.options.length > 2 && (
                                        <button type="button" onClick={() => handleRemoveOption(index)} className="text-red-400 hover:text-red-300">
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {formData.options.length < 6 && (
                            <button type="button" onClick={handleAddOption} className="mt-4 px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center">
                                <PlusCircle size={18} className="mr-2" /> Add Option
                            </button>
                        )}
                    </div>
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

// Preview Test Modal Component
const PreviewTestModal = ({ isOpen, onClose, testDetails, questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    if (!isOpen || !testDetails || questions.length === 0) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-3xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Test Preview: {testDetails.name}</h3>
                <p className="text-slate-400 text-center mb-6">Subject: {testDetails.subject} | Difficulty: {testDetails.difficulty} | Duration: {testDetails.duration} min</p>

                <div className="mb-8">
                    <p className="text-xl text-slate-300 leading-relaxed mb-4">Q{currentQuestionIndex + 1}. {currentQuestion.text}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                                ${currentQuestion.correctAnswer === option
                                    ? 'bg-green-600/50 border-green-500 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-300'
                                }`}
                            >
                                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-400 text-sm mt-4 text-right">Marks: {currentQuestion.marks}</p>
                </div>

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-700">
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-slate-300">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};


const ManualTestCreationPage = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);
    const [testDetails, setTestDetails] = useState({
        name: '',
        subject: '',
        difficulty: 'Medium',
        duration: 60,
        totalMarks: 0,
    });
    const [questions, setQuestions] = useState([]);
    const [isAddEditQuestionModalOpen, setIsAddEditQuestionModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const subjects = ["Mathematics", "Reasoning", "Language", "Drawing", "Science", "General Knowledge"];
    const difficulties = ["Easy", "Medium", "Hard"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Recalculate total marks whenever questions change
        const newTotalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
        setTestDetails(prev => ({ ...prev, totalMarks: newTotalMarks }));
    }, [questions]);

    const handleTestDetailsChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleAddQuestion = () => {
        setEditingQuestion(null);
        setIsAddEditQuestionModalOpen(true);
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setIsAddEditQuestionModalOpen(true);
    };

    const handleSaveQuestion = (newQuestionData) => {
        if (newQuestionData.id && questions.some(q => q.id === newQuestionData.id)) {
            // Edit existing question
            setQuestions(prev => prev.map(q => q.id === newQuestionData.id ? newQuestionData : q));
        } else {
            // Add new question
            setQuestions(prev => [...prev, newQuestionData]);
        }
    };

    const handleDeleteQuestion = (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setQuestions(prev => prev.filter(q => q.id !== id));
        }
    };

    const handlePreviewTest = () => {
        if (questions.length === 0) {
            alert("Please add at least one question to preview the test.");
            return;
        }
        setShowPreviewModal(true);
    };

    const handleSaveDraft = () => {
        if (!testDetails.name.trim()) {
            alert("Test Name is required to save as draft.");
            return;
        }
        console.log("Saving test as draft:", { testDetails, questions });
        alert("✅ Test saved as draft!");
        // In a real app, send data to backend
    };

    const handlePublishTest = () => {
        if (!testDetails.name.trim() || !testDetails.subject.trim() || questions.length === 0) {
            alert("Please fill in all test details and add at least one question before publishing.");
            return;
        }
        if (window.confirm("Are you sure you want to publish this test? It will be available to students.")) {
            console.log("Publishing test:", { testDetails, questions });
            alert("✅ Test published successfully!");
            // In a real app, send data to backend and navigate
            navigate('/admin/manage-tests');
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            navigate('/admin/manage-tests');
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
                        <ClipboardPen size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <BookOpen size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">✍️ Manual Test Creation</h1>
                                <p className="mt-2 text-lg text-slate-400">Design and build custom tests question by question.</p>
                            </div>
                            <button
                                onClick={handleAddQuestion}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Add New Question
                            </button>
                        </div>

                        {/* Test Details Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><BookOpen size={24} className="mr-3 text-purple-400" /> Test Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="testName" className="block text-sm font-medium text-slate-300 mb-2">Test Name</label>
                                    <input type="text" id="testName" name="name" value={testDetails.name} onChange={handleTestDetailsChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                    <select id="subject" name="subject" value={testDetails.subject} onChange={handleTestDetailsChange}
                                        className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                                        <option value="">Select Subject</option>
                                        {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </select>
                                    <SlidersHorizontal className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div>
                                    <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                                    <select id="difficulty" name="difficulty" value={testDetails.difficulty} onChange={handleTestDetailsChange}
                                        className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                                        {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
                                    </select>
                                    <SlidersHorizontal className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">Duration (minutes)</label>
                                    <input type="number" id="duration" name="duration" value={testDetails.duration} onChange={handleTestDetailsChange}
                                        min="10"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="totalMarks" className="block text-sm font-medium text-slate-300 mb-2">Total Marks</label>
                                    <input type="number" id="totalMarks" name="totalMarks" value={testDetails.totalMarks} readOnly
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white cursor-not-allowed" />
                                    <p className="text-xs text-slate-500 mt-1">Calculated automatically from question marks.</p>
                                </div>
                            </div>
                        </div>

                        {/* Questions Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><ListChecks size={24} className="mr-3 text-green-400" /> Questions ({questions.length})</h2>
                            {questions.length === 0 ? (
                                <div className="text-center text-slate-400 py-10">
                                    <SquarePen size={64} className="mx-auto mb-4 text-slate-600" />
                                    <p className="text-lg">Start by adding your first question to build the test.</p>
                                    <button
                                        onClick={handleAddQuestion}
                                        className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                                    >
                                        <PlusCircle size={20} className="mr-2" /> Add First Question
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {questions.map((q, index) => (
                                        <div key={q.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 transition-all duration-300 hover:border-cyan-500/50">
                                            <div className="flex justify-between items-start mb-3">
                                                <p className="text-lg font-semibold text-white">Q{index + 1}. {q.text}</p>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleEditQuestion(q)} className="text-blue-400 hover:text-blue-300" title="Edit Question"><Edit size={20} /></button>
                                                    <button onClick={() => handleDeleteQuestion(q.id)} className="text-red-400 hover:text-red-300" title="Delete Question"><Trash2 size={20} /></button>
                                                </div>
                                            </div>
                                            <ul className="list-none space-y-2 text-slate-300 text-sm">
                                                {q.options.map((option, optIndex) => (
                                                    <li key={optIndex} className="flex items-center">
                                                        {q.correctAnswer === option ? (
                                                            <CheckCircle size={16} className="text-green-400 mr-2" />
                                                        ) : (
                                                            <Circle size={16} className="text-slate-500 mr-2" />
                                                        )}
                                                        {String.fromCharCode(65 + optIndex)}. {option}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-slate-400 text-sm mt-3 text-right">Marks: <span className="font-semibold text-white">{q.marks}</span></p>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddQuestion}
                                        className="w-full px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center mt-6"
                                    >
                                        <PlusCircle size={20} className="mr-2" /> Add Another Question
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <button
                                onClick={handlePreviewTest}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Eye size={20} className="mr-2" /> Preview Test
                            </button>
                            <button
                                onClick={handleSaveDraft}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Save size={20} className="mr-2" /> Save as Draft
                            </button>
                            <button
                                onClick={handlePublishTest}
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-green-500 to-lime-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <Upload size={20} className="mr-2" /> Publish Test
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full sm:w-auto text-center px-8 py-3 border border-red-600 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-colors duration-200 flex items-center justify-center"
                            >
                                <X size={20} className="mr-2" /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Crafting tests, shaping futures 📚" />

            <AddEditQuestionModal
                isOpen={isAddEditQuestionModalOpen}
                onClose={() => setIsAddEditQuestionModalOpen(false)}
                questionData={editingQuestion}
                onSave={handleSaveQuestion}
            />

            <PreviewTestModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                testDetails={testDetails}
                questions={questions}
            />
        </div>
    );
};

export default ManualTestCreationPage;