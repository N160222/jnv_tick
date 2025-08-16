import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreFeatures from './components/Features';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import MockTestListPage from './pages/MockTestListPage';
import TestTakingInterface from './pages/TestTakingInterface';
import TestResultsPage from './pages/TestResultsPage';
import ReviewAnswersPage from './pages/ReviewAnswersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import StudentProfilePage from './pages/StudentProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import RewardsBadgesPage from './pages/RewardsBadgesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageStudentsPage from './pages/ManageStudentsPage'; // Import new ManageStudentsPage
import StudentProfileViewPage from './pages/StudentProfileViewPage'; // Import new StudentProfileViewPage

const HomePage = () => (
  <div className="bg-slate-950 text-slate-200 font-sans antialiased">
    <Header />
    <main>
      <Hero />
      <CoreFeatures />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/mock-tests" element={<MockTestListPage />} />
        <Route path="/test-interface" element={<TestTakingInterface />} />
        <Route path="/results" element={<TestResultsPage />} />
        <Route path="/review-answers" element={<ReviewAnswersPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<StudentProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
        <Route path="/rewards-badges" element={<RewardsBadgesPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/manage-students" element={<ManageStudentsPage />} /> {/* New route for Manage Students */}
        <Route path="/admin/student-profile/:id" element={<StudentProfileViewPage />} /> {/* New route for Student Profile View */}
        {/* Admin sub-pages (placeholders for now) */}
        <Route path="/admin/manage-tests" element={<AdminDashboardPage />} />
        <Route path="/admin/results-reports" element={<AdminDashboardPage />} />
        <Route path="/admin/rewards-leaderboard" element={<AdminDashboardPage />} />
        <Route path="/forgot-password" element={
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-sans">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
                        <p className="text-slate-400">The forgot password page is under construction.</p>
                    </div>
                </div>
                <Footer />
            </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;