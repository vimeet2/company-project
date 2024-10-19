

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
