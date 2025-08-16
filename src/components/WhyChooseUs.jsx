import React from 'react';

const features = [
    { title: 'Nationwide Ready', description: 'Curriculum aligned with the latest JNV syllabus for all states.' },
    { title: 'Accurate Weakness Analysis', description: 'Our AI pinpoints your weak topics with precision for focused study.' },
    { title: 'Voice-Based AI Tutor', description: 'Ask doubts in your own voice and get instant, clear explanations.' },
    { title: 'Gamified Leaderboards', description: 'Compete with peers across the nation and stay motivated.' },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 sm:py-32 main-bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose Our AI Platform?</h2>
                    <p className="mt-4 text-lg text-slate-400">Unlock your full potential with features you won't find anywhere else.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 text-center transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-900/50">
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;