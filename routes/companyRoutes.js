const express = require("express");
const router = express.Router();
const {
  registerCompany,
  loginUser,
  getUser,
  checkIfUserAlreadyExists,
  checkIfCompanyAlreadyExists,
  updateMyCompany,
  allCompanies,
  deleteCompany,
  fetchMyCompany,
} = require("../controllers/companyController");

// base url => /company

router.post("/create", registerCompany);
router.post("/login", loginUser);
router.get("/all", allCompanies);
router.post("/user", checkIfUserAlreadyExists);
router.post("/", checkIfCompanyAlreadyExists);
router.put("/update/:id", updateMyCompany);
router.delete("/:id", deleteCompany);
router.get("/specific/:id", fetchMyCompany);

module.exports = router;
