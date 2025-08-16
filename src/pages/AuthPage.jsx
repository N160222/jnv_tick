import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Placeholder for login logic
        navigate('/dashboard');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Placeholder for sign up logic
        navigate('/dashboard');
    };

    return (
        <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-purple-900/40">
            <div className="flex border-b border-slate-700 mb-6">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`w-1/2 py-3 text-lg font-bold transition-colors \${isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`w-1/2 py-3 text-lg font-bold transition-colors \${!isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Sign Up
                </button>
            </div>

            {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">Password</label>
                            <Link to="/forgot-password" className="text-sm text-cyan-400 hover:underline">Forgot password?</Link>
                        </div>
                        <input type="password" id="password" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="signup-email">Email</label>
                        <input type="email" id="signup-email" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" required />
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                        Sign Up
                    </button>
                </form>
            )}
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="w-full flex items-center justify-center px-8 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors">
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.962l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.487 44 30.651 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                        Google
                    </button>
                </div>
                <p className="mt-8 text-center text-xs text-slate-500">
                    By signing up, you agree to our Terms & Privacy Policy.
                </p>
            </div>
        </div>
    );
};

const AuthPage = () => {
    return (
        <div className="min-h-screen flex flex-col main-bg-gradient">
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
                        <div className="flex justify-center">
                           <AuthForm />
                        </div>
                        <div className="hidden lg:block text-center">
                            <img src="https://storage.googleapis.com/pai-images/468095b9227c4b77a5840b106201b2f7.jpeg" alt="AI teacher hologram with student" className="max-w-md mx-auto rounded-2xl" />
                             <h2 className="text-3xl font-bold text-white mt-8">Unlock Your Potential</h2>
                            <p className="text-slate-300 mt-2">Join thousands of students preparing for success with AI.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthPage;