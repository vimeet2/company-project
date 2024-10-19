// import { Navbar } from "flowbite-react";
// import { Link, NavLink } from "react-router-dom";

// export default function Header() {

//   return (
//     <Navbar className="border-b-8 p-4 border-teal-500 bg-slate-200">
//       <Link to="/" className="sm:text-xl font-semibold">
//        <span>voting system</span>
//       </Link>
//       <NavLink
//         to="/about"
//         className={({ isActive }) =>
//           `${
//             isActive ? "text-blue-700 text-lg" : ""
//           } text-lg mr-5 hidden lg:block hover:underline`
//         }
//       >
//         About
//       </NavLink>
//     </Navbar>
//   );
// }




// new Vim   #0000ff, #7b68ee, #800080




import { Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className="p-4 bg-gradient-to-r from-[#205444] via-[#205444] to-[#205444]">
      <Link 
        to="/" 
        className="text-2xl font-bold text-white hover:text-[#003366] transition duration-300" // Dark blue
      >
        <span>Voting System</span>
      </Link>

      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#003366] transition duration-300 focus:outline-none" // Dark blue
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div className={`flex-col lg:flex lg:flex-row lg:items-center ${isOpen ? 'flex' : 'hidden'} lg:flex`}>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "text-[#FF9933] font-bold" : "text-white font-bold"} text-lg mr-5 hover:text-[#003366] transition duration-300` // Dark blue
          }
        >
          About
        </NavLink>
        {/* Add more links here if needed */}
      </div>
    </Navbar>
  );
}





// new Akhil

// import { Navbar } from "flowbite-react";
// import { Link, NavLink } from "react-router-dom";
// import { useState } from "react";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <Navbar className="p-4 bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">
//       <Link 
//         to="/" 
//         className="text-2xl font-bold text-white hover:text-black transition duration-300" // White by default, black on hover
//       >
//         <span>APNAMAT</span>
//       </Link>

//       <div className="flex items-center justify-between lg:hidden">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-white hover:text-black transition duration-300 focus:outline-none" // White by default, black on hover
//         >
//           {/* Hamburger Icon */}
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//       </div>

//       <div className={`flex-col lg:flex lg:flex-row lg:items-center ${isOpen ? 'flex' : 'hidden'} lg:flex`}>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `${isActive ? "text-[#FF9933] font-bold" : "text-white font-bold"} text-lg mr-5 hover:text-black transition duration-300` // White by default, black on hover
//           }
//         >
//           ABOUT
//         </NavLink>
//         {/* Add more links here if needed */}
//       </div>
//     </Navbar>
//   );
// }



