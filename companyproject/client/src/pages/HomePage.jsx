

import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 relative"
      style={{
        backgroundImage: 'linear-gradient(to right, #E0F2F1, #FFCC80, #66BB6A)', // Saffron, White, Green
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`rounded-2xl shadow-xl p-12 max-w-lg text-center transition-colors duration-300 transform ${
          isHovered ? 'scale-95' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ backgroundColor: isHovered ? '#ebf5fe' : '#FFFFFF' }} // Background color change on hover
      >
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 uppercase">
          Login To Cast Vote
        </h1>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <Button
              gradientDuoTone="orangeToGreen"
              className="w-full text-2xl md:text-3xl hover:bg-white hover:text-[#FF9933] transition duration-300"
              style={{ backgroundColor: '#FF9933', color: 'white' }} // Saffron color for button
            >
              Login As Voter
            </Button>
          </Link>
          <Link to="/admin-login">
            <Button
              gradientDuoTone="orangeToGreen"
              className="w-full text-2xl md:text-3xl hover:bg-white hover:text-[#138808] transition duration-300"
              style={{ backgroundColor: '#138808', color: 'white' }} // Green color for button
            >
              Login As Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}




