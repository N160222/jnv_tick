import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Bell, Settings } from 'lucide-react'; // Import Settings icon

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [language, setLanguage] = useState('EN');
    const location = useLocation();

    const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/mock-tests') || location.pathname.startsWith('/test-interface') || location.pathname.startsWith('/results') || location.pathname.startsWith('/review-answers') || location.pathname.startsWith('/leaderboard') || location.pathname.startsWith('/notifications') || location.pathname.startsWith('/settings') || location.pathname.startsWith('/help-support'); // Added /help-support

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

    const navLinks = isDashboard ? [
        { name: "Mock Tests", href: "/mock-tests" },
        { name: "Study Plan", href: "/study-plan" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "AI Tutor", href: "/ai-tutor" },
        { name: "Help & Support", href: "/help-support" }, // Added Help & Support link
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
                    <Link to={isDashboard ? "/dashboard" : "/"} className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-white tracking-wider glow-text">
                            Navodaya <span className="text-cyan-400">AI</span> Prep
                        </h1>
                    </Link>
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map(link => (
                            <Link key={link.name} to={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!isDashboard && <button onClick={toggleLanguage} className="border border-slate-600 px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">{language === 'EN' ? 'Telugu' : 'English'}</button>}
                        {isDashboard ? (
                             <>
                                <Link to="/notifications" className="relative text-slate-300 hover:text-white transition-colors">
                                    <Bell size={24} />
                                    {/* Static unread indicator */}
                                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping-slow"></span>
                                </Link>
                                <Link to="/settings" className="text-slate-300 hover:text-white transition-colors">
                                    <Settings size={24} />
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/40" alt="User avatar" />
                                        <span className="text-white">Anusha</span>
                                        <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">My Profile</Link>
                                        <button onClick={() => alert('Logging out...')} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 flex items-center">
                                            <LogOut size={16} className="mr-2" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/auth" className="px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-all duration-200 transform hover:scale-105">Sign Up</Link>
                            </>
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
                                <Link key={link.name} to={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block px-2 py-1">
                                    {link.name}
                                </Link>
                            ))}
                            <div className="border-t border-slate-800 pt-4 flex flex-col space-y-4">
                            {isDashboard ? (
                                <>
                                    <Link to="/notifications" className="text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <Bell size={18} className="mr-2" /> Notifications
                                        <span className="ml-2 h-2 w-2 bg-red-500 rounded-full animate-ping-slow"></span>
                                    </Link>
                                    <Link to="/settings" className="text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <Settings size={18} className="mr-2" /> Settings
                                    </Link>
                                    <Link to="/profile" className="text-slate-300 hover:text-white">My Account</Link>
                                    <button onClick={() => alert('Logging out...')} className="w-full text-left text-slate-300 hover:text-white flex items-center px-2 py-1">
                                        <LogOut size={18} className="mr-2" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth" className="text-slate-300 hover:text-white">Login</Link>
                                    <Link to="/auth" className="w-full text-center px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-md hover:bg-cyan-400 transition-all duration-200">Sign Up</Link>
                                </>
                            )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;