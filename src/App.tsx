import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Homepage from './components/Homepage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import SmartSharing from './components/SmartSharing';
import Privacy from './pages/settings/Privacy';
import './App.css';
import './components.css';

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/sharing" element={<SmartSharing />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
