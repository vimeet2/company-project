// import React from 'react';
// import {NavLink} from 'react-router-dom'
// export const SuccessVote = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
//         <h1 className="text-3xl font-bold text-blue-600 mb-4">Vote Successful!</h1>
//         <p className="text-gray-700 mb-6">
//           Thank you for participating in the democratic process. Your vote has been successfully recorded.
//         </p>
//         <img
//           src="https://img.icons8.com/ios-filled/100/4CAF50/checkmark.png" // You can replace this URL with any success icon
//           alt="Success Icon"
//           className="mb-4 align-items-center"
//         />
//         <NavLink to="/login"><button
//           onClick={() => window.location.reload()} // Or redirect to another page
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
//         >
//           Return to Dashboard
//         </button></NavLink>
//       </div>
//     </div>
//   );
//};



//new(Main)
// import React from "react";
// import { NavLink } from "react-router-dom";

// export const SuccessVote = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//       <img
//         src="https://img.icons8.com/ios-filled/100/4CAF50/checkmark.png" // You can replace this URL with any success icon
//         alt="Success Icon"
//         className="mb-4" // Removed align-items-center since it is not a valid class
//       />
//       <h1 className="text-4xl font-bold text-green-600">Vote Successful!</h1>
//       <p className="mt-4 text-lg text-gray-700">Thank you for participating in the election!</p>
//       <NavLink to="/login">
//         <div className="mt-6">
//             <a href="/voter-dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
//             Go Back to Dashboard
//             </a>
//       </div>
//       </NavLink>
//     </div>
//   );
// };





//new Vim



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




// new Akhil




// import React from "react";
// import { NavLink } from "react-router-dom";

// export const SuccessVote = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[rgb(0,198,255)] to-[rgb(0,114,255)] p-4">
//       <img
//         src="https://img.icons8.com/ios-filled/100/FFFFFF/checkmark.png" // White icon for better contrast
//         alt="Success Icon"
//         className="mb-4"
//       />
//       <h1 className="text-4xl font-bold text-white text-center">Vote Successful!</h1>
//       <p className="mt-4 text-lg text-white text-center">Thank you for participating in the election!</p>
//       <NavLink to="/voter-dashboard" className="mt-6">
//         <div className="bg-[rgb(0,198,255)] text-white px-4 py-2 rounded hover:bg-[rgb(0,114,255)] transition duration-200 text-center">
//           Go Back to Dashboard
//         </div>
//       </NavLink>
//     </div>
//   );
// };
