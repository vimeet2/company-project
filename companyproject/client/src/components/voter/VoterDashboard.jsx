// import React, { useEffect, useState } from "react";
// import { Table } from "flowbite-react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// export default function VoterDashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [aadharNo, setAadharNo] = useState(localStorage.getItem('aadharNo'));
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [ isVoted , setIsVoted ] = useState( localStorage.getItem("isVoted") );
//   const [voterId, setVoterId] = useState(localStorage.getItem('voterId'));
//   // const [id, setId] = useState("");


//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("/api/v1/candidate/all-candidates");
//         const data = await response.json();
//         console.log(data);
//         setCandidates(data);
         
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();

//     return ()=>{
//       localStorage.removeItem("aadharNo");
//       localStorage.removeItem("isVoted");
//       localStorage.removeItem("voterId");
//     }
//   }, []);

//   const handleVoter = async (candidateId)=>{
//     console.log("Handler Voter system", candidateId);
//     try {
//       const response = await fetch(`/api/v1/voter/vote/${candidateId}`, {
//         method: 'PATCH',  
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({"aadharNo": aadharNo, "voterId":voterId })
//       });
//       console.log("Response: ", response);
//     }catch(error){
//       console.log(error);
//     }
//   }

//   const handleVote = async (candidateId) => {
//       // console.log("Handle Vote");
//     try {
//       const response = await fetch(`/api/v1/candidate/vote/${candidateId}`, {
//         method: 'PATCH',  
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ aadharNo })
//       });

//       if (response.ok) {
//         setCandidates((prevCandidates) =>
//           prevCandidates.map((candidate) =>
//             candidate._id === candidateId
//               ? { ...candidate, votes: candidate.votes + 1 }
//               : candidate
//           )
//         );
//         handleVoter(candidateId);
//         alert("Vote cast successfully!");
//         navigate('/success-vote'); // Redirect after alert
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error voting for candidate:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Voter Dashboard</h2>
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
//         <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Aadhar No: <span className="font-normal">{aadharNo}</span></h2>
//         <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Voter Id: <span className="font-normal">{voterId}</span></h2>
//         <Table className="w-full">
//           <Table.Head>
//             <Table.HeadCell className="border-b">Name</Table.HeadCell>
//             <Table.HeadCell className="border-b">Party Name</Table.HeadCell>
//             <Table.HeadCell className="border-b">Party Logo</Table.HeadCell>
//             <Table.HeadCell className="border-b">Actions</Table.HeadCell>
//           </Table.Head>
//           <Table.Body className="divide-y">
//             {candidates.map((candidate) => (
//               <Table.Row key={candidate._id} className="hover:bg-gray-50 transition duration-200">
//                 <Table.Cell className="border-b py-4">{candidate.name}</Table.Cell>
//                 <Table.Cell className="border-b py-4">{candidate.partyName}</Table.Cell>
//                 <Table.Cell className="border-b py-4">
//                   <img
//                     src={candidate.partyLogo}
//                     alt={`${candidate.partyName} Logo`}
//                     className="w-10 h-10 object-contain rounded"
//                   />
//                 </Table.Cell>
//                 <Table.Cell className="border-b py-4">
//                   { isVoted === "false" ? <button
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
//                     onClick={() => handleVote(candidate._id)}
//                   >
//                     Vote
//                   </button> : <button
//                     className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded transition duration-200"
                    
//                   >
//                     Already Voted
//                   </button>}
//                 </Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table>
//       </div>
//     </div>
//   );
// }






//new


import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export default function VoterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [aadharNo, setAadharNo] = useState(localStorage.getItem('aadharNo'));
  const navigate = useNavigate(); // Initialize useNavigate
  const [isVoted, setIsVoted] = useState(localStorage.getItem("isVoted"));
  const [voterId, setVoterId] = useState(localStorage.getItem('voterId'));
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false); // State for showing the modal

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/v1/candidate/all-candidates");
        const data = await response.json();
        console.log(data);
        setCandidates(data);
         
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();

    return () => {
      localStorage.removeItem("aadharNo");
      localStorage.removeItem("isVoted");
      localStorage.removeItem("voterId");
    };
  }, []);

  const handleVoter = async (candidateId) => {
    try {
      const response = await fetch(`/api/v1/voter/vote/${candidateId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "aadharNo": aadharNo, "voterId": voterId })
      });
      console.log("Response: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const response = await fetch(`/api/v1/candidate/vote/${candidateId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadharNo })
      });

      if (response.ok) {
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate._id === candidateId
              ? { ...candidate, votes: candidate.votes + 1 }
              : candidate
          )
        );
        handleVoter(candidateId);
        alert("Vote cast successfully!");
        navigate('/success-vote'); // Redirect after alert
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error voting for candidate:", error);
    }
  };

  const confirmVote = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowVoteModal(true); // Show the modal
  };

  const handleModalVote = () => {
    handleVote(selectedCandidateId); // Proceed with the vote
    setShowVoteModal(false); // Close the modal
  };

  const handleModalClose = () => {
    setShowVoteModal(false); // Close the modal without voting
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Voter Dashboard</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Aadhar No: <span className="font-normal">{aadharNo}</span></h2>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Voter Id: <span className="font-normal">{voterId}</span></h2>
        <Table className="w-full">
          <Table.Head>
            <Table.HeadCell className="border-b">Name</Table.HeadCell>
            <Table.HeadCell className="border-b">Party Name</Table.HeadCell>
            <Table.HeadCell className="border-b">Party Logo</Table.HeadCell>
            <Table.HeadCell className="border-b">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {candidates.map((candidate) => (
              <Table.Row key={candidate._id} className="hover:bg-gray-50 transition duration-200">
                <Table.Cell className="border-b py-4">{candidate.name}</Table.Cell>
                <Table.Cell className="border-b py-4">{candidate.partyName}</Table.Cell>
                <Table.Cell className="border-b py-4">
                  <img
                    src={candidate.partyLogo}
                    alt={`${candidate.partyName} Logo`}
                    className="w-10 h-10 object-contain rounded"
                  />
                </Table.Cell>
                <Table.Cell className="border-b py-4">
                  {isVoted === "false" ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
                      onClick={() => confirmVote(candidate._id)} // Trigger confirmation modal
                    >
                      Vote
                    </button>
                  ) : (
                    <button
                      className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded transition duration-200"
                    >
                      Already Voted
                    </button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showVoteModal} size="md" popup onClose={handleModalClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-2xl font-semibold text-gray-700">
              Are you sure you want to vote for this candidate?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleModalVote}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Yes
              </Button>
              <Button
                onClick={handleModalClose}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Go Back
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
