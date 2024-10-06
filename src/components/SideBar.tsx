import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 w-64 min-h-screen p-4 shadow-lg flex flex-col">
      <h2 className="text-lg font-bold mb-4">Demo Ecommerce</h2>
      <ul className="flex flex-col flex-grow space-y-2">
        {/* Company Info Links */}
        <div>
          <li className="text-gray-700 hover:text-blue-500">Home</li>
          <li className="text-gray-700 hover:text-blue-500">Shop</li>
          <li className="text-gray-700 hover:text-blue-500">About Us</li>
          <li className="text-gray-700 hover:text-blue-500">Contact Us</li>
        </div>
      </ul>

      {/* Other Links at the Bottom */}
      <ul className="mt-4 space-y-2">
        <li className="text-gray-700 hover:text-blue-500">Terms of Service</li>
        <li className="text-gray-700 hover:text-blue-500">Privacy Policy</li>
        <li className="text-gray-700 hover:text-blue-500">Returns & Refunds</li>
        <li className="text-gray-700 hover:text-blue-500">FAQ</li>
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-300 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 Demo Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
