// const VoterModel = require("../models/voter.model");
// const CandidateModel = require("../models/candidate.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// const calculateAge = (dob) => {
//   const today = new Date();
//   const birthDate = new Date(dob);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const month = today.getMonth() - birthDate.getMonth();
//   if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// const generateVoterID = () => {
//   return (
//     "IND" +
//     Math.floor(Math.random() * 1000000)
//       .toString()
//       .padStart(6, "0")
//   );
// };

// const signup = async (req, res) => {
//   try {
//     const { name, dob, phoneNo, aadharNo, password, nationality } = req.body;
//     const age = calculateAge(dob);
//     if (age < 18) {
//       return res.status(400).json({ message: "Voter should be at least 18 years old" });
//     }
//     if (nationality !== "Indian") {
//       return res.status(400).json({ message: "Nationality must be Indian" });
//     }
//     if (password.length < 8) {
//       return res
//         .status(400)
//         .json({ message: "Password should have 8 or more letters" });
//     }
//     if (aadharNo.length != 12) {
//       return res.status(400).json({ message: "Invalid Aadhar No" });
//     }
//     if (!/^\d{10}$/.test(phoneNo)) {
//       return res.status(400).json({ message: "Invalid Phone No" });
//     }
//     const existingVoter = await VoterModel.findOne({ aadharNo });
//     if (existingVoter) {
//       return res.status(400).json({ message: "Voter already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const voterID = generateVoterID();
//     const newVoter = new VoterModel({
//       name,
//       dob,
//       phoneNo,
//       aadharNo,
//       voterID,
//       password: hashedPassword,
//       nationality,
//     });
//     await newVoter.save();
//     res.status(201).json({ message: "Voter ID created successfully", voterID });
//   } catch (err) {
//     res.status(500).json({ message: "server error", error: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { identifier, password } = req.body;

//     const voter = await VoterModel.findOne({
//       $or: [{ aadharNo: identifier }, { voterID: identifier }],
//     });

//     if (!voter) {
//       return res.status(400).json({ message: "Voter not registered." });
//     }

//     const isPasswordValid = await bcrypt.compare(password, voter.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Wrong password." });
//     }

//     const token = jwt.sign(
//       { aadharNo: voter.aadharNo },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         name: voter.name,
//         aadharNo: voter.aadharNo,
//         voterID: voter.voterID,
//         voted: voter.voted,
//         dob: voter.dob,
//         phoneNo: voter.phoneNo,
//         votedTo: voter.votedTo,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// const getVoter = async (req, res) => {
//   const { voterID } = req.query;
//   try {
//     const voter = await VoterModel.findOne({ voterID });
//     if (!voter) {
//       return res.status(400).json({ message: "Voter not found" });
//     }
//     const { password, ...voterWithoutPassword } = voter.toObject();
//     res.status(200).json(voterWithoutPassword);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { signup, login, getVoter };


const VoterModel = require("../models/voter.model");
const CandidateModel = require("../models/candidate.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const generateVoterID = () => {
  return (
    "IND" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  );
};

const signup = async (req, res) => {
  try {
    const { name, dob, phoneNo, aadharNo, password, nationality } = req.body;
    const age = calculateAge(dob);
    if (age < 18) {
      return res.status(400).json({ message: "Voter should be at least 18 years old" });
    }
    if (nationality !== "Indian") {
      return res.status(400).json({ message: "Nationality must be Indian" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password should have 8 or more letters" });
    }
    if (aadharNo.length != 12) {
      return res.status(400).json({ message: "Invalid Aadhar No" });
    }
    if (!/^\d{10}$/.test(phoneNo)) {
      return res.status(400).json({ message: "Invalid Phone No" });
    }
    const existingVoter = await VoterModel.findOne({ aadharNo });
    if (existingVoter) {
      return res.status(400).json({ message: "Voter already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const voterID = generateVoterID();
    const newVoter = new VoterModel({
      name,
      dob,
      phoneNo,
      aadharNo,
      voterID,
      password: hashedPassword,
      nationality,
    });
    await newVoter.save();
    res.status(201).json({ message: "Voter ID created successfully", voterID });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const voter = await VoterModel.findOne({
      $or: [{ aadharNo: identifier }, { voterID: identifier }],
    });

    if (!voter) {
      return res.status(400).json({ message: "Voter not registered." });
    }

    const isPasswordValid = await bcrypt.compare(password, voter.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password." });
    }

    const token = jwt.sign(
      { aadharNo: voter.aadharNo },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: voter.name,
        aadharNo: voter.aadharNo,
        voterID: voter.voterID,
        voted: voter.voted,
        dob: voter.dob,
        phoneNo: voter.phoneNo,
        votedTo: voter.votedTo,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getVoter = async (req, res) => {
  const { voterID } = req.query;
  try {
    const voter = await VoterModel.findOne({ voterID });
    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }
    const { password, ...voterWithoutPassword } = voter.toObject();
    res.status(200).json(voterWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const vote = async (req, res) => {
  const { candidateId } = req.params;
  const { aadharNo } = req.body; // Get the Aadhar number from the request body
  

  try {
    const voter = await VoterModel.findOne({ aadharNo });
    console.log("Voter detail: ", voter);
    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }
    // voter.voted = true;

    if (voter.voted) {
      return res.status(400).json({ message: "You have already voted." });
    }

    const candidate = await CandidateModel.findById(candidateId);
    if (!candidate) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    // Update the candidate's vote count
    // candidate.votes += 1;
    await candidate.save();
    
    voter.voted = true; 

    // Mark the voter as having voted
   
    voter.votedTo = {
      name: candidate.name,
      partyName: candidate.partyName,
      partyLogo: candidate.partyLogo,
    };
    await voter.save();
    console.log(voter);

    res.status(200).json({ message: "Vote cast successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const fetchVoterID = async () => {
  const aadharNo = localStorage.getItem("aadharNo"); // Get Aadhar number from localStorage
  try {
    const response = await fetch(`/api/v1/voter/fetch-voter-id?aadharNo=${aadharNo}`);
    if (response.ok) {
      const data = await response.json();
      setVoterID(data.voterID); // Assuming voterID is returned in response
    } else {
      console.error("Failed to fetch voter ID");
    }
  } catch (error) {
    console.error("Error fetching voter ID:", error);
  }
};


module.exports = { signup, login, getVoter, vote , fetchVoterID };
