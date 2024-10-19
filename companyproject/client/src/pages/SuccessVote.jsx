

import React from "react";
import { NavLink } from "react-router-dom";

export const SuccessVote = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FF9933] to-[#138808] p-4">
      <img
        src="https://img.icons8.com/ios-filled/100/FFFFFF/checkmark.png" // White icon for better contrast
        alt="Success Icon"
        className="mb-4"
      />
      <h1 className="text-4xl font-bold text-white text-center">Vote Successful!</h1>
      <p className="mt-4 text-lg text-white text-center">Thank you for participating in the election!</p>
      <NavLink to="/voter-dashboard" className="mt-6">
        <div className="bg-[#FF9933] text-white px-4 py-2 rounded hover:bg-[#FF9933]/80 transition duration-200 text-center">
          Go Back to Dashboard
        </div>
      </NavLink>
    </div>
  );
};
