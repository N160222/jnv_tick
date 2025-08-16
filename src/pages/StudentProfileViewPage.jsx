"use client";

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Phone, GraduationCap, CalendarDays, ArrowLeft } from 'lucide-react';

// Mock Data for a single student (in a real app, this would come from an API)
const mockStudents = [
    { id: 1, name: "Anusha Sharma", email: "anusha.sharma@example.com", phone: "9876543210", classGrade: "Class 6", enrollmentDate: "2023-09-01", status: "Active", avatar: "https://i.pravatar.cc/150?img=48", bio: "A diligent student with a keen interest in mathematics and reasoning. Consistently performs well in mock tests.", recentTests: [{id:1, name:"Maths Test 1", score:85}, {id:2, name:"Reasoning Test 2", score:92}]},
    { id: 2, name: "Rahul Verma", email: "rahul.verma@example.com", phone: "9123456789", classGrade: "Class 6", enrollmentDate: "2023-09-05", status: "Active", avatar: "https://i.pravatar.cc/150?img=68", bio: "Enthusiastic learner, always eager to tackle new challenges. Shows great potential in language arts.", recentTests: [{id:3, name:"Language Test 1", score:78}, {id:4, name:"Drawing Test 1", score:88}]},
    { id: 3, name: "Priya Singh", email: "priya.singh@example.com", phone: "9988776655", classGrade: "Class 7", enrollmentDate: "2023-09-10", status: "Active", avatar: "https://i.pravatar.cc/150?img=25", bio: "Dedicated and focused, with a strong grasp of scientific concepts. Aims for perfection in every test.", recentTests: [{id:5, name:"Science Test 1", score:95}, {id:6, name:"Maths Test 2", score:90}]},
    { id: 4, name: "Amit Kumar", email: "amit.kumar@example.com", phone: "9000111222", classGrade: "Class 6", enrollmentDate: "2023-09-15", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=60", bio: "Struggling with consistency but shows flashes of brilliance. Needs encouragement in reasoning.", recentTests: [{id:7, name:"Reasoning Test 1", score:60}, {id:8, name:"Language Test 2", score:70}]},
];

const StudentProfileViewPage = () => {
    const { id } = useParams();
    const student = mockStudents.find(s => s.id === parseInt(id));
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!student) {
        return (
            <div className="min-h-screen flex flex-col main-bg-gradient text-white">
                <Header isAdmin={true} />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center glass-effect rounded-2xl p-8">
                        <h1 className="text-3xl font-bold mb-4">Student Not Found</h1>
                        <p className="text-slate-400 mb-6">The student profile you are looking for does not exist.</p>
                        <Link to="/admin/manage-students" className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center mx-auto w-fit">
                            <ArrowLeft size={20} className="mr-2" /> Back to Manage Students
                        </Link>
                    </div>
                </main>
                <Footer minimal="Student profile not found 😔" />
            </div>
        );
    }

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <User size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <GraduationCap size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header isAdmin={true} />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Student Profile</h1>
                            <p className="mt-2 text-lg text-slate-400">Detailed view for {student.name}.</p>
                        </div>

                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 text-center">
                            <img src={student.avatar} alt={student.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-cyan-500 shadow-lg shadow-cyan-900/50" />
                            <h2 className="text-3xl font-bold text-white mb-2">{student.name}</h2>
                            <p className="text-slate-400 mb-4">{student.bio}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-slate-300">
                                <p className="flex items-center"><Mail size={18} className="mr-2 text-slate-500" /> {student.email}</p>
                                <p className="flex items-center"><Phone size={18} className="mr-2 text-slate-500" /> {student.phone}</p>
                                <p className="flex items-center"><GraduationCap size={18} className="mr-2 text-slate-500" /> {student.classGrade}</p>
                                <p className="flex items-center"><CalendarDays size={18} className="mr-2 text-slate-500" /> Enrolled: {student.enrollmentDate}</p>
                            </div>
                            <div className="mt-6">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${student.status === 'Active' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                                    Status: {student.status}
                                </span>
                            </div>
                        </div>

                        {/* Recent Test Scores (Mock) */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4">Recent Test Scores</h2>
                            {student.recentTests && student.recentTests.length > 0 ? (
                                <ul className="space-y-3">
                                    {student.recentTests.map(test => (
                                        <li key={test.id} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                            <span className="text-slate-300">{test.name}</span>
                                            <span className="font-bold text-cyan-400">{test.score}%</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-center">No recent test data available.</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/admin/manage-students"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Back to Manage Students
                            </Link>
                            <Link
                                to="/admin/results-reports"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                View Full Reports
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Student insights at your fingertips 📊" />
        </div>
    );
};

export default StudentProfileViewPage;