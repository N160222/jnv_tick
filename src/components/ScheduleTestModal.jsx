"use client";

import React, { useState, useEffect } from 'react';
import { X, CalendarDays, Clock, Users, Layers, User, Check, Minus, Settings, Bell, Save, BookOpen, Brain, ClipboardList, SquarePen, ChevronDown, Loader } from 'lucide-react';

// Mock Data for test sources
const mockAITests = [
    { id: 'ai-1', name: "AI Generated Test #1" },
    { id: 'ai-2', name: "AI Generated Test #2" },
];
const mockQuestionBankTests = [
    { id: 'qb-1', name: "Question Bank Test #1" },
    { id: 'qb-2', name: "Question Bank Test #2" },
];
const mockTemplates = [
    { id: 'temp-1', name: "Template Test #1" },
    { id: 'temp-2', name: "Template Test #2" },
];
const mockManualTests = [
    { id: 'man-1', name: "Manual Test #1" },
    { id: 'man-2', name: "Manual Test #2" },
];


const ScheduleTestModal = ({ isOpen, onClose, testData, onSave, mockBatches, mockStudents }) => {
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        source: 'AI Generated', // Default source
        testId: '', // ID of the selected test from source
        dateTime: '',
        duration: 60, // in minutes
        recipients: 'All Students',
        selectedBatches: [],
        selectedStudents: [],
        negativeMarking: false,
        autoSubmit: true,
        allowRetake: false,
        autoNotify: true,
        status: 'Draft', // Default status for new tests
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For simulating loading test data

    const testSources = ["AI Generated", "Question Bank", "Template", "Manual"];

    useEffect(() => {
        if (testData) {
            setFormData({
                ...testData,
                selectedBatches: testData.selectedBatches || [],
                selectedStudents: testData.selectedStudents || [],
            });
        } else {
            // Set default date/time for new test
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone
            const defaultDateTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM

            setFormData({
                id: null,
                title: '',
                description: '',
                source: 'AI Generated',
                testId: '',
                dateTime: defaultDateTime,
                duration: 60,
                recipients: 'All Students',
                selectedBatches: [],
                selectedStudents: [],
                negativeMarking: false,
                autoSubmit: true,
                allowRetake: false,
                autoNotify: true,
                status: 'Draft',
            });
        }
    }, [testData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSourceChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            source: value,
            testId: '', // Reset selected test when source changes
        }));
    };

    const handleTestSelection = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, testId: value }));
        // Simulate loading test details based on selected testId
        setIsLoading(true);
        setTimeout(() => {
            const selectedTest = [...mockAITests, ...mockQuestionBankTests, ...mockTemplates, ...mockManualTests].find(t => t.id === value);
            if (selectedTest) {
                setFormData(prev => ({
                    ...prev,
                    title: selectedTest.name, // Auto-fill title from selected test
                    // You might also auto-fill description, duration, etc. if available in mock data
                }));
            }
            setIsLoading(false);
        }, 500);
    };

    const handleRecipientChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            recipients: value,
            selectedBatches: value === 'Specific Batch(es)' ? prev.selectedBatches : [],
            selectedStudents: value === 'Specific Student(s)' ? prev.selectedStudents : [],
        }));
    };

    const handleBatchSelect = (batchId) => {
        setFormData(prev => ({
            ...prev,
            selectedBatches: prev.selectedBatches.includes(batchId)
                ? prev.selectedBatches.filter(id => id !== batchId)
                : [...prev.selectedBatches, batchId]
        }));
    };

    const handleStudentSelect = (studentId) => {
        setFormData(prev => ({
            ...prev,
            selectedStudents: prev.selectedStudents.includes(studentId)
                ? prev.selectedStudents.filter(id => id !== studentId)
                : [...prev.selectedStudents, studentId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.dateTime || !formData.duration || !formData.testId) {
            alert("Please fill in all required fields: Title, Test Source, Date & Time, Duration.");
            return;
        }
        if (formData.recipients === 'Specific Batch(es)' && formData.selectedBatches.length === 0) {
            alert("Please select at least one batch.");
            return;
        }
        if (formData.recipients === 'Specific Student(s)' && formData.selectedStudents.length === 0) {
            alert("Please select at least one student.");
            return;
        }

        onSave({ ...formData, status: 'Scheduled' }); // Always set to scheduled on save from modal
        onClose();
    };

    const filteredStudents = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !formData.selectedStudents.includes(student.id)
    );

    const getAvailableTestsForSource = () => {
        switch (formData.source) {
            case 'AI Generated': return mockAITests;
            case 'Question Bank': return mockQuestionBankTests;
            case 'Template': return mockTemplates;
            case 'Manual': return mockManualTests;
            default: return [];
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{testData ? 'Edit Scheduled Test' : 'Schedule New Test'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Select Test Source */}
                    <div>
                        <label htmlFor="source" className="block text-sm font-medium text-slate-300 mb-2">Select Test Source</label>
                        <select id="source" name="source" value={formData.source} onChange={handleSourceChange}
                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required>
                            {testSources.map(src => <option key={src} value={src}>{src}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                    </div>

                    {/* Select Specific Test */}
                    <div>
                        <label htmlFor="testId" className="block text-sm font-medium text-slate-300 mb-2">Select Specific Test</label>
                        <div className="relative">
                            <select id="testId" name="testId" value={formData.testId} onChange={handleTestSelection}
                                className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required>
                                <option value="">-- Select a test --</option>
                                {getAvailableTestsForSource().map(test => (
                                    <option key={test.id} value={test.id}>{test.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 rounded-md">
                                    <Loader size={24} className="animate-spin text-cyan-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Test Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange}
                            rows="3"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
                    </div>

                    {/* Date & Time / Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dateTime" className="block text-sm font-medium text-slate-300 mb-2">Date & Time</label>
                            <input type="datetime-local" id="dateTime" name="dateTime" value={formData.dateTime} onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">Duration (minutes)</label>
                            <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}
                                min="10" max="180"
                                className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                        </div>
                    </div>

                    {/* Assign To */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Assign To</label>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {['All Students', 'Specific Batch(es)', 'Specific Student(s)'].map(option => (
                                <label key={option} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="recipients"
                                        value={option}
                                        checked={formData.recipients === option}
                                        onChange={handleRecipientChange}
                                        className="form-radio h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                                    />
                                    <span className="ml-2 text-slate-300">{option}</span>
                                </label>
                            ))}
                        </div>

                        {formData.recipients === 'Specific Batch(es)' && (
                            <div className="flex flex-wrap gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-md">
                                {mockBatches.map(batch => (
                                    <button
                                        key={batch.id}
                                        type="button"
                                        onClick={() => handleBatchSelect(batch.id)}
                                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
                                            ${formData.selectedBatches.includes(batch.id)
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        {batch.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {formData.recipients === 'Specific Student(s)' && (
                            <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-md">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {formData.selectedStudents.map(studentId => {
                                        const student = mockStudents.find(s => s.id === studentId);
                                        return student ? (
                                            <span key={student.id} className="flex items-center bg-slate-700 text-white px-3 py-1 rounded-full text-sm">
                                                {student.name}
                                                <button type="button" onClick={() => handleStudentSelect(student.id)} className="ml-2 text-red-400 hover:text-red-300">
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search and add student..."
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && filteredStudents.length > 0 && (
                                        <div className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded-md mt-1 max-h-48 overflow-y-auto">
                                            {filteredStudents.map(student => (
                                                <button
                                                    key={student.id}
                                                    type="button"
                                                    onClick={() => { handleStudentSelect(student.id); setSearchTerm(''); }}
                                                    className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 flex items-center"
                                                >
                                                    <User size={18} className="mr-2" /> {student.name} ({student.classGrade})
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Settings</label>
                        <div className="space-y-2 p-3 bg-slate-800/50 border border-slate-700 rounded-md">
                            <label className="flex items-center justify-between text-slate-300">
                                Enable Negative Marking
                                <input type="checkbox" name="negativeMarking" checked={formData.negativeMarking} onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                            </label>
                            <label className="flex items-center justify-between text-slate-300">
                                Auto-submit when time ends
                                <input type="checkbox" name="autoSubmit" checked={formData.autoSubmit} onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                            </label>
                            <label className="flex items-center justify-between text-slate-300">
                                Allow Retake
                                <input type="checkbox" name="allowRetake" checked={formData.allowRetake} onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                            </label>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Notifications</label>
                        <div className="space-y-2 p-3 bg-slate-800/50 border border-slate-700 rounded-md">
                            <label className="flex items-center justify-between text-slate-300">
                                Auto send notification to selected students
                                <input type="checkbox" name="autoNotify" checked={formData.autoNotify} onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={onClose} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center">
                            <Save size={20} className="mr-2" /> Save Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleTestModal;