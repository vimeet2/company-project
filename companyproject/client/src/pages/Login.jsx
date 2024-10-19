// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     identifier: "", 
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/voter/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data= await response.json();
//         setShowModal(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/voter-dashboard"); 
//   };

//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="text-center">
//         <h1 className="font-medium italic text-4xl mb-10">LOGIN</h1>
//         <form
//           onSubmit={handleLogin}
//           className="flex max-w-md flex-col gap-4 mt-4 w-80"
//         >
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="Identifier" value="Aadhar No or Voter ID" />
//             </div>
//             <TextInput
//               id="identifier"
//               type="text"
//               placeholder="Enter your Aadhar No or Voter ID"
//               value={formData.identifier}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password" value="Password" />
//             </div>
//             <TextInput
//               id="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button
//             type="submit"
//           >
//            submit
//           </Button>
//         </form>
//         <div className="flex flex-row justify-center mt-4">
//           <h1>Not Signed In...?</h1>
//           <div className="text-blue-400">
//             <Link to="/sign-up">Click here</Link>
//           </div>
//         </div>

//         {/* Modal for successful login */}
//         <Modal show={showModal} size="md" popup onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div className="">
//               <h3 className="mb-5 text-2xl font-semibold">Login successful!</h3>
//               <div>
//                 <Button
//                   onClick={handleModalClose}
//                 >
//                   OK
//                 </Button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }



// new(Main)
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/voter/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log("DAAA", data?.user?.voterID);
//         localStorage.setItem("aadharNo" , data?.user?.aadharNo);
//         // console.log(data.user.voted);
//         localStorage.setItem("isVoted" , data?.user?.voted + "");
//         localStorage.setItem("voterId", data?.user?.voterID);
//         setShowModal(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/voter-dashboard");
//   };

//   return (
//     <div
//       className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700"
//     >
//       <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Login to Your Account
//         </h1>
//         <form onSubmit={handleLogin} className="flex flex-col gap-6">
//           {/* Username/ID Input */}
//           <div className="relative">
//             <Label
//               htmlFor="identifier"
//               className="text-gray-700 font-semibold block mb-2"
//             >
//               Aadhar No or Voter ID
//             </Label>
//             <TextInput
//               id="identifier"
//               type="text"
//               placeholder="Enter your Aadhar No or Voter ID"
//               value={formData.identifier}
//               onChange={handleChange}
//               required
//               className="input w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <span className="absolute inset-y-0 right-0 flex items-center px-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-400"
//                 viewBox="0 0 0 0"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5 9V7a5 5 0 0110 0v2H7a3 3 0 00-3 3v2a5 5 0 01-10 0V9H5zm0-3a3 3 0 013 3v2H8a5 5 0 01-10 0V6H5zm10 6V8a5 5 0 00-10 0v2H15a3 3 0 003 3v2a5 5 0 0010 0V12H15zm0-3a3 3 0 00-3 3v2H12a5 5 0 00-10 0V9H15zm0 6a5 5 0 0010 0V15a3 3 0 003-3v-2H15z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Label htmlFor="password" className="text-gray-700 font-semibold block mb-2">
//               Password
//             </Label>
//             <TextInput
//               id="password"
//               type="password"
//               required
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <span className="absolute inset-y-0 right-0 flex items-center px-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-400"
//                 viewBox="0 0 0 0"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8a1 1 0 00-2 0v2a1 1 0 002 0V10zm-4 0a1 1 0 00-2 0v2a1 1 0 002 0V10zm4 4a1 1 0 00-2 0v2a1 1 0 002 0V14zm0-4a1 1 0 00-2 0v2a1 1 0 002 0V10z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </div>

//           {/* Remember Me Checkbox */}
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember" className="text-gray-600">
//               Remember me
//             </Label>
//           </div>

//           {/* Login Button */}
//           <Button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         <div className="flex flex-row justify-center mt-6">
//           <span className="text-gray-600">Not signed in yet?</span>
//           <Link to="/sign-up" className="text-indigo-500 hover:underline ml-1">
//             Sign Up
//           </Link>
//         </div>

//         {/* Modal for successful login */}
//         <Modal show={showModal} size="md" popup onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div>
//               <h3 className="mb-5 text-2xl font-semibold text-indigo-600">
//                 Login successful!
//               </h3>
//               <div>
//                 <Button
//                   onClick={handleModalClose}
//                   className="bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   OK
//                 </Button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }





//new Vim #E0F2F1, #FFCC80, #66BB6A

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/voter/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("aadharNo", data?.user?.aadharNo);
        localStorage.setItem("isVoted", data?.user?.voted + "");
        localStorage.setItem("voterId", data?.user?.voterID);
        setShowModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/voter-dashboard");
  };

 

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#E0F2F1] via-[#FFCC80] to-[#66BB6A]">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full transform transition-transform duration-300 ease-in-out hover:scale-95">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Aadhar No or Voter ID Input */}
          <div className="relative">
            <Label htmlFor="identifier" className="text-gray-700 font-semibold block mb-2">
              Aadhar No or Voter ID
            </Label>
            <TextInput
              id="identifier"
              type="text"
              placeholder="Enter your Aadhar No or Voter ID"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="input w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Label htmlFor="password" className="text-gray-700 font-semibold block mb-2">
              Password
            </Label>
            <TextInput
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition duration-200"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-gray-600">
              Remember me
            </Label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-[#FF9933] hover:bg-[#FF9933]/80 text-white font-semibold py-2 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex flex-row justify-center mt-4">
          <span className="text-gray-600">Not signed in yet?</span>
          <Link to="/sign-up" className="text-[#FF9933] hover:underline ml-1">
            Sign Up
          </Link>
        </div>

        {/* Modal for successful login */}
        <Modal show={showModal} size="md" popup onClose={handleModalClose}>
          <Modal.Header />
          <Modal.Body>
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-[#FF9933]">
                Login successful!
              </h3>
              <div>
                <Button
                  onClick={handleModalClose}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  OK
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}




//new Akhil



// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Button, Checkbox, Label, TextInput, Modal } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/voter/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("aadharNo", data?.user?.aadharNo);
//         localStorage.setItem("isVoted", data?.user?.voted + "");
//         localStorage.setItem("voterId", data?.user?.voterID);
//         setShowModal(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/voter-dashboard");
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[rgb(0,198,255)] to-[rgb(0,114,255)]">
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full transform transition-transform duration-300 ease-in-out hover:scale-95">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Login to Your Account
//         </h1>
//         <form onSubmit={handleLogin} className="flex flex-col gap-6">
//           {/* Aadhar No or Voter ID Input */}
//           <div className="relative">
//             <Label htmlFor="identifier" className="text-gray-700 font-semibold block mb-2">
//               Aadhar No or Voter ID
//             </Label>
//             <TextInput
//               id="identifier"
//               type="text"
//               placeholder="Enter your Aadhar No or Voter ID"
//               value={formData.identifier}
//               onChange={handleChange}
//               required
//               className="input w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(0,198,255)] transition duration-200"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Label htmlFor="password" className="text-gray-700 font-semibold block mb-2">
//               Password
//             </Label>
//             <TextInput
//               id="password"
//               type="password"
//               required
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(0,198,255)] transition duration-200"
//             />
//           </div>

//           {/* Remember Me Checkbox */}
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember" className="text-gray-600">
//               Remember me
//             </Label>
//           </div>

//           {/* Login Button */}
//           <Button
//             type="submit"
//             className="w-full bg-[rgb(0,198,255)] hover:bg-[rgb(0,114,255)] text-white font-semibold py-2 rounded-lg transition duration-200"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         <div className="flex flex-row justify-center mt-4">
//           <span className="text-gray-600">Not signed in yet?</span>
//           <Link to="/sign-up" className="text-[rgb(0,198,255)] hover:underline ml-1">
//             Sign Up
//           </Link>
//         </div>

//         {/* Modal for successful login */}
//         <Modal show={showModal} size="md" popup onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div>
//               <h3 className="mb-5 text-2xl font-semibold text-[rgb(0,198,255)]">
//                 Login successful!
//               </h3>
//               <div>
//                 <Button
//                   onClick={handleModalClose}
//                   className="bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   OK
//                 </Button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }
