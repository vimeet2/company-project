import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/Terms&ConditionsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminSideBar from "./components/admin/AdminSidebar";
import VoterDashboard from "./components/voter/VoterDashboard";
import Candidates from "./Candidates";
import { SuccessVote } from "./pages/SuccessVote"; // Import the SuccessVote component

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminSideBar />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/voter-dashboard" element={<VoterDashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/success-vote" element={<SuccessVote />} /> {/* Add the SuccessVote route */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
