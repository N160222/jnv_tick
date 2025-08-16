"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HelpCircle, Mail, MessageSquare, ChevronDown, ChevronUp, Bot } from 'lucide-react';

const faqs = [
    {
        id: 1,
        question: "How to attempt a mock test?",
        answer: "Navigate to the 'Mock Tests' page from your dashboard. Select a test from the list, and click 'Start Test'. Follow the on-screen instructions to answer questions and manage your time. You can navigate between questions using the 'Previous' and 'Next' buttons."
    },
    {
        id: 2,
        question: "How are results calculated?",
        answer: "Your results are calculated based on the number of correct answers, incorrect answers, and skipped questions. Our AI also analyzes your performance to identify weak areas and provides a detailed report on the 'Results' page after test submission."
    },
    {
        id: 3,
        question: "Can I reset my password?",
        answer: "Yes, you can reset your password from the 'Settings' page. Go to 'Profile' from your dashboard, then click 'Edit Settings'. In the 'Password & Security' section, you can update your password."
    },
    {
        id: 4,
        question: "What if I face technical issues?",
        answer: "If you encounter any technical issues, please describe them in detail using the 'Contact Support' form on this page. Our technical team will review your request and get back to you as soon as possible."
    },
];

const HelpSupportPage = () => {
    const navigate = useNavigate();
    const [openFaqId, setOpenFaqId] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Form state
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        issueType: 'Login',
        description: ''
    });

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        // Mock submission logic
        console.log("Contact request submitted:", contactForm);
        alert("✅ Request submitted! Our team will get back to you shortly.");
        // Clear form
        setContactForm({ name: '', email: '', issueType: 'Login', description: '' });
    };

    const handleStartChat = () => {
        alert("🤖 Chat with AI Assistant coming soon!");
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Bot size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <HelpCircle size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Help & Support</h1>
                            <p className="mt-2 text-lg text-slate-400">Find answers to common questions or contact our support team.</p>
                        </div>

                        {/* Quick FAQs Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><HelpCircle size={24} className="mr-3 text-cyan-400" /> Quick FAQs</h2>
                            <div className="space-y-4">
                                {faqs.map(faq => (
                                    <div key={faq.id} className="border border-slate-800 rounded-lg overflow-hidden">
                                        <button
                                            className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-white bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                                            onClick={() => toggleFaq(faq.id)}
                                        >
                                            {faq.question}
                                            {openFaqId === faq.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                                        </button>
                                        {openFaqId === faq.id && (
                                            <div className="p-4 text-slate-300 bg-slate-900/30 animate-fade-in-up">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Support Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Mail size={24} className="mr-3 text-purple-400" /> Contact Support</h2>
                            <form onSubmit={handleSubmitRequest} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={contactForm.name}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={contactForm.email}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="issueType" className="block text-sm font-medium text-slate-300 mb-2">Issue Type</label>
                                    <div className="relative">
                                        <select
                                            id="issueType"
                                            name="issueType"
                                            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-4 pr-10 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                            value={contactForm.issueType}
                                            onChange={handleFormChange}
                                        >
                                            <option value="Login">Login Issues</option>
                                            <option value="Test">Mock Test Issues</option>
                                            <option value="Results">Results & Performance</option>
                                            <option value="Others">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Issue Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="5"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                        value={contactForm.description}
                                        onChange={handleFormChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                                    Submit Request
                                </button>
                            </form>
                        </div>

                        {/* Live Chat Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 text-center">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-center"><MessageSquare size={24} className="mr-3 text-yellow-400" /> Live Chat</h2>
                            <p className="text-slate-400 mb-6">Need immediate assistance? Chat with our AI Assistant.</p>
                            <button
                                onClick={handleStartChat}
                                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                            >
                                <Bot size={20} className="mr-2" /> Start Chat with AI Assistant
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Need help? We’re always here for you ✨" />
        </div>
    );
};

export default HelpSupportPage;