// /sections/Navbar.jsx
import { useState } from 'react';

const Navbar = ({ currentSection, setCurrentSection }) => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <div>
        <button
          className={`px-4 py-2 ${currentSection === 'create' ? 'bg-blue-500' : 'bg-gray-700'} rounded`}
          onClick={() => setCurrentSection('create')}
        >
          Create Website
        </button>
        <button
          className={`px-4 py-2 ml-2 ${currentSection === 'dashboard' ? 'bg-blue-500' : 'bg-gray-700'} rounded`}
          onClick={() => setCurrentSection('dashboard')}
        >
          Your Websites
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
