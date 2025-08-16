import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Bell, LayoutDashboard, Users, BookOpen, BarChart, Award, Brain, ClipboardList, SquarePen, ListChecks, TrendingUp, Activity } from 'lucide-react'; // Added Activity icon for analytics

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [language, setLanguage] = useState('EN');
    const location = useLocation();

    // Determine if the current path is an admin path
    const isAdminPath = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/admin/');

    // Updated isDashboard check to include /settings as a dashboard-related page
    const isStudentDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/mock-tests') || location.pathname.startsWith('/test-interface') || location.pathname.startsWith('/results') || location.pathname.startsWith('/review-answers') || location.pathname.startsWith('/leaderboard') || location.pathname.startsWith('/notifications') || location.pathname.startsWith('/settings') || location.pathname.startsWith('/help-support') || location.pathname.startsWith('/rewards-badges');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(lang => lang === 'EN' ? 'TE' : 'EN');
    };

    const navLinks = isAdminPath ? [
        { name: "Dashboard", href: "/admin-dashboard", icon: <LayoutDashboard size={18} className="mr-2" /> },
        { name: "Manage Students", href: "/admin/manage-students", icon: <Users size={18} className="mr-2" /> },
        { name: "Manage Tests", href: "/admin/manage-tests", icon: <BookOpen size={18} className="mr-2" /> },
        { name: "AI Test Gen", href: "/admin/ai-test-generation", icon: <Brain size={18} className="mr-2" /> },
        { name: "AI Test Templates", href: "/admin/ai-test-templates", icon: <ClipboardList size={18} className="mr-2" /> },
        { name: "Manual Test Creation", href: "/admin/manual-test-creation", icon: <SquarePen size={18} className="mr-2" /> },
        { name: "Question Bank", href: "/admin/question-bank", icon: <ListChecks size={18} className="mr-2" /> },
        { name: "Student Reports & Performance", href: "/admin/student-reports-performance", icon: <TrendingUp size={18} className="mr-2" /> },
        { name: "Results & Reports", href: "/admin/results-reports", icon: <BarChart size={18} className="mr-2" /> },
        { name: "Rewards & Leaderboard", href: "/admin/rewards-leaderboard", icon: <Award size={18} className="mr-2" /> },
        { name: "Analytics Dashboard", href: "/admin/analytics-dashboard", icon: <Activity size={18} className="mr-2" /> }, {/* New link */}
    ] : isStudentDashboard ? [
        { name: "Mock Tests", href: "/mock-tests" },
        { name: "Study Plan", href: "/study-plan" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "AI Tutor", href: "/ai-tutor" },
        { name: "Help & Support", href: "/help-support" },
        { name: "Rewards & Badges", href: "/rewards-badges" },
    ] : [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to={isAdminPath ? "/admin-dashboard" : isStudentDashboard ? "/dashboard" : "/"} className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-white tracking-wider glow-text">
                            Navodaya <span className="text-cyan-400">AI</span> Prep
                        </h1>
                    </Link>
                    <div className="hidden md:flex items-center flex-grow justify-between"> {/* Added flex-grow and justify-between */}
                        <div className="flex space-x-6 overflow-x-auto pb-2 custom-scrollbar"> {/* Adjusted space-x, added overflow */}
                            {navLinks.map(link => (
                                <Link key={link.name} to={link.href} className="flex-shrink-0 text-slate-300 hover:text-cyan-400 transition-colors duration-200 flex items-center whitespace-nowrap">
                                    {link.icon && link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        {/* Existing right-side elements (Admin Dropdown, Logout, etc.) */}
                        <div className="flex items-center space-x-4 flex-shrink-0 ml-4"> {/* Wrap right-side elements, added ml-4 for spacing */}
                            {!isStudentDashboard && !isAdminPath && (
                                <>
                                    {/* Admin Dropdown */}
                                    <div className="relative group">
                                        <button className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 transition-colors duration-200 focus:outline-none">
                                            <span>Admin</span>
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </button>
                                        <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                                            <Link to="/admin-dashboard" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">Admin Dashboard</Link>
                                        </div>
                                    </div>
                                    <button onClick={toggleLanguage} className="border border-slate-600 px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">{language === 'EN' ? 'Telugu' : 'English'}</button>
                                    <Link to="/auth" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                                    <Link to="/auth" className="px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-all duration-200 transform hover:scale-105">Sign Up</Link>
                                </>
                            )}
                            {isStudentDashboard && (
                                 <>
                                    <Link to="/notifications" className="relative text-slate-300 hover:text-white transition-colors">
                                        <Bell size={24} />
                                        {/* Static unread indicator */}
                                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping-slow"></span>
                                    </Link>
                                    <div className="relative group">
                                        <button className="flex items-center space-x-2 focus:outline-none">
                                            <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/40" alt="User avatar" />
                                            <span className="text-white">Anusha</span>
                                            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">My Profile & Settings</Link>
                                        <button onClick={() => alert('Logging out...')} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 flex items-center">
                                            <LogOut size={16} className="mr-2" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {isAdminPath && (
                            <button onClick={() => alert('Admin Logging out...')} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors flex items-center">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map(link => (
                                <Link key={link.name} to={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block px-2 py-1 flex items-center">
                                    {link.icon && link.icon}
                                    {link.name}
                                </Link>
                            ))}
                            {/* Add Admin Dashboard link for mobile when not in admin/student dashboard */}
                            {!isStudentDashboard && !isAdminPath && (
                                <Link to="/admin-dashboard" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block px-2 py-1 flex items-center">
                                    Admin Dashboard
                                </Link>
                            )}
                            <div className="border-t border-slate-800 pt-4 flex flex-col space-y-4">
                            {isStudentDashboard ? (
                                <>
                                    <Link to="/notifications" className="text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <Bell size={18} className="mr-2" /> Notifications
                                        <span className="ml-2 h-2 w-2 bg-red-500 rounded-full animate-ping-slow"></span>
                                    </Link>
                                    <Link to="/settings" className="text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <Users size={18} className="mr-2" /> My Profile & Settings
                                    </Link>
                                    <button onClick={() => alert('Logging out...')} className="w-full text-left text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <LogOut size={18} className="mr-2" /> Logout
                                    </button>
                                </>
                            ) : isAdminPath ? (
                                <button onClick={() => alert('Admin Logging out...')} className="w-full text-left text-slate-300 hover:text-white flex items-center px-2 py-1">
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/auth" className="text-slate-300 hover:text-white">Login</Link>
                                    <Link to="/auth" className="w-full text-center px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-all duration-200">Sign Up</Link>
                                </>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;