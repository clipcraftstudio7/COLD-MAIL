import React from 'react';
import Navbar from '../components/Navbar.jsx';
import LeadsTable from '../components/LeadsTable.jsx';

function LeadsPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <LeadsTable />
      </div>
    </div>
  );
}

export default LeadsPage;

