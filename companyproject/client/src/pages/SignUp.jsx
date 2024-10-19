// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Select,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     phoneNo: "",
//     aadharNo: "",
//     password: "",
//     nationality: "",
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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "/api/v1/voter/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         setShowModal(true); 
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/login"); 
//   };

//   return (
//     <div className="flex p-6 mt-4 mb-4 items-center justify-center">
//       <div className="text-center">
//         <h1 className="font-medium italic text-4xl mb-10">SIGN UP</h1>
//         <form
//           onSubmit={handleSignup}
//           className="flex max-w-md flex-col gap-4 mt-4 w-80"
//         >
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="name" value="Name" />
//             </div>
//             <TextInput
//               id="name"
//               type="text"
//               placeholder="Your name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="dob" value="Date of Birth" />
//             </div>
//             <TextInput
//               id="dob"
//               type="date"
//               required
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="phoneNo" value="Phone Number" />
//             </div>
//             <TextInput
//               id="phoneNo"
//               type="tel"
//               placeholder="Your phone number"
//               required
//               value={formData.phoneNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="aadharNo" value="Aadhar Number" />
//             </div>
//             <TextInput
//               id="aadharNo"
//               type="text"
//               placeholder="Your Aadhar number"
//               required
//               value={formData.aadharNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password" value="Password" />
//             </div>
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="Your password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="nationality" value="Nationality" />
//             </div>
//             <Select
//               id="nationality"
//               required
//               value={formData.nationality}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select your nationality
//               </option>
//               <option value="Indian">Indian</option>
//               {/* <option value="American">American</option>
//               <option value="British">British</option> */}
//             </Select>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button
//             gradientDuoTone="purpleToPink"
//             type="submit"
//           >
//            Sign up
//           </Button>
//         </form>
//         <div className="flex flex-row justify-center mt-4">
//           <h1>Have an account...? </h1>
//           <div >
//             <Link to="/login" className="text-indigo-500 hover:underline ml-1">Click here</Link>
//           </div>
//         </div>

//         <Modal show={showModal} onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div >
//               <h3>
//                 Sign up successful!
//               </h3>
//               <div className="justify-center flex">
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

//new code 
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Select,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../pages/setup"; // Adjust the path if needed

// export default function Login() {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     phoneNo: "",
//     aadharNo: "",
//     password: "",
//     nationality: "",
//   });
 
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const [otp,setOtp]=useState("");
//   const[user,setUser]=useState(null)
//   const[phone,setPhone]=useState('')

//   const sendOtp = async()=> {
//     try {
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
//       console.log(confirmation);

//     } catch (err) {
//       console.log(err);

//     }
//   }
//   const verifyOtp=async()=>{
//     try {
//       await user.confirm(otp)
      
//     } catch (error) {
//       console.log(err);
      
      
//     }
//   }

//   function handleChange(e) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value,
//       });
//     }

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "/api/v1/voter/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         setShowModal(true); 
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/login"); 
//   };

//   return (
//     <div className="flex p-6 mt-4 mb-4 items-center justify-center">
//       <div className="text-center">
//         <h1 className="font-medium italic text-4xl mb-10">SIGN UP</h1>
//         <form
//           onSubmit={handleSignup}
//           className="flex max-w-md flex-col gap-4 mt-4 w-80"
//         >
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="name" value="Name" />
//             </div>
//             <TextInput
//               id="name"
//               type="text"
//               placeholder="Your name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="dob" value="Date of Birth" />
//             </div>
//             <TextInput
//               id="dob"
//               type="date"
//               required
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
         
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="aadharNo" value="Aadhar Number" />
//             </div>
//             <TextInput
//               id="aadharNo"
//               type="text"
//               placeholder="Your Aadhar number"
//               required
//               value={formData.aadharNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//              <div className="mb-2 block">
//               <Label htmlFor="phoneNo" value="Phone Number" />
//              </div>
//              <PhoneInput
//               country={'us'}
//               value={phone}
//               onChange={(phone)=>setPhone("+"+phone)}
//               placeholder="Your phone number"
//               required
//               className="border rounded-md"
//             />
//           </div>

//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password" value="Password" />
//             </div>
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="Your password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="nationality" value="Nationality" />
//             </div>
//             <Select
//               id="nationality"
//               required
//               value={formData.nationality}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select your nationality
//               </option>
//               <option value="Indian">Indian</option>
//               {/* <option value="American">American</option>
//               <option value="British">British</option> */}
//             </Select>
//           </div>
//           <Button
//             gradientDuoTone="purpleToPink"
//             onClick={sendOtp}
//             // disabled={loading || !formData.phoneNo} // Disable if loading or no phone number
//           >
//             Send OTP
//           </Button>
//           <div className="mt-4">
//             <div id="recaptcha"></div>
//             <div className="mb-2 block">
//               <Label htmlFor="otp" value="Enter OTP" />
//             </div>
//             <TextInput
//               id="otp"
//               type="text"
//               placeholder="Enter OTP"
//               required
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <Button gradientDuoTone="purpleToPink" onClick={verifyOtp}>
//               Verify OTP
//             </Button>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button
//             gradientDuoTone="purpleToPink"
//             type="submit"
//           >
//            Sign up
//           </Button>
//         </form>
//         <div className="flex flex-row justify-center mt-4">
//           <h1>Have an account...? </h1>
//           <div >
//             <Link to="/login" className="text-indigo-500 hover:underline ml-1">Click here</Link>
//           </div>
//         </div>

//         <Modal show={showModal} onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div >
//               <h3>
//                 Sign up successful!
//               </h3>
//               <div className="justify-center flex">
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
//end code
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Select,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     phoneNo: "",
//     aadharNo: "",
//     password: "",
//     nationality: "",
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

//   const handlePhoneChange = (phone) => {
//     setFormData({
//       ...formData,
//       phoneNo: phone,
//     });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "/api/v1/voter/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         setShowModal(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/login");
//   };

//   return (
//     <div className="flex p-6 mt-4 mb-4 items-center justify-center">
//       <div className="text-center">
//         <h1 className="font-medium italic text-4xl mb-10">SIGN UP</h1>
//         <form
//           onSubmit={handleSignup}
//           className="flex max-w-md flex-col gap-4 mt-4 w-80"
//         >
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="name" value="Name" />
//             </div>
//             <TextInput
//               id="name"
//               type="text"
//               placeholder="Your name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="dob" value="Date of Birth" />
//             </div>
//             <TextInput
//               id="dob"
//               type="date"
//               required
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
          // <div>
          //    <div className="mb-2 block">
          //     <Label htmlFor="phoneNo" value="Phone Number" />
          //    </div>
          //    <PhoneInput
          //     country={'us'}
          //     value={formData.phoneNo}
          //     onChange={handlePhoneChange}
          //     placeholder="Your phone number"
          //     required
          //     className="border rounded-md"
          //   />
          // </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="aadharNo" value="Aadhar Number" />
//             </div>
//             <TextInput
//               id="aadharNo"
//               type="text"
//               placeholder="Your Aadhar number"
//               required
//               value={formData.aadharNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password" value="Password" />
//             </div>
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="Your password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="nationality" value="Nationality" />
//             </div>
//             <Select
//               id="nationality"
//               required
//               value={formData.nationality}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select your nationality
//               </option>
//               <option value="Indian">Indian</option>
//               {/* <option value="American">American</option>
//               <option value="British">British</option> */}
//             </Select>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button
//             gradientDuoTone="purpleToPink"
//             type="submit"
//             disabled={loading}
//           >
//             Sign up
//           </Button>
//         </form>
//         <div className="flex flex-row justify-center mt-4">
//           <h1>Have an account...? </h1>
//           <div>
//             <Link to="/login" className="text-indigo-500 hover:underline ml-1">Click here</Link>
//           </div>
//         </div>

//         <Modal show={showModal} onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div>
//               <h3>Sign up successful!</h3>
//               <div className="justify-center flex">
//                 <Button onClick={handleModalClose}>
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


// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Checkbox,
//   Label,
//   TextInput,
//   Select,
//   Modal,
// } from "flowbite-react";
// import { Link } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../pages/setup"; // Adjust the path if needed

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     phoneNo: "",
//     aadharNo: "",
//     password: "",
//     nationality: "",
//   });

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showOtpSection, setShowOtpSection] = useState(false);
//   const navigate = useNavigate();
//   // const recaptchaVerifierRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handlePhoneChange = (phone) => {
//     setFormData({
//       ...formData,
//       phoneNo: phone,
//     });
//   };

  // const sendOtp = async()=> {
  //   try {
  //     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
  //     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
  //     console.log(confirmation);

  //   } catch (err) {
  //     console.log(err);

  //   }


//   }

//   // function verifyOtp=async()=>{
//   //   try{ await user.confirm(otp)
//   //       .then((result) => {
//   //         // User successfully signed in
//   //         // setShowModal(true);
//   //         console.log("User signed in successfully:", result.user);
//   //       })}
   
//   //       .catch((error) => {
//   //         console.error("Error verifying OTP:", error);
//   //         alert("Invalid OTP. Please try again.");
//   //       });
//   //   }
//   // }

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/voter/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // After signup, show OTP section
//         setShowOtpSection(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/login");
//   };

//   return (
//     <div className="flex p-6 mt-4 mb-4 items-center justify-center">
//       <div className="text-center">
//         <h1 className="font-medium italic text-4xl mb-10">SIGN UP</h1>
//         <form
//           onSubmit={handleSignup}
//           className="flex max-w-md flex-col gap-4 mt-4 w-80"
//         >
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="name" value="Name" />
//             </div>
//             <TextInput
//               id="name"
//               type="text"
//               placeholder="Your name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="dob" value="Date of Birth" />
//             </div>
//             <TextInput
//               id="dob"
//               type="date"
//               required
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="phoneNo" value="Phone Number" />
//             </div>
//             <PhoneInput
//               country={"us"}
//               value={formData.phoneNo}
//               onChange={handlePhoneChange}
//               placeholder="Your phone number"
//               required
//               className="border rounded-md"
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="aadharNo" value="Aadhar Number" />
//             </div>
//             <TextInput
//               id="aadharNo"
//               type="text"
//               placeholder="Your Aadhar number"
//               required
//               value={formData.aadharNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password" value="Password" />
//             </div>
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="Your password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="nationality" value="Nationality" />
//             </div>
//             <Select
//               id="nationality"
//               required
//               value={formData.nationality}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select your nationality
//               </option>
//               <option value="Indian">Indian</option>
//             </Select>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
//             Sign up
//           </Button>

//           {/* Send OTP Button */}
          // <Button
          //   gradientDuoTone="purpleToPink"
          //   onClick={sendOtp}
          //   disabled={loading || !formData.phoneNo} // Disable if loading or no phone number
          // >
          //   Send OTP
          // </Button>
//         </form>

//         {/* OTP Section */}
//         {showOtpSection && (
          // <div className="mt-4">
          //   <div id="recaptcha"></div>
          //   <div className="mb-2 block">
          //     <Label htmlFor="otp" value="Enter OTP" />
          //   </div>
          //   <TextInput
          //     id="otp"
          //     type="text"
          //     placeholder="Enter OTP"
          //     required
          //     value={otp}
          //     onChange={(e) => setOtp(e.target.value)}
          //   />
          //   <Button gradientDuoTone="purpleToPink" onClick={verifyOtp}>
          //     Verify OTP
          //   </Button>
          // </div>
//         )}

//         <div className="flex flex-row justify-center mt-4">
//           <h1>Have an account...? </h1>
//           <div>
//             <Link to="/login" className="text-indigo-500 hover:underline ml-1">
//               Click here
//             </Link>
//           </div>
//         </div>

//         <Modal show={showModal} onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div>
//               <h3>Sign up successful!</h3>
//               <div className="justify-center flex">
//                 <Button onClick={handleModalClose}>OK</Button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }




//new Vim



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput, Select, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phoneNo: "",
    aadharNo: "",
    password: "",
    nationality: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/voter/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="flex p-6 items-center justify-center min-h-screen bg-gradient-to-r from-[#E0F2F1] via-[#FFCC80] to-[#66BB6A]">
     <div className="text-center bg-white rounded-lg shadow-lg p-8 md:p-12 w-[40%] transform transition-transform duration-300 hover:scale-105">

        <h1 className="font-medium italic text-4xl mb-10 text-[#FF9933]">SIGN UP</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="dob" value="Date of Birth" />
            <TextInput
              id="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phoneNo" value="Phone Number" />
            <TextInput
              id="phoneNo"
              type="tel"
              placeholder="Your phone number"
              required
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="aadharNo" value="Aadhar Number" />
            <TextInput
              id="aadharNo"
              type="text"
              placeholder="Your Aadhar number"
              required
              value={formData.aadharNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="nationality" value="Nationality" />
            <Select
              id="nationality"
              required
              value={formData.nationality}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your nationality
              </option>
              <option value="Indian">Indian</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="bg-[#FF9933] text-white font-semibold py-2 rounded-lg hover:bg-[#FF9933]/80 transition duration-200"
          >
            Sign up
          </Button>
        </form>
        <div className="flex flex-row justify-center mt-4">
          <h1>Have an account...?</h1>
          <div>
            <Link to="/login" className="text-[#FF9933] hover:underline">Click here</Link>
          </div>
        </div>

        <Modal show={showModal} onClose={handleModalClose}>
          <Modal.Header />
          <Modal.Body>
            <div>
              <h3 className="text-[#FF9933]">Sign up successful!</h3>
              <div className="justify-center flex">
                <Button onClick={handleModalClose} className="bg-green-600 hover:bg-green-700 text-white">
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








// new Akhil




// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button, Checkbox, Label, TextInput, Select, Modal } from "flowbite-react";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     phoneNo: "",
//     aadharNo: "",
//     password: "",
//     nationality: "",
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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/voter/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setShowModal(true);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate("/login");
//   };

//   return (
//     <div className="flex p-6 items-center justify-center min-h-screen bg-gradient-to-r from-[rgb(0,198,255)] to-[rgb(0,114,255)]">
//       <div className="text-center bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-2xl transform transition-transform duration-300 hover:scale-105">
//         <h1 className="font-medium italic text-4xl mb-10 text-[rgb(0,198,255)]">SIGN UP</h1>
//         <form onSubmit={handleSignup} className="flex flex-col gap-4">
//           <div>
//             <Label htmlFor="name" value="Name" />
//             <TextInput
//               id="name"
//               type="text"
//               placeholder="Your name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="dob" value="Date of Birth" />
//             <TextInput
//               id="dob"
//               type="date"
//               required
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="phoneNo" value="Phone Number" />
//             <TextInput
//               id="phoneNo"
//               type="tel"
//               placeholder="Your phone number"
//               required
//               value={formData.phoneNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="aadharNo" value="Aadhar Number" />
//             <TextInput
//               id="aadharNo"
//               type="text"
//               placeholder="Your Aadhar number"
//               required
//               value={formData.aadharNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="password" value="Password" />
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="Your password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="nationality" value="Nationality" />
//             <Select
//               id="nationality"
//               required
//               value={formData.nationality}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Select your nationality
//               </option>
//               <option value="Indian">Indian</option>
//               <option value="American">American</option>
//               <option value="British">British</option>
//             </Select>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div>
//           <Button
//             type="submit"
//             className="bg-[rgb(0,198,255)] text-white font-semibold py-2 rounded-lg hover:bg-[rgb(0,114,255)] transition duration-200"
//           >
//             Sign up
//           </Button>
//         </form>
//         <div className="flex flex-row justify-center mt-4">
//           <h1>Have an account...?</h1>
//           <div>
//             <Link to="/login" className="text-[rgb(0,198,255)] hover:underline">Click here</Link>
//           </div>
//         </div>

//         <Modal show={showModal} onClose={handleModalClose}>
//           <Modal.Header />
//           <Modal.Body>
//             <div>
//               <h3 className="text-[rgb(0,198,255)]">Sign up successful!</h3>
//               <div className="justify-center flex">
//                 <Button onClick={handleModalClose} className="bg-green-600 hover:bg-green-700 text-white">
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
