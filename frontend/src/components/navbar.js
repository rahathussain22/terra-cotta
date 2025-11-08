import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Company Name on the Left */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            TerraCotta
          </Link>
        </div>

        {/* Navigation Links on the Right */}
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
