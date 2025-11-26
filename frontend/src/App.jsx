/**
 * Main App Component
 * Router configuration for the Story Generator application
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenerateStoryPage from './pages/GenerateStoryPage';
import HistoryPage from './pages/HistoryPage';
import StoryViewPage from './pages/StoryViewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GenerateStoryPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/story/:id" element={<StoryViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
