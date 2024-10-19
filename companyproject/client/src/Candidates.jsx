// new(Main)
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./components/admin/AdminSidebar";
// import { Table, Modal, Button, Label, TextInput } from "flowbite-react";

// export default function Candidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editCandidate, setEditCandidate] = useState(null);
//   const [updatedDetails, setUpdatedDetails] = useState({
//     name: "",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [newCandidateDetails, setNewCandidateDetails] = useState({
//     name: "",
//     dob: "",
//     nationality: "Indian",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [totalVotes, setTotalVotes] = useState(0); 

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("/api/v1/candidate/all-candidates");
//         const data = await response.json();
//         setCandidates(data);

        
//         const votes = data.reduce((acc, candidate) => acc + candidate.votes, 0);
//         setTotalVotes(votes); 
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleEdit = (candidate) => {
//     setEditCandidate(candidate);
//     setUpdatedDetails({
//       name: candidate.name,
//       partyName: candidate.partyName,
//       partyLogo: candidate.partyLogo,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleChange = (e) => {
//     setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`/api/v1/candidate/update-candidate/${editCandidate._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate updated successfully!");
//         setCandidates(candidates.map(c => (c._id === editCandidate._id ? data.candidate : c)));
//         setIsEditModalOpen(false);
//       } else {
//         alert(data.message || "Error updating candidate.");
//       }
//     } catch (error) {
//       console.error("Error updating candidate:", error);
//     }
//   };

//   const handleDelete = async (id, votes) => {
//     const confirmed = window.confirm("Are you sure you want to delete this candidate?");
//     if (!confirmed) return;

    
//     if (votes >= totalVotes / 2) {
//       alert("You can only delete candidates with votes less than half of total votes.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/v1/candidate/delete-candidate/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate deleted successfully!");
//         setCandidates(candidates.filter((candidate) => candidate._id !== id));
//       } else {
//         alert(data.message || "Error deleting candidate.");
//       }
//     } catch (error) {
//       console.error("Error deleting candidate:", error);
//     }
//   };

//   const handleNewCandidateChange = (e) => {
//     setNewCandidateDetails({ ...newCandidateDetails, [e.target.name]: e.target.value });
//   };

//   const validateCandidateDetails = () => {
//     const { dob, nationality } = newCandidateDetails;
//     const birthDate = new Date(dob);
//     const age = new Date().getFullYear() - birthDate.getFullYear();
    
//     if (nationality !== "Indian") {
//       alert("Candidate's nationality must be Indian.");
//       return false;
//     }
    
//     if (age < 35) {
//       alert("Candidate must be at least 35 years old.");
//       return false;
//     }

//     return true;
//   };

//   const handleAddCandidate = async () => {
//     if (!validateCandidateDetails()) return;

//     try {
//       const response = await fetch("/api/v1/candidate/create-candidate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCandidateDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate added successfully!");
//         setCandidates([...candidates, data.newCandidate]);
//         setIsAddModalOpen(false);
//       } else {
//         alert(data.message || "Error adding candidate.");
//       }
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//     }
//   };

//   return (
//     <div className="flex flex-row">
//       <AdminSidebar className="h-full" />
//       <div className="flex flex-col flex-grow p-6 bg-gray-50">
//         <h1 className="text-2xl font-semibold mb-4">Candidates Management</h1>
//         <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
//           <Table className="min-w-full border-collapse bg-white">
//             <Table.Head className="bg-gray-100">
//               <Table.HeadCell className="hidden lg:table-cell border-r">S No.</Table.HeadCell>
//               <Table.HeadCell className="border-r">Name</Table.HeadCell>
//               <Table.HeadCell className="border-r hidden 450px:table-cell">Party Name</Table.HeadCell>
//               <Table.HeadCell className="hidden sm:block border-r">Party Logo</Table.HeadCell>
//               <Table.HeadCell className="border-r">No. Of Votes</Table.HeadCell>
//               <Table.HeadCell>
//                 <div className="md:ml-2">Actions</div>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {candidates.length > 0 ? (
//                 candidates.map((candidate, index) => (
//                   <Table.Row key={candidate._id}>
//                     {/* {console.log()} */}
//                     <Table.Cell className="hidden lg:table-cell border-r">{index + 1}</Table.Cell>
//                     <Table.Cell className="border-r">{candidate.name}</Table.Cell>
//                     <Table.Cell className="border-r hidden 450px:table-cell">{candidate.partyName}</Table.Cell>
//                     <Table.Cell className="hidden sm:block border-r">
//                       <img
//                         src={candidate.partyLogo}
//                         alt={`${candidate.partyName} Logo`}
//                         className="w-auto h-10 max-h-10 object-contain"
//                       />
//                     </Table.Cell>
//                     <Table.Cell className="border-r">{candidate.votes}</Table.Cell>
//                     <Table.Cell>
//                       <button
//                         onClick={() => handleEdit(candidate)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
//                       >
//                         Edit
//                       </button>
//                       { candidate?.votes <50 && <button
//                         onClick={() => handleDelete(candidate._id, candidate.votes)} // Pass candidate votes
//                         className="bg-red-600 text-white px-3 py-1 ml-2 rounded hover:bg-red-700 transition duration-200"
//                       >
//                         Delete
//                       </button>}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               ) : (
//                 <Table.Row>
//                   <Table.Cell colSpan="6" className="text-center py-4">No candidates found.</Table.Cell>
//                 </Table.Row>
//               )}
//             </Table.Body>
//           </Table>
//         </div>

//         <div className="flex justify-center mt-4">
//           <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//             Add Candidate
//           </Button>
//         </div>

//         {/* Edit Candidate Modal */}
//         {isEditModalOpen && (
//           <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//             <Modal.Header>Edit Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={updatedDetails.name}
//                     onChange={handleChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={updatedDetails.partyName}
//                     onChange={handleChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={updatedDetails.partyLogo}
//                     onChange={handleChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleUpdate} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//                 Update
//               </Button>
//               <Button onClick={() => setIsEditModalOpen(false)} className="bg-red-600 text-white hover:bg-red-600 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

//         {/* Add Candidate Modal */}
//         {isAddModalOpen && (
//           <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//             <Modal.Header>Add New Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={newCandidateDetails.name}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="dob" value="Date of Birth" />
//                   <TextInput
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     value={newCandidateDetails.dob}
//                     onChange={handleNewCandidateChange}
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="nationality" value="Nationality" />
//                   <TextInput
//                     id="nationality"
//                     name="nationality"
//                     type="text"
//                     value={newCandidateDetails.nationality}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Nationality"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={newCandidateDetails.partyName}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={newCandidateDetails.partyLogo}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleAddCandidate} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//                 Add Candidate
//               </Button>
//               <Button onClick={() => setIsAddModalOpen(false)} className="bg-red-600 text-white hover:bg-red-600 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }




// new 

// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./components/admin/AdminSidebar";
// import { Table, Modal, Button, Label, TextInput } from "flowbite-react";

// export default function Candidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state for delete confirmation modal
//   const [editCandidate, setEditCandidate] = useState(null);
//   const [candidateToDelete, setCandidateToDelete] = useState(null); // Track candidate to delete
//   const [updatedDetails, setUpdatedDetails] = useState({
//     name: "",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [newCandidateDetails, setNewCandidateDetails] = useState({
//     name: "",
//     dob: "",
//     nationality: "Indian",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [totalVotes, setTotalVotes] = useState(0);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("/api/v1/candidate/all-candidates");
//         const data = await response.json();
//         setCandidates(data);

//         const votes = data.reduce((acc, candidate) => acc + candidate.votes, 0);
//         setTotalVotes(votes);
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleEdit = (candidate) => {
//     setEditCandidate(candidate);
//     setUpdatedDetails({
//       name: candidate.name,
//       partyName: candidate.partyName,
//       partyLogo: candidate.partyLogo,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteClick = (candidate) => {
//     setCandidateToDelete(candidate); // Set the candidate to be deleted
//     setIsDeleteModalOpen(true); // Open the delete confirmation modal
//   };

//   const handleDelete = async () => {
//     const { _id, votes } = candidateToDelete;

//     if (votes >= totalVotes / 2) {
//       alert("You can only delete candidates with votes less than half of total votes.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/v1/candidate/delete-candidate/${_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate deleted successfully!");
//         setCandidates(candidates.filter((candidate) => candidate._id !== _id));
//         setIsDeleteModalOpen(false); // Close the delete modal
//       } else {
//         alert(data.message || "Error deleting candidate.");
//       }
//     } catch (error) {
//       console.error("Error deleting candidate:", error);
//     }
//   };

//   const handleCancelDelete = () => {
//     setIsDeleteModalOpen(false); // Close the modal if "Go Back" is clicked
//   };

//   return (
//     <div className="flex flex-row">
//       <AdminSidebar className="h-full" />
//       <div className="flex flex-col flex-grow p-6 bg-gray-50">
//         <h1 className="text-2xl font-semibold mb-4">Candidates Management</h1>
//         <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
//           <Table className="min-w-full border-collapse bg-white">
//             <Table.Head className="bg-gray-100">
//               <Table.HeadCell className="hidden lg:table-cell border-r">S No.</Table.HeadCell>
//               <Table.HeadCell className="border-r">Name</Table.HeadCell>
//               <Table.HeadCell className="border-r hidden 450px:table-cell">Party Name</Table.HeadCell>
//               <Table.HeadCell className="hidden sm:block border-r">Party Logo</Table.HeadCell>
//               <Table.HeadCell className="border-r">No. Of Votes</Table.HeadCell>
//               <Table.HeadCell>
//                 <div className="md:ml-2">Actions</div>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {candidates.length > 0 ? (
//                 candidates.map((candidate, index) => (
//                   <Table.Row key={candidate._id}>
//                     <Table.Cell className="hidden lg:table-cell border-r">{index + 1}</Table.Cell>
//                     <Table.Cell className="border-r">{candidate.name}</Table.Cell>
//                     <Table.Cell className="border-r hidden 450px:table-cell">{candidate.partyName}</Table.Cell>
//                     <Table.Cell className="hidden sm:block border-r">
//                       <img
//                         src={candidate.partyLogo}
//                         alt={`${candidate.partyName} Logo`}
//                         className="w-auto h-10 max-h-10 object-contain"
//                       />
//                     </Table.Cell>
//                     <Table.Cell className="border-r">{candidate.votes}</Table.Cell>
//                     <Table.Cell>
//                       <button
//                         onClick={() => handleEdit(candidate)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
//                       >
//                         Edit
//                       </button>
//                       {candidate?.votes < 50 && (
//                         <button
//                           onClick={() => handleDeleteClick(candidate)} // Open delete modal
//                           className="bg-red-600 text-white px-3 py-1 ml-2 rounded hover:bg-red-700 transition duration-200"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               ) : (
//                 <Table.Row>
//                   <Table.Cell colSpan="6" className="text-center py-4">No candidates found.</Table.Cell>
//                 </Table.Row>
//               )}
//             </Table.Body>
//           </Table>
//         </div>

//         <div className="flex justify-center mt-4">
//           <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//             Add Candidate
//           </Button>
//         </div>

//         {/* Edit Candidate Modal */}
//         {isEditModalOpen && (
//           <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//             <Modal.Header>Edit Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={updatedDetails.name}
//                     onChange={handleChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={updatedDetails.partyName}
//                     onChange={handleChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={updatedDetails.partyLogo}
//                     onChange={handleChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleUpdate} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
//                 Update
//               </Button>
//               <Button onClick={() => setIsEditModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

//         {/* Add Candidate Modal */}
//         {isAddModalOpen && (
//           <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//             <Modal.Header>Add New Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={newCandidateDetails.name}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="dob" value="Date of Birth" />
//                   <TextInput
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     value={newCandidateDetails.dob}
//                     onChange={handleNewCandidateChange}
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="nationality" value="Nationality" />
//                   <TextInput
//                     id="nationality"
//                     name="nationality"
//                     type="text"
//                     value={newCandidateDetails.nationality}
//                     onChange={handleNewCandidateChange}
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={newCandidateDetails.partyName}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={newCandidateDetails.partyLogo}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleAdd} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//                 Add
//               </Button>
//               <Button onClick={() => setIsAddModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

// {/* Delete Candidate Confirmation Modal */}
// <Modal show={isDeleteModalOpen} size="md" popup onClose={handleCancelDelete}>
//   <Modal.Header />
//   <Modal.Body>
//     <div className="text-center">
//       <h3 className="mb-5 text-2xl font-semibold text-gray-700">
//         Are you sure you want to delete this candidate?
//       </h3>
//       <div className="flex justify-center gap-4">
//         <Button
//           onClick={handleDelete}
//           className="bg-green-600 hover:bg-green-700 text-white"
//         >
//           Yes
//         </Button>
//         <Button
//           onClick={handleCancelDelete}
//           className="bg-red-600 hover:bg-red-700 text-white"
//         >
//           Go Back
//         </Button>
//       </div>
//     </div>
//   </Modal.Body>
// </Modal>

//       </div>
//     </div>
//   );
// }


// newest


// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./components/admin/AdminSidebar";
// import { Table, Modal, Button, Label, TextInput } from "flowbite-react";

// export default function Candidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state for delete confirmation modal
//   const [editCandidate, setEditCandidate] = useState(null);
//   const [candidateToDelete, setCandidateToDelete] = useState(null); // Track candidate to delete
//   const [updatedDetails, setUpdatedDetails] = useState({
//     name: "",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [newCandidateDetails, setNewCandidateDetails] = useState({
//     name: "",
//     dob: "",
//     nationality: "Indian",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [totalVotes, setTotalVotes] = useState(0);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("/api/v1/candidate/all-candidates");
//         const data = await response.json();
//         setCandidates(data);

//         const votes = data.reduce((acc, candidate) => acc + candidate.votes, 0);
//         setTotalVotes(votes);
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleEdit = (candidate) => {
//     setEditCandidate(candidate);
//     setUpdatedDetails({
//       name: candidate.name,
//       partyName: candidate.partyName,
//       partyLogo: candidate.partyLogo,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteClick = (candidate) => {
//     setCandidateToDelete(candidate); // Set the candidate to be deleted
//     setIsDeleteModalOpen(true); // Open the delete confirmation modal
//   };

//   const handleDelete = async () => {
//     const { _id, votes } = candidateToDelete;

//     if (votes >= totalVotes / 2) {
//       alert("You can only delete candidates with votes less than half of total votes.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/v1/candidate/delete-candidate/${_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate deleted successfully!");
//         setCandidates(candidates.filter((candidate) => candidate._id !== _id));
//         setIsDeleteModalOpen(false); // Close the delete modal
//       } else {
//         alert(data.message || "Error deleting candidate.");
//       }
//     } catch (error) {
//       console.error("Error deleting candidate:", error);
//     }
//   };

//   const handleCancelDelete = () => {
//     setIsDeleteModalOpen(false); // Close the modal if "Go Back" is clicked
//   };

//   // Function to handle input changes for new candidate details
//   const handleNewCandidateChange = (event) => {
//     const { name, value } = event.target;
//     setNewCandidateDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Function to handle input changes for updated candidate details
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Function to handle adding a new candidate
//   const handleAdd = async () => {
//     try {
//       const response = await fetch("/api/v1/candidate/add-candidate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCandidateDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate added successfully!");
//         setCandidates((prevCandidates) => [...prevCandidates, data]);
//         setNewCandidateDetails({
//           name: "",
//           dob: "",
//           nationality: "Indian",
//           partyName: "",
//           partyLogo: "",
//         });
//         setIsAddModalOpen(false); // Close the add modal
//       } else {
//         alert(data.message || "Error adding candidate.");
//       }
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//     }
//   };

//   // Function to handle updating an existing candidate
//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`/api/v1/candidate/update-candidate/${editCandidate._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate updated successfully!");
//         setCandidates((prevCandidates) =>
//           prevCandidates.map((candidate) =>
//             candidate._id === editCandidate._id ? data : candidate
//           )
//         );
//         setIsEditModalOpen(false); // Close the edit modal
//       } else {
//         alert(data.message || "Error updating candidate.");
//       }
//     } catch (error) {
//       console.error("Error updating candidate:", error);
//     }
//   };

//   return (
//     <div className="flex flex-row">
//       <AdminSidebar className="h-full" />
//       <div className="flex flex-col flex-grow p-6 bg-gray-50">
//         <h1 className="text-2xl font-semibold mb-4">Candidates Management</h1>
//         <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
//           <Table className="min-w-full border-collapse bg-white">
//             <Table.Head className="bg-gray-100">
//               <Table.HeadCell className="hidden lg:table-cell border-r">S No.</Table.HeadCell>
//               <Table.HeadCell className="border-r">Name</Table.HeadCell>
//               <Table.HeadCell className="border-r hidden 450px:table-cell">Party Name</Table.HeadCell>
//               <Table.HeadCell className="hidden sm:block border-r">Party Logo</Table.HeadCell>
//               <Table.HeadCell className="border-r">No. Of Votes</Table.HeadCell>
//               <Table.HeadCell>
//                 <div className="md:ml-2">Actions</div>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {candidates.length > 0 ? (
//                 candidates.map((candidate, index) => (
//                   <Table.Row key={candidate._id}>
//                     <Table.Cell className="hidden lg:table-cell border-r">{index + 1}</Table.Cell>
//                     <Table.Cell className="border-r">{candidate.name}</Table.Cell>
//                     <Table.Cell className="border-r hidden 450px:table-cell">{candidate.partyName}</Table.Cell>
//                     <Table.Cell className="hidden sm:block border-r">
//                       <img
//                         src={candidate.partyLogo}
//                         alt={`${candidate.partyName} Logo`}
//                         className="w-auto h-10 max-h-10 object-contain"
//                       />
//                     </Table.Cell>
//                     <Table.Cell className="border-r">{candidate.votes}</Table.Cell>
//                     <Table.Cell>
//                       <button
//                         onClick={() => handleEdit(candidate)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
//                       >
//                         Edit
//                       </button>
//                       {candidate?.votes < 50 && (
//                         <button
//                           onClick={() => handleDeleteClick(candidate)} // Open delete modal
//                           className="bg-red-600 text-white px-3 py-1 ml-2 rounded hover:bg-red-700 transition duration-200"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               ) : (
//                 <Table.Row>
//                   <Table.Cell colSpan="6" className="text-center py-4">No candidates found.</Table.Cell>
//                 </Table.Row>
//               )}
//             </Table.Body>
//           </Table>
//         </div>

//         <div className="flex justify-center mt-4">
//           <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//             Add Candidate
//           </Button>
//         </div>

//         {/* Edit Candidate Modal */}
//         {isEditModalOpen && (
//           <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//             <Modal.Header>Edit Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={updatedDetails.name}
//                     onChange={handleChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={updatedDetails.partyName}
//                     onChange={handleChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={updatedDetails.partyLogo}
//                     onChange={handleChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={() => setIsEditModalOpen(false)} color="gray">
//                 Close
//               </Button>
//               <Button onClick={handleUpdate} color="green">
//                 Update Candidate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

//         {/* Add Candidate Modal */}
//         {isAddModalOpen && (
//           <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//             <Modal.Header>Add Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={newCandidateDetails.name}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="dob" value="Date of Birth" />
//                   <TextInput
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     value={newCandidateDetails.dob}
//                     onChange={handleNewCandidateChange}
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={newCandidateDetails.partyName}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={newCandidateDetails.partyLogo}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={() => setIsAddModalOpen(false)} color="gray">
//                 Close
//               </Button>
//               <Button onClick={handleAdd} color="green">
//                 Add Candidate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

//         {/* Delete Confirmation Modal */}
//         {isDeleteModalOpen && (
//           <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
//             <Modal.Header>Delete Candidate</Modal.Header>
//             <Modal.Body>
//               <div>
//                 Are you sure you want to delete {candidateToDelete?.name}?
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleCancelDelete} color="gray">
//                 Go Back
//               </Button>
//               <Button onClick={handleDelete} color="red">
//                 Delete Candidate
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }





//new Vim


import React, { useState, useEffect } from "react";
import AdminSidebar from "./components/admin/AdminSidebar";
import { Table, Modal, Button, Label, TextInput } from "flowbite-react";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCandidate, setEditCandidate] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    partyName: "",
    partyLogo: "",
  });

  const [newCandidateDetails, setNewCandidateDetails] = useState({
    name: "",
    dob: "",
    nationality: "Indian",
    partyName: "",
    partyLogo: "",
  });

  const [totalVotes, setTotalVotes] = useState(0); // State to hold total votes

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/v1/candidate/all-candidates");
        const data = await response.json();
        setCandidates(data);

        // Calculate total votes
        const votes = data.reduce((acc, candidate) => acc + candidate.votes, 0);
        setTotalVotes(votes); // Set total votes state
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleEdit = (candidate) => {
    setEditCandidate(candidate);
    setUpdatedDetails({
      name: candidate.name,
      partyName: candidate.partyName,
      partyLogo: candidate.partyLogo,
    });
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/v1/candidate/update-candidate/${editCandidate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Candidate updated successfully!");
        setCandidates(candidates.map(c => (c._id === editCandidate._id ? data.candidate : c)));
        setIsEditModalOpen(false);
      } else {
        alert(data.message || "Error updating candidate.");
      }
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const handleDelete = async (id, votes) => {
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmed) return;

    // Check if candidate votes are less than half of total votes
    if (votes >= totalVotes / 2) {
      alert("You can only delete candidates with votes less than half of total votes.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/candidate/delete-candidate/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert("Candidate deleted successfully!");
        setCandidates(candidates.filter((candidate) => candidate._id !== id));
      } else {
        alert(data.message || "Error deleting candidate.");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleNewCandidateChange = (e) => {
    setNewCandidateDetails({ ...newCandidateDetails, [e.target.name]: e.target.value });
  };

  const validateCandidateDetails = () => {
    const { dob, nationality } = newCandidateDetails;
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    
    if (nationality !== "Indian") {
      alert("Candidate's nationality must be Indian.");
      return false;
    }
    
    if (age < 35) {
      alert("Candidate must be at least 35 years old.");
      return false;
    }

    return true;
  };

  const handleAddCandidate = async () => {
    if (!validateCandidateDetails()) return;

    try {
      const response = await fetch("/api/v1/candidate/create-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCandidateDetails),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Candidate added successfully!");
        setCandidates([...candidates, data.newCandidate]);
        setIsAddModalOpen(false);
      } else {
        alert(data.message || "Error adding candidate.");
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <AdminSidebar className="h-full" />
      <div className="flex flex-col flex-grow p-6 bg-gradient-to-r from-[#FF9933] to-[#138808]">
        <h1 className="text-2xl font-semibold mb-4 text-white">Candidates Management</h1>
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md bg-white">
          <Table className="min-w-full border-collapse">
          <Table.Head className="bg-[#205444] text-black">
              <Table.HeadCell className="hidden lg:table-cell border-r">S No.</Table.HeadCell>
              <Table.HeadCell className="border-r">Name</Table.HeadCell>
              <Table.HeadCell className="border-r hidden 450px:table-cell">Party Name</Table.HeadCell>
              <Table.HeadCell className="hidden sm:block border-r">Party Logo</Table.HeadCell>
              <Table.HeadCell className="border-r">No. Of Votes</Table.HeadCell>
              <Table.HeadCell>
                <div className="md:ml-2">Actions</div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <Table.Row key={candidate._id}>
                    <Table.Cell className="hidden lg:table-cell border-r">{index + 1}</Table.Cell>
                    <Table.Cell className="border-r">{candidate.name}</Table.Cell>
                    <Table.Cell className="border-r hidden 450px:table-cell">{candidate.partyName}</Table.Cell>
                    <Table.Cell className="hidden sm:block border-r">
                      <img
                        src={candidate.partyLogo}
                        alt={`${candidate.partyName} Logo`}
                        className="w-auto h-10 max-h-10 object-contain"
                      />
                    </Table.Cell>
                    <Table.Cell className="border-r">{candidate.votes}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
                      >
                        Edit
                      </button>
                      { candidate?.votes < 50 && (
                        <button
                          onClick={() => handleDelete(candidate._id, candidate.votes)} // Pass candidate votes
                          className="bg-red-600 text-white px-3 py-1 ml-2 rounded hover:bg-red-700 transition duration-200"
                        >
                          Delete
                        </button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center py-4">No candidates found.</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
            Add Candidate
          </Button>
        </div>

        {/* Edit Candidate Modal */}
        {isEditModalOpen && (
          <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
            <Modal.Header>Edit Candidate</Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" value="Candidate Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    value={updatedDetails.name}
                    onChange={handleChange}
                    placeholder="Candidate Name"
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="partyName" value="Party Name" />
                  <TextInput
                    id="partyName"
                    name="partyName"
                    type="text"
                    value={updatedDetails.partyName}
                    onChange={handleChange}
                    placeholder="Party Name"
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="partyLogo" value="Party Logo URL" />
                  <TextInput
                    id="partyLogo"
                    name="partyLogo"
                    type="text"
                    value={updatedDetails.partyLogo}
                    onChange={handleChange}
                    placeholder="Party Logo URL"
                    className="border rounded-md"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleUpdate} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
                Update
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Add Candidate Modal */}
        {isAddModalOpen && (
          <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
            <Modal.Header>Add New Candidate</Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" value="Candidate Name" />
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    value={newCandidateDetails.name}
                    onChange={handleNewCandidateChange}
                    placeholder="Candidate Name"
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="dob" value="Date of Birth" />
                  <TextInput
                    id="dob"
                    name="dob"
                    type="date"
                    value={newCandidateDetails.dob}
                    onChange={handleNewCandidateChange}
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality" value="Nationality" />
                  <TextInput
                    id="nationality"
                    name="nationality"
                    type="text"
                    value={newCandidateDetails.nationality}
                    onChange={handleNewCandidateChange}
                    placeholder="Nationality"
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="partyName" value="Party Name" />
                  <TextInput
                    id="partyName"
                    name="partyName"
                    type="text"
                    value={newCandidateDetails.partyName}
                    onChange={handleNewCandidateChange}
                    placeholder="Party Name"
                    className="border rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="partyLogo" value="Party Logo URL" />
                  <TextInput
                    id="partyLogo"
                    name="partyLogo"
                    type="text"
                    value={newCandidateDetails.partyLogo}
                    onChange={handleNewCandidateChange}
                    placeholder="Party Logo URL"
                    className="border rounded-md"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleAddCandidate} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
                Add Candidate
              </Button>
              <Button onClick={() => setIsAddModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}








//new Akhil






// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./components/admin/AdminSidebar";
// import { Table, Modal, Button, Label, TextInput } from "flowbite-react";

// export default function Candidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editCandidate, setEditCandidate] = useState(null);
//   const [updatedDetails, setUpdatedDetails] = useState({
//     name: "",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [newCandidateDetails, setNewCandidateDetails] = useState({
//     name: "",
//     dob: "",
//     nationality: "Indian",
//     partyName: "",
//     partyLogo: "",
//   });

//   const [totalVotes, setTotalVotes] = useState(0);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("/api/v1/candidate/all-candidates");
//         const data = await response.json();
//         setCandidates(data);

//         const votes = data.reduce((acc, candidate) => acc + candidate.votes, 0);
//         setTotalVotes(votes);
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleEdit = (candidate) => {
//     setEditCandidate(candidate);
//     setUpdatedDetails({
//       name: candidate.name,
//       partyName: candidate.partyName,
//       partyLogo: candidate.partyLogo,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleChange = (e) => {
//     setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`/api/v1/candidate/update-candidate/${editCandidate._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate updated successfully!");
//         setCandidates(candidates.map(c => (c._id === editCandidate._id ? data.candidate : c)));
//         setIsEditModalOpen(false);
//       } else {
//         alert(data.message || "Error updating candidate.");
//       }
//     } catch (error) {
//       console.error("Error updating candidate:", error);
//     }
//   };

//   const handleDelete = async (id, votes) => {
//     const confirmed = window.confirm("Are you sure you want to delete this candidate?");
//     if (!confirmed) return;

//     if (votes >= totalVotes / 2) {
//       alert("You can only delete candidates with votes less than half of total votes.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/v1/candidate/delete-candidate/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate deleted successfully!");
//         setCandidates(candidates.filter((candidate) => candidate._id !== id));
//       } else {
//         alert(data.message || "Error deleting candidate.");
//       }
//     } catch (error) {
//       console.error("Error deleting candidate:", error);
//     }
//   };

//   const handleNewCandidateChange = (e) => {
//     setNewCandidateDetails({ ...newCandidateDetails, [e.target.name]: e.target.value });
//   };

//   const validateCandidateDetails = () => {
//     const { dob, nationality } = newCandidateDetails;
//     const birthDate = new Date(dob);
//     const age = new Date().getFullYear() - birthDate.getFullYear();
    
//     if (nationality !== "Indian") {
//       alert("Candidate's nationality must be Indian.");
//       return false;
//     }
    
//     if (age < 35) {
//       alert("Candidate must be at least 35 years old.");
//       return false;
//     }

//     return true;
//   };

//   const handleAddCandidate = async () => {
//     if (!validateCandidateDetails()) return;

//     try {
//       const response = await fetch("/api/v1/candidate/create-candidate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCandidateDetails),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Candidate added successfully!");
//         setCandidates([...candidates, data.newCandidate]);
//         setIsAddModalOpen(false);
//       } else {
//         alert(data.message || "Error adding candidate.");
//       }
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//     }
//   };

//   return (
//     <div className="flex flex-row">
//       <AdminSidebar className="h-full" />
//       <div className="flex flex-col flex-grow p-6 bg-gradient-to-r from-[rgb(0,198,255)] to-[rgb(0,114,255)]">
//         <h1 className="text-2xl font-semibold mb-4 text-white">Candidates Management</h1>
//         <div className="overflow-auto rounded-lg border border-gray-200 shadow-md bg-white">
//           <Table className="min-w-full border-collapse">
//             <Table.Head className="bg-[#FF9933] text-white">
//               <Table.HeadCell className="hidden lg:table-cell border-r">S No.</Table.HeadCell>
//               <Table.HeadCell className="border-r">Name</Table.HeadCell>
//               <Table.HeadCell className="border-r hidden 450px:table-cell">Party Name</Table.HeadCell>
//               <Table.HeadCell className="hidden sm:block border-r">Party Logo</Table.HeadCell>
//               <Table.HeadCell className="border-r">No. Of Votes</Table.HeadCell>
//               <Table.HeadCell>
//                 <div className="md:ml-2">Actions</div>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {candidates.length > 0 ? (
//                 candidates.map((candidate, index) => (
//                   <Table.Row key={candidate._id}>
//                     <Table.Cell className="hidden lg:table-cell border-r">{index + 1}</Table.Cell>
//                     <Table.Cell className="border-r">{candidate.name}</Table.Cell>
//                     <Table.Cell className="border-r hidden 450px:table-cell">{candidate.partyName}</Table.Cell>
//                     <Table.Cell className="hidden sm:block border-r">
//                       <img
//                         src={candidate.partyLogo}
//                         alt={`${candidate.partyName} Logo`}
//                         className="w-auto h-10 max-h-10 object-contain"
//                       />
//                     </Table.Cell>
//                     <Table.Cell className="border-r">{candidate.votes}</Table.Cell>
//                     <Table.Cell>
//                       <button
//                         onClick={() => handleEdit(candidate)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
//                       >
//                         Edit
//                       </button>
//                       { candidate?.votes < 50 && (
//                         <button
//                           onClick={() => handleDelete(candidate._id, candidate.votes)}
//                           className="bg-red-600 text-white px-3 py-1 ml-2 rounded hover:bg-red-700 transition duration-200"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               ) : (
//                 <Table.Row>
//                   <Table.Cell colSpan="6" className="text-center py-4">No candidates found.</Table.Cell>
//                 </Table.Row>
//               )}
//             </Table.Body>
//           </Table>
//         </div>

//         <div className="flex justify-center mt-4">
//           <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//             Add Candidate
//           </Button>
//         </div>

//         {/* Edit Candidate Modal */}
//         {isEditModalOpen && (
//           <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//             <Modal.Header>Edit Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={updatedDetails.name}
//                     onChange={handleChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={updatedDetails.partyName}
//                     onChange={handleChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={updatedDetails.partyLogo}
//                     onChange={handleChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleUpdate} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
//                 Update
//               </Button>
//               <Button onClick={() => setIsEditModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}

//         {/* Add Candidate Modal */}
//         {isAddModalOpen && (
//           <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//             <Modal.Header>Add New Candidate</Modal.Header>
//             <Modal.Body>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" value="Candidate Name" />
//                   <TextInput
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={newCandidateDetails.name}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Candidate Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="dob" value="Date of Birth" />
//                   <TextInput
//                     id="dob"
//                     name="dob"
//                     type="date"
//                     value={newCandidateDetails.dob}
//                     onChange={handleNewCandidateChange}
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="nationality" value="Nationality" />
//                   <TextInput
//                     id="nationality"
//                     name="nationality"
//                     type="text"
//                     value={newCandidateDetails.nationality}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Nationality"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyName" value="Party Name" />
//                   <TextInput
//                     id="partyName"
//                     name="partyName"
//                     type="text"
//                     value={newCandidateDetails.partyName}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Name"
//                     className="border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="partyLogo" value="Party Logo URL" />
//                   <TextInput
//                     id="partyLogo"
//                     name="partyLogo"
//                     type="text"
//                     value={newCandidateDetails.partyLogo}
//                     onChange={handleNewCandidateChange}
//                     placeholder="Party Logo URL"
//                     className="border rounded-md"
//                   />
//                 </div>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleAddCandidate} className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
//                 Add Candidate
//               </Button>
//               <Button onClick={() => setIsAddModalOpen(false)} className="bg-gray-400 text-white hover:bg-gray-500 transition duration-200">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }