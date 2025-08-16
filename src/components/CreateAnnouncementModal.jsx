"use client";

import React, { useState, useEffect } from 'react';
import { X, CalendarDays, Users, Layers, User, Paperclip, Send, Save, Clock } from 'lucide-react';

// Mock Data for recipients
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

const CreateAnnouncementModal = ({ isOpen, onClose, announcementData, onSave }) => {
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        message: '',
        type: 'General Info',
        recipients: 'All Students', // 'All Students', 'Specific Batch(es)', 'Specific Student(s)'
        selectedBatches: [],
        selectedStudents: [],
        attachments: [], // Mock: just file names
        schedule: 'Send Now', // 'Send Now', 'Schedule for later'
        scheduledDate: '',
        status: 'Draft', // 'Draft', 'Sent', 'Scheduled'
    });
    const [searchTerm, setSearchTerm] = useState('');

    const announcementTypes = ["General Info", "Exam Update", "Result Published", "Urgent Alert"];

    useEffect(() => {
        if (announcementData) {
            setFormData({
                ...announcementData,
                selectedBatches: announcementData.selectedBatches || [],
                selectedStudents: announcementData.selectedStudents || [],
                attachments: announcementData.attachments || [],
            });
        } else {
            setFormData({
                id: null,
                title: '',
                message: '',
                type: 'General Info',
                recipients: 'All Students',
                selectedBatches: [],
                selectedStudents: [],
                attachments: [],
                schedule: 'Send Now',
                scheduledDate: '',
                status: 'Draft',
            });
        }
    }, [announcementData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

    const handleAttachmentChange = (e) => {
        // Mock attachment handling
        const files = Array.from(e.target.files).map(file => file.name);
        setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
        alert(`Mock: Uploaded files: ${files.join(', ')}`);
    };

    const handleRemoveAttachment = (fileName) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter(name => name !== fileName)
        }));
    };

    const handleSubmit = (action) => (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.message.trim()) {
            alert("Title and Message cannot be empty.");
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
        if (formData.schedule === 'Schedule for later' && !formData.scheduledDate) {
            alert("Please select a scheduled date.");
            return;
        }

        const finalData = {
            ...formData,
            status: action === 'send' ? (formData.schedule === 'Send Now' ? 'Sent' : 'Scheduled') : 'Draft',
            sentOn: action === 'send' && formData.schedule === 'Send Now' ? new Date().toISOString().split('T')[0] : announcementData?.sentOn,
        };
        onSave(finalData);
        onClose();
    };

    const filteredStudents = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !formData.selectedStudents.includes(student.id)
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-xl animate-scale-in max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{announcementData ? 'Edit Announcement' : 'Create New Announcement'}</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                            rows="5"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" placeholder="Enter your announcement message here..." required />
                        <p className="text-xs text-slate-500 mt-1">Note: Rich text editing is a future enhancement.</p>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                        <select id="type" name="type" value={formData.type} onChange={handleChange}
                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-3 pr-10 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition">
                            {announcementTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-[calc(100%-2.25rem)] translate-y-[-50%] text-slate-400 pointer-events-none" size={20} />
                    </div>

                    {/* Recipients Section */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Recipients</label>
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
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
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

                    {/* Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Attachments (PDF, Image)</label>
                        <input type="file" multiple onChange={handleAttachmentChange} className="hidden" id="attachment-upload" />
                        <label htmlFor="attachment-upload" className="cursor-pointer px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center justify-center w-fit">
                            <Paperclip size={18} className="mr-2" /> Add Attachment (Mock)
                        </label>
                        <div className="mt-2 space-y-1">
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-md p-2 text-sm text-slate-300">
                                    <span>{file}</span>
                                    <button type="button" onClick={() => handleRemoveAttachment(file)} className="text-red-400 hover:text-red-300">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Schedule</label>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {['Send Now', 'Schedule for later'].map(option => (
                                <label key={option} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={option}
                                        checked={formData.schedule === option}
                                        onChange={handleChange}
                                        className="form-radio h-5 w-5 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                                    />
                                    <span className="ml-2 text-slate-300">{option}</span>
                                </label>
                            ))}
                        </div>
                        {formData.schedule === 'Schedule for later' && (
                            <div>
                                <label htmlFor="scheduledDate" className="block text-sm font-medium text-slate-300 mb-2">Scheduled Date</label>
                                <input type="date" id="scheduledDate" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={handleSubmit('draft')} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                            <Save size={20} className="mr-2" /> Save Draft
                        </button>
                        <button type="button" onClick={handleSubmit('send')} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center">
                            <Send size={20} className="mr-2" /> {formData.schedule === 'Send Now' ? 'Send Now' : 'Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAnnouncementModal;