import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Journal from './pages/Journal';
import Goals from './pages/Goals';
import Activities from './pages/Activities';
import Settings from './pages/Settings';
import Mindfulness from './pages/Mindfulness';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}