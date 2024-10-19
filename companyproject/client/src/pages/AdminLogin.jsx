import { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/admin/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(true);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/candidates"); // Redirect to candidates list directly
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#E0F2F1] via-[#FFCC80] to-[#66BB6A]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admin Login
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="block text-gray-700 text-lg font-medium">
              Username
            </Label>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-gray-700 text-lg font-medium">
              Password
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" className="accent-[#FF9933]" />
            <Label htmlFor="remember" className="text-gray-700">
              Remember me
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF9933] text-white rounded-md py-2 hover:bg-[#FF9933]/80 transition duration-200 font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <Modal show={showModal} size="md" popup onClose={handleModalClose}>
          <ModalHeader>
            <h5 className="text-2xl font-bold leading-tight text-gray-800">
              Login Successful!
            </h5>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-700">You are now logged in as Admin.</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              color="success"
              onClick={handleModalClose}
              className="rounded-lg px-4 py-2"
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
