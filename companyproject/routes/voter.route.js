// const express = require("express");
// const  {signup,login,getVoter,vote}  = require("../controllers/voter.controller");
// const router = express.Router();

// router.post('/signup',signup);
// router.post('/login',login);
// router.get('/get-voter',getVoter);
// router.post('/vote', vote);

// module.exports=router;

const express = require("express");
const {
  signup,
  login,
  getVoter,
  vote,
} = require("../controllers/voter.controller.js");
const router = express.Router();

// Voter routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-voter", getVoter);
router.patch("/vote/:candidateId", vote); // Route for voting
//router.get("/fetch-voter-id", fetchVoterId); 

module.exports = router;
