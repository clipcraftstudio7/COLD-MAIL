import React from 'react';
import Navbar from '../components/Navbar.jsx';
import EmailTemplates from '../components/EmailTemplates.jsx';

function TemplatesPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <EmailTemplates />
      </div>
    </div>
  );
}

export default TemplatesPage;

