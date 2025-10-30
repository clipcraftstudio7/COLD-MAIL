import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Campaigns from '../components/Campaigns.jsx';

function CampaignsPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <Campaigns />
      </div>
    </div>
  );
}

export default CampaignsPage;

