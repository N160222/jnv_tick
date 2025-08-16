import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const CrossIcon = () => <svg className="h-6 w-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const Pricing = () => {
    return (
        <section className="py-20 sm:py-32 main-bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-slate-400">Choose the plan that's right for your JNV preparation journey.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-3">
                        <div className="p-6 font-bold text-lg text-white">Features</div>
                        <div className="p-6 font-bold text-lg text-white text-center bg-slate-800/50">Free</div>
                        <div className="p-6 font-bold text-lg text-center gold-gradient-text">Premium</div>
                    </div>

                    <div className="divide-y divide-slate-800">
                        {[
                            { feature: 'AI Mock Tests', free: '3 Tests', premium: 'Unlimited' },
                            { feature: 'Performance Analytics', free: <CheckIcon />, premium: <CheckIcon /> },
                            { feature: 'AI Tutor Access', free: 'Limited', premium: 'Unlimited' },
                            { feature: 'Bilingual Support', free: <CheckIcon />, premium: <CheckIcon /> },
                            { feature: 'Reasoning Drawings', free: <CrossIcon />, premium: <CheckIcon /> },
                            { feature: 'National Leaderboard', free: <CrossIcon />, premium: <CheckIcon /> },
                        ].map(({ feature, free, premium }, index) => (
                            <div key={index} className="grid grid-cols-3 items-center">
                                <div className="p-4 text-slate-300">{feature}</div>
                                <div className="p-4 flex justify-center text-slate-300 bg-slate-800/50">{free}</div>
                                <div className="p-4 flex justify-center font-bold text-white">{premium}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                     <Link to="/pricing" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                        View Full Pricing
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Pricing;