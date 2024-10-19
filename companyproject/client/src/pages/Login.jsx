
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



