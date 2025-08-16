"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, Lock, Sparkles, Gift, Coins, Zap, Trophy, X, CheckCircle, Loader, Star, Target, Clock, TrendingUp, Lightbulb, Shield, Gem } from 'lucide-react';

// Mock Data
const mockBadges = [
    {
        id: 1,
        title: "First Test Conqueror",
        description: "Completed your very first mock test!",
        icon: <Award size={32} className="text-yellow-400" />,
        unlocked: true,
        progress: 100,
        criteria: "Complete 1 mock test."
    },
    {
        id: 2,
        title: "Accuracy Master",
        description: "Achieved 90%+ accuracy in 5 consecutive tests.",
        icon: <Target size={32} className="text-green-400" />,
        unlocked: false,
        progress: 60, // Mock progress
        criteria: "Achieve 90%+ accuracy in 5 consecutive mock tests."
    },
    {
        id: 3,
        title: "Speed Demon",
        description: "Completed 10 tests with an average time 20% faster than average.",
        icon: <Zap size={32} className="text-blue-400" />,
        unlocked: false,
        progress: 30,
        criteria: "Complete 10 tests with an average time 20% faster than the overall average."
    },
    {
        id: 4,
        title: "Consistent Performer",
        description: "Practiced for 7 days in a row.",
        icon: <Clock size={32} className="text-purple-400" />,
        unlocked: true,
        progress: 100,
        criteria: "Log in and complete at least one activity for 7 consecutive days."
    },
    {
        id: 5,
        title: "Knowledge Seeker",
        description: "Asked 10 questions to the AI Tutor.",
        icon: <Lightbulb size={32} className="text-orange-400" />,
        unlocked: false,
        progress: 80,
        criteria: "Ask 10 unique questions to the AI Tutor."
    },
    {
        id: 6,
        title: "Top 10 Ranker",
        description: "Achieved a rank in the top 10 on the national leaderboard.",
        icon: <Trophy size={32} className="text-cyan-400" />,
        unlocked: true,
        progress: 100,
        criteria: "Secure a position in the top 10 of the national leaderboard."
    },
    {
        id: 7,
        title: "Subject Specialist: Math",
        description: "Mastered the Math section with high scores.",
        icon: <Gem size={32} className="text-pink-400" />,
        unlocked: false,
        progress: 45,
        criteria: "Achieve an average score of 90%+ in 5 Math-specific mock tests."
    },
    {
        id: 8,
        title: "Problem Solver",
        description: "Correctly answered 50 challenging questions.",
        icon: <Shield size={32} className="text-indigo-400" />,
        unlocked: false,
        progress: 20,
        criteria: "Correctly answer 50 questions marked as 'Hard' difficulty."
    },
];

const mockRewards = [
    {
        id: 101,
        title: "Free Mock Test Credit",
        description: "Unlock one premium mock test for free!",
        icon: <Gift size={32} className="text-yellow-400" />,
        claimed: false
    },
    {
        id: 102,
        title: "500 Bonus Points",
        description: "Add 500 points to your profile for extra perks.",
        icon: <Coins size={32} className="text-green-400" />,
        claimed: false
    },
    {
        id: 103,
        title: "Leaderboard Boost (24h)",
        description: "Get a temporary boost to your leaderboard visibility.",
        icon: <TrendingUp size={32} className="text-purple-400" />,
        claimed: true
    },
];

const BadgeCard = ({ badge, onClick }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const progressColor = badge.progress > 75 ? 'bg-green-500' : badge.progress > 40 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div
            className={`group relative glass-effect rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer
                ${badge.unlocked ? 'border-cyan-500/50 hover:shadow-cyan-900/30 animate-pulse-light' : 'border-slate-800/50 grayscale hover:shadow-slate-900/30'}
                hover:scale-[1.02]
            `}
            onClick={() => onClick(badge)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className={`p-3 rounded-full inline-block mb-4 ${badge.unlocked ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white' : 'bg-slate-700/50 text-slate-400'}`}>
                {badge.unlocked ? badge.icon : <Lock size={32} />}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{badge.title}</h3>
            <p className="text-slate-400 text-sm flex-grow">{badge.description}</p>

            {!badge.unlocked && (
                <div className="w-full mt-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className={`${progressColor} h-2.5 rounded-full`} style={{ width: `${badge.progress}%` }}></div>
                    </div>
                </div>
            )}
            {showTooltip && (
                <div className="absolute bottom-full mb-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {badge.unlocked ? "Click for details" : "Locked"}
                </div>
            )}
        </div>
    );
};

const RewardCard = ({ reward, onClaim }) => {
    return (
        <div className={`glass-effect rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300
            ${reward.claimed ? 'border-slate-800/50 bg-slate-900/30 grayscale' : 'border-green-500/50 hover:shadow-green-900/30 hover:scale-[1.02]'}
        `}>
            <div className={`p-3 rounded-full inline-block mb-4 ${reward.claimed ? 'bg-slate-700/50 text-slate-400' : 'bg-gradient-to-br from-green-600 to-lime-500 text-white'}`}>
                {reward.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
            <p className="text-slate-400 text-sm flex-grow mb-4">{reward.description}</p>
            <button
                onClick={() => onClaim(reward)}
                disabled={reward.claimed}
                className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200
                    ${reward.claimed
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105'
                    }`}
            >
                {reward.claimed ? 'Claimed!' : 'Claim Reward'}
            </button>
        </div>
    );
};

const RewardsBadgesPage = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);
    const [badges, setBadges] = useState(mockBadges);
    const [rewards, setRewards] = useState(mockRewards);
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [showRewardClaimedModal, setShowRewardClaimedModal] = useState(false);
    const [claimedReward, setClaimedReward] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        // Trigger confetti for a newly unlocked badge on initial load (mock)
        const newlyUnlockedBadge = badges.find(b => b.id === 1 && b.unlocked); // Example: First Test Conqueror
        if (newlyUnlockedBadge) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
        return () => {}; // Cleanup for no confetti case
    }, []);

    const handleBadgeClick = (badge) => {
        setSelectedBadge(badge);
        setShowBadgeModal(true);
    };

    const handleClaimReward = (reward) => {
        if (!reward.claimed) {
            setRewards(prev => prev.map(r => r.id === reward.id ? { ...r, claimed: true } : r));
            setClaimedReward(reward);
            setShowRewardClaimedModal(true);
            setShowConfetti(true); // Trigger confetti on reward claim
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    };

    return (
        <div className="bg-slate-950 text-slate-200 font-sans antialiased min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-repeat" style={{ backgroundImage: 'url(/src/assets/neon-circuits.svg)', backgroundSize: '200px' }}></div>
            
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="confetti" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
                        }}></div>
                    ))}
                </div>
            )}

            {/* Holographic Illustration (Desktop Only) */}
            {isDesktop && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-0 opacity-20 animate-pulse-slow">
                    <div className="relative w-full h-full">
                        <Award size={128} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-spin-slow" style={{ animationDuration: '15s' }} />
                        <Gift size={96} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 animate-spin-reverse-slow" style={{ animationDuration: '10s' }} />
                    </div>
                </div>
            )}

            <Header />

            <main className="flex-grow flex relative z-10 py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl animate-fade-in-up">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white relative inline-block">
                                🎖️ Rewards & Badges
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse-slow"></span>
                            </h1>
                            <p className="mt-2 text-lg text-slate-400">Celebrate your achievements and unlock new milestones.</p>
                        </div>

                        {/* Badges Display */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Sparkles size={24} className="mr-3 text-cyan-400" /> Your Badges</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {badges.map(badge => (
                                    <BadgeCard key={badge.id} badge={badge} onClick={handleBadgeClick} />
                                ))}
                            </div>
                        </div>

                        {/* Rewards Section */}
                        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center"><Gift size={24} className="mr-3 text-purple-400" /> Your Rewards</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rewards.map(reward => (
                                    <RewardCard key={reward.id} reward={reward} onClaim={handleClaimReward} />
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                to="/leaderboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
                            >
                                Back to Leaderboard
                            </Link>
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer minimal="Your efforts are always rewarded! ✨" />

            {/* Badge Detail Modal */}
            {showBadgeModal && selectedBadge && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center shadow-xl animate-scale-in max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">{selectedBadge.title}</h3>
                            <button onClick={() => setShowBadgeModal(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 rounded-full inline-block mb-4 bg-slate-700/50">
                            {selectedBadge.unlocked ? selectedBadge.icon : <Lock size={48} className="text-slate-400" />}
                        </div>
                        <p className="text-slate-300 mb-4">{selectedBadge.description}</p>
                        <p className="text-slate-400 text-sm mb-6">
                            {selectedBadge.unlocked ? `Earned by: ${selectedBadge.criteria}` : `To unlock: ${selectedBadge.criteria}`}
                        </p>
                        <button
                            onClick={() => setShowBadgeModal(false)}
                            className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}

            {/* Reward Claimed Modal */}
            {showRewardClaimedModal && claimedReward && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center shadow-xl animate-scale-in max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">Reward Claimed!</h3>
                            <button onClick={() => setShowRewardClaimedModal(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 rounded-full inline-block mb-4 bg-gradient-to-br from-green-600 to-lime-500 text-white">
                            {claimedReward.icon}
                        </div>
                        <p className="text-slate-300 mb-4">You have successfully claimed:</p>
                        <p className="text-xl font-bold text-yellow-400 mb-6">{claimedReward.title}</p>
                        <button
                            onClick={() => setShowRewardClaimedModal(false)}
                            className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
                        >
                            Awesome!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RewardsBadgesPage;