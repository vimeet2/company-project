const express= require('express');
const {
  createCandidate,
  updateCandidate,
  getCandidate,
  deleteCandidate,
  getAllCandidates,
  voteCandidate
} = require("../controllers/candidate.controller");
const router= express.Router();

router.post('/create-candidate',createCandidate);
router.get("/get-candidate/:id", getCandidate);
router.put("/update-candidate/:id", updateCandidate);
router.get("/all-candidates", getAllCandidates);
router.delete("/delete-candidate/:id", deleteCandidate);
router.patch("/vote/:id", voteCandidate); 


module.exports= router;
