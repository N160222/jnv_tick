import React from 'react';

const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.25l-.648-1.688a2.25 2.25 0 01-1.47-1.47L12.75 18.5l1.688-.648a2.25 2.25 0 011.47 1.47L16.25 20l.648.562a2.25 2.25 0 011.47-1.47l1.688.648-1.688.648a2.25 2.25 0 01-1.47 1.47z" /></svg>;
const LanguageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>;
const ShapesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>;

const FeatureCard = ({ icon, title, description }) => (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/30">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <div className="relative z-10">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-xl text-white inline-block mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    </div>
);

const CoreFeatures = () => {
    const features = [
        { icon: <BrainIcon />, title: "AI-Generated Mock Tests", description: "Unlimited practice tailored to your strengths and weaknesses with adaptive difficulty." },
        { icon: <LanguageIcon />, title: "Bilingual Learning", description: "Learn in Telugu or English with instant translations and voice support." },
        { icon: <ShapesIcon />, title: "Reasoning Drawings Included", description: "Pattern completion, shapes, and diagrams - all in one interactive platform." },
    ];

    return (
        <section className="py-20 sm:py-32 section-bg-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Experience the Future of JNV Prep</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Our platform is designed to give you a competitive edge with cutting-edge features.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreFeatures;