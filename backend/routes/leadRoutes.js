const express = require("express");

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  searchLeads,
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", createLead);
router.get("/search", searchLeads);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
router.put("/:id", updateLead);
