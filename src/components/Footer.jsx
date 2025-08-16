"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>;
const YouTubeIcon = () => <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>;
const InstagramIcon = () => <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>;

const Footer = ({ minimal }) => {
    if (minimal) {
        return (
            <footer className="main-bg-gradient border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
                <p>Keep practicing to improve your skills 🚀</p>
            </footer>
        );
    }

    return (
        <footer className="main-bg-gradient border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-white tracking-wider">Navodaya <span className="text-cyan-400">AI</span> Prep</h1>
                        <p className="text-slate-400 max-w-xs">AI-powered mock tests for the JNV Class 6 entrance exam.</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <h3 className="font-bold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-slate-400 hover:text-cyan-400">About Us</Link></li>
                                <li><Link to="/pricing" className="text-slate-400 hover:text-cyan-400">Pricing</Link></li>
                                <li><Link to="/contact" className="text-slate-400 hover:text-cyan-400">Contact</Link></li>
                                <li><Link to="/auth" className="text-slate-400 hover:text-cyan-400">Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white"><FacebookIcon /></a>
                            <a href="#" className="text-slate-400 hover:text-white"><YouTubeIcon /></a>
                            <a href="#" className="text-slate-400 hover:text-white"><InstagramIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Navodaya AI Prep. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;