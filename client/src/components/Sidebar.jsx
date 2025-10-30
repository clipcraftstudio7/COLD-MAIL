import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const link = ({ isActive }) => `block px-3 py-2 rounded ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`;
  return (
    <aside className="w-56 shrink-0 p-4 border border-white/10 rounded-xl h-fit">
      <nav className="space-y-1">
        <NavLink to="/" className={link}>Dashboard</NavLink>
        <NavLink to="/leads" className={link}>Leads</NavLink>
        <NavLink to="/templates" className={link}>Templates</NavLink>
        <NavLink to="/campaigns" className={link}>Campaigns</NavLink>
        <NavLink to="/analytics" className={link}>Analytics</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;

