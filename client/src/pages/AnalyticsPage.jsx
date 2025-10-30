import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Analytics from '../components/Analytics.jsx';

function AnalyticsPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Analytics />
      </div>
    </div>
  );
}

export default AnalyticsPage;

