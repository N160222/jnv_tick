import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-20 sm:py-32 section-bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 rounded-2xl p-12 text-center shadow-2xl shadow-purple-900/40">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Your JNV Journey Starts Today
                    </h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Be exam ready with the most advanced AI-powered preparation platform in the nation.
                    </p>
                    <div className="mt-8">
                        <Link to="/auth" className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;