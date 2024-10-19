const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors= require('cors');
const mongoDB= require('./database/connectDB');
const PORT = process.env.PORT || 4000;
const AdminModel = require('./models/admin.model');
const CandidateModel = require('./models/candidate.model');
dotenv.config();
app.use(express.json());
app.use(cors());

mongoDB();

app.use("/api/v1/admin", require("./routes/admin.route"));
app.use('/api/v1/voter',require('./routes/voter.route'));
app.use('/api/v1/candidate',require('./routes/candidate.route'));

// const addCandidate = async (candidateData) => {
//   try {
//     // Create a new candidate using the CandidateModel
//     const newCandidate = new CandidateModel(candidateData);
    
//     // Save the candidate to the database
//     const savedCandidate = await newCandidate.save();
    
//     // Return the saved candidate
//     return savedCandidate;
//   } catch (error) {
//     // Handle any errors
//     console.error("Error adding candidate:", error);
//     throw error;
//   }
// };

// // Example usage
// const candidateData = {
//   name: "Sukhbir Singh Badal",
//   dob: new Date("1962-07-09"),
//   nationality: "Indian",
//   partyName: "Akali Dal",
//   partyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7rSQX_aF45IWeJa7Kq4rZOLEzucTeAB1Xg&s",
// };

// addCandidate(candidateData)
//   .then((result) => {
//     console.log("Candidate added successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});

//2j879ne95pt0bNiF
