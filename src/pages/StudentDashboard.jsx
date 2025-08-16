import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link

// Icons using SVG paths for simplicity
const RocketLaunchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-7.38 5.84m2.56-5.84a6 6 0 01-5.84-7.38m5.84 2.56a6 6 0 017.38-5.84m-2.56 5.84a6 6 0 015.84 7.38m-5.84-2.56a6 6 0 01-7.38-5.84m12.56 2.56a12.001 12.001 0 00-2.56-5.84 12.001 12.001 0 00-5.84-2.56m-2.56 5.84a12.001 12.001 0 00-5.84 2.56 12.001 12.001 0 00-2.56 5.84m5.84-2.56a12.001 12.001 0 002.56 5.84 12.001 12.001 0 005.84 2.56" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
const ChatBubbleLeftRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.993 1.993 0 013 17.25V8.511c0-.97.616-1.813 1.5-2.097l6.75-3.375a1.125 1.125 0 011.5 0l6.75 3.375z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>; // Added TrophyIcon

const QuickActionCard = ({ icon, title, description, to }) => (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-900/30">
        <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-lg text-white">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </div>
        <Link to={to} className="absolute inset-0" aria-label={title}></Link>
    </div>
);

const recentActivityData = [
    { name: "Mental Ability Test #5", score: "85%", date: "Aug 14, 2024" },
    { name: "Arithmetic Test #3", score: "92%", date: "Aug 12, 2024" },
    { name: "Full-Length Mock Exam #2", score: "88%", date: "Aug 10, 2024" },
    { name: "Language Test #4", score: "78%", date: "Aug 9, 2024" },
];

const weakAreasData = ["Percentages", "Geometry", "Pattern Completion", "Synonyms & Antonyms", "Data Interpretation"];

const StudentDashboard = () => {
    const studentName = "Anusha"; // Placeholder name

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-12 sm:py-16 section-bg-gradient">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="mb-12 animate-fade-in-up">
                        <h1 className="text-4xl font-extrabold text-white">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{studentName}</span>!</h1>
                        <p className="mt-2 text-lg text-slate-400">Ready to conquer your goals today?</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <QuickActionCard icon={<RocketLaunchIcon />} title="Start New Test" description="Jump into a fresh mock exam." to="/mock-tests" />
                        <QuickActionCard icon={<ChartBarIcon />} title="View Performance" description="Analyze your progress and stats." to="/results" />
                        <QuickActionCard icon={<TrophyIcon />} title="Leaderboard" description="See how you rank nationally." to="/leaderboard" /> {/* New Quick Action */}
                        {/* <QuickActionCard icon={<ChatBubbleLeftRightIcon />} title="AI Tutor" description="Ask questions and clear doubts." to="/ai-tutor" /> */}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                            <ul className="space-y-4">
                                {recentActivityData.map((activity, index) => (
                                    <li key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center">
                                            <DocumentTextIcon />
                                            <span className="ml-4 font-medium text-slate-200">{activity.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-cyan-400">{activity.score}</p>
                                            <p className="text-xs text-slate-500">{activity.date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Side Column */}
                        <div className="space-y-8">
                            {/* Performance Overview */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                                <h2 className="text-xl font-bold text-white mb-4">Performance Overview</h2>
                                <div className="bg-slate-800/50 rounded-lg h-48 flex items-center justify-center">
                                    <p className="text-slate-500 text-sm">Progress chart coming soon</p>
                                </div>
                            </div>

                            {/* Weak Areas */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                                <h2 className="text-xl font-bold text-white mb-4">Focus Areas</h2>
                                <p className="text-sm text-slate-400 mb-4">AI suggests you work on these topics:</p>
                                <div className="flex flex-wrap gap-2">
                                    {weakAreasData.map((area, index) => (
                                        <span key={index} className="px-3 py-1 text-sm bg-purple-600/30 text-purple-200 border border-purple-500/50 rounded-full">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StudentDashboard;