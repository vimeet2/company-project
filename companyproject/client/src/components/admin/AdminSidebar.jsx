

import { Sidebar } from "flowbite-react";
import { FaPeopleRoof } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

export default function AdminSidebar() {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, session, etc.)
    navigate("/"); // Navigate to HomePage after logout
  };

  return (
    <div>
      <Sidebar>
        <Sidebar.Items>
          <div className="flex">
            <h1 className="font-semibold ml-3">Options</h1>
          </div>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to="/candidates"
              icon={FaPeopleRoof}
              active={location.pathname === "/candidates"} // Highlight when active
            >
              <div>Elections</div>
            </Sidebar.Item>
            {/* Add hover classes to the Logout button */}
            <Sidebar.Item
              onClick={handleLogout}
              className="cursor-pointer hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200" // Custom hover effect
            >
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
