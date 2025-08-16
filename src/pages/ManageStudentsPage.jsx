"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, PlusCircle, Edit, Trash2, Eye, Search, Filter, ChevronDown, X, CalendarDays, GraduationCap, Phone, Mail, User as UserIcon } from 'lucide-react';

// Mock Data for Students
const initialStudents = [
    { id: 1, name: "Anusha Sharma", email: "anusha.sharma@example.com", phone: "9876543210", classGrade: "Class 6", enrollmentDate: "2023-09-01", status: "Active", avatar: "https://i.pravatar.cc/150?img=48" },
    { id: 2, name: "Rahul Verma", email: "rahul.verma@example.com", phone: "9123456789", classGrade: "Class 6", enrollmentDate: "2023-09-05", status: "Active", avatar: "https://i.pravatar.cc/150?img=68" },
    { id: 3, name: "Priya Singh", email: "priya.singh@example.com", phone: "9988776655", classGrade: "Class 7", enrollmentDate: "2023-09-10", status: "Active", avatar: "https://i.pravatar.cc/150?img=25" },
    { id: 4, name: "Amit Kumar", email: "amit.kumar@example.com", phone: "9000111222", classGrade: "Class 6", enrollmentDate: "2023-09-15", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=60" },
    { id: 5, name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "9765432109", classGrade: "Class 7", enrollmentDate: "2023-09-20", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 6, name: "Vikram Yadav", email: "vikram.yadav@example.com", phone: "9555444333", classGrade: "Class 6", enrollmentDate: "2023-09-25", status: "Active", avatar: "https://i.pravatar.cc/150?img=70" },
    { id: 7, name: "Divya Patel", email: "divya.patel@example.com", phone: "9321098765", classGrade: "Class 8", enrollmentDate: "2023-10-01", status: "Active", avatar: "https://i.pravatar.cc/150?img=20" },
    { id: 8, name: "Rohan Gupta", email: "rohan.gupta@example.com", phone: "9666777888", classGrade: "Class 7", enrollmentDate: "2023-10-05", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=65" },
];

// Add/Edit Student Modal Component
const AddEditStudentModal = ({ isOpen, onClose, studentData, onSave }) => {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        classGrade: '',
        enrollmentDate: '',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?img=random' // Default avatar
    });

    useEffect(() => {
        if (studentData) {
            setFormData(studentData);
        } else {
            setFormData({
                id: null,
                name: '',
                email: '',
                phone: '',
                classGrade: '',
                enrollmentDate: '',
                status: 'Active',
                avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` // Random avatar for new student
            });
        }
    }, [studentData, isOpen]);

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
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{studentData ? 'Edit Student' : 'Add New Student'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="classGrade" className="block text-sm font-medium text-slate-300 mb-2">Class/Grade</label>
                        <input type="text" id="classGrade" name="classGrade" value={formData.classGrade} onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="enrollmentDate" className="block text-sm font-medium text-slate-300 mb-2">Enrollment Date</label>
                        <input type="date" id="enrollmentDate" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange}
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
                        {studentData ? 'Save Changes' : 'Add Student'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sm:p-8 text-center shadow-xl animate-scale-in max-w-sm w-full">
                <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
                <p className="text-slate-300 mb-6">Are you sure you want to remove <span className="font-semibold text-red-400">{studentName}</span>?</p>
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

const ManageStudentsPage = () => {
    const [students, setStudents] = useState(initialStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isDesktop, setIsDesktop] = useState(false);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const classes = ["All", ...new Set(initialStudents.map(s => s.classGrade))];
    const statuses = ["All", "Active", "Inactive"];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = filterClass === 'All' || student.classGrade === filterClass;
        const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
        return matchesSearch && matchesClass && matchesStatus;
    });

    const handleAddStudent = () => {
        setEditingStudent(null);
        setIsAddEditModalOpen(true);
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setIsAddEditModalOpen(true);
    };

    const handleSaveStudent = (newStudentData) => {
        if (newStudentData.id) {
            // Edit existing student
            setStudents(prev => prev.map(s => s.id === newStudentData.id ? newStudentData : s));
        } else {
            // Add new student
            const newId = Math.max(...students.map(s => s.id), 0) + 1; // Generate new ID
            setStudents(prev => [...prev, { ...newStudentData, id: newId }]);
        }
    };

    const handleDeleteStudent = (student) => {
        setStudentToDelete(student);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
        setShowDeleteConfirm(false);
        setStudentToDelete(null);
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <img src="https://storage.googleapis.com/pai-images/468095b9227c4b77a5840b106201b2f7.jpeg" alt="AI teacher hologram" className="max-w-[150px] mx-auto rounded-full shadow-lg" />
                        <Users size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <UserIcon size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start">
                    <div className="w-full max-w-5xl animate-fade-in-up">
                        <div className="mb-8 text-center lg:text-left flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">👩‍🎓 Manage Students</h1>
                                <p className="mt-2 text-lg text-slate-400">View, add, and organize your student records easily.</p>
                            </div>
                            <button
                                onClick={handleAddStudent}
                                className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                            >
                                <PlusCircle size={20} className="mr-2" /> Add New Student
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
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

                        {/* Student List Table (Desktop) / Card View (Mobile) */}
                        {isDesktop ? (
                            <div className="glass-effect rounded-2xl p-6 sm:p-8 overflow-x-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Student Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Class/Grade</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Enrollment Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student, index) => (
                                                <tr key={student.id} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                                                        <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                                        {student.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.classGrade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.enrollmentDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'Active' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                            {student.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                        <div className="flex items-center justify-center space-x-3">
                                                            <button onClick={() => handleEditStudent(student)} className="text-blue-400 hover:text-blue-300" title="Edit Student"><Edit size={18} /></button>
                                                            <button onClick={() => handleDeleteStudent(student)} className="text-red-400 hover:text-red-300" title="Remove Student"><Trash2 size={18} /></button>
                                                            <Link to={`/admin/student-profile/${student.id}`} className="text-purple-400 hover:text-purple-300" title="View Profile"><Eye size={18} /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-slate-400">No students found matching your criteria.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, index) => (
                                        <div key={student.id} className="glass-effect rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg" style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className="flex items-center mb-3">
                                                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500" />
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{student.name}</h3>
                                                    <p className="text-slate-400 text-sm">{student.email}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 mb-4">
                                                <div className="flex items-center"><GraduationCap size={16} className="mr-2 text-slate-500" /> {student.classGrade}</div>
                                                <div className="flex items-center"><CalendarDays size={16} className="mr-2 text-slate-500" /> {student.enrollmentDate}</div>
                                                <div className="flex items-center"><Phone size={16} className="mr-2 text-slate-500" /> {student.phone}</div>
                                                <div className="flex items-center"><Mail size={16} className="mr-2 text-slate-500" /> {student.email}</div>
                                                <div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'Active' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                                        {student.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-3 border-t border-slate-800 pt-3">
                                                <button onClick={() => handleEditStudent(student)} className="text-blue-400 hover:text-blue-300" title="Edit Student"><Edit size={20} /></button>
                                                <button onClick={() => handleDeleteStudent(student)} className="text-red-400 hover:text-red-300" title="Remove Student"><Trash2 size={20} /></button>
                                                <Link to={`/admin/student-profile/${student.id}`} className="text-purple-400 hover:text-purple-300" title="View Profile"><Eye size={20} /></Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-400 py-10">
                                        No students found matching your criteria. Try adjusting your search or filters.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pagination (Mocked) */}
                        {filteredStudents.length > 5 && (
                            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                    Load More Students
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer minimal="Manage your student roster with ease 🧑‍🎓" />

            <AddEditStudentModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                studentData={editingStudent}
                onSave={handleSaveStudent}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                studentName={studentToDelete?.name}
            />
        </div>
    );
};

export default ManageStudentsPage;