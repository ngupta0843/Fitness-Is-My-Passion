import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// function imports
import LandingPage from "./pages/landing";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import UserProfile from "./pages/profile.jsx";
import AuthButtons from "./components/AuthButtons";
import QA from "./pages/QA";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthButtons />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/fitness-planner" element={<QA/>} />
      </Routes>
    </Router>
  );
}

export default App;
