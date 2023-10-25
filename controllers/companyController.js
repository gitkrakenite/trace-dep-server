const Company = require("../models/companyModel");

const bcrypt = require("bcryptjs");

const registerCompany = async (req, res) => {
  // check we have details from frontend

  const { companyName, logo, social, email, username, phone, password } =
    req.body;

  if (
    !companyName ||
    !logo ||
    !social ||
    !email ||
    !username ||
    !password ||
    !phone ||
    !password
  ) {
    res.status(400).json({ message: "Some details are missing" });
    console.log(req.body);
    return;
  }

  // check if the company already exists
  const companyExists = await Company.findOne({ companyName });
  if (companyExists) {
    res.status(400).json({ message: "Company already exists in database" });
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create company
  const company = await Company.create({
    companyName,
    logo,
    social,
    email,
    username,
    phone,
    password: hashedPassword,
  });

  if (company) {
    res.status(201).json({
      _id: company.id,
      companyName: company.companyName,
      logo: company.logo,
      social: company.social,
      email: company.email,
      phone: company.phone,
      username: company.username,
      phone: company.phone,
      isPaid: company.isPaid,
      isAdmin: company.isAdmin,
      createdAt: company.createdAt,
    });
  } else {
    res.status(400);
    throw new Error("Invalid company data");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Details missing" });
    return;
  }

  // check if user exists
  const user = await Company.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      companyName: user.companyName,
      logo: user.logo,
      social: user.social,
      email: user.email,
      phone: user.phone,
      username: user.username,
      phone: user.phone,
      isPaid: user.isPaid,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
};

// fetch all companies
const allCompanies = async (req, res) => {
  const companies = await Company.find().sort({ $natural: -1 });
  if (companies) {
    res.status(200).send(companies);
    return;
  }
};

const getUser = async (req, res) => {
  const { username } = req.body;
  const user = await Company.findOne({ username });
  if (user) {
    const userWithoutPassword = {
      _id: user._id,
      companyName: user.companyName,
      logo: user.logo,
      social: user.social,
      email: user.email,
      phone: user.phone,
      username: user.username,
      phone: user.phone,
      isPaid: user.isPaid,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      // Exclude other sensitive fields as needed
    };

    res.status(200).send(userWithoutPassword);
  } else {
    res.status(404).send("User not found");
  }
};

// API that checks if sent user exists
const checkIfUserAlreadyExists = async (req, res) => {
  const { username } = req.body;

  try {
    const userExists = await Company.findOne({ username });
    if (userExists) {
      let exists = "exists";
      return res.status(200).send(exists);
    } else {
      let exists = "not exist";
      return res.status(200).send(exists);
    }
  } catch (error) {
    return res.status(400).send("Error Checking");
  }
};

// API that checks if company exists
const checkIfCompanyAlreadyExists = async (req, res) => {
  const { companyName } = req.body;

  try {
    const companyExists = await Company.findOne({ companyName });
    if (companyExists) {
      let exists = "exists";
      return res.status(200).send(exists);
    } else {
      let exists = "not exist";
      return res.status(200).send(exists);
    }
  } catch (error) {
    return res.status(400).send("Error Checking");
  }
};

// @Update  PUT
// http://localhost:8000/api/v1/user/:id
const updateMyCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(400).json({ message: "company not found" });
    return;
  }

  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete company" });
  }
};

const fetchMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    res.status(200).send(company);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

module.exports = {
  registerCompany,
  loginUser,
  getUser,
  checkIfUserAlreadyExists,
  checkIfCompanyAlreadyExists,
  updateMyCompany,
  allCompanies,
  deleteCompany,
  fetchMyCompany,
};
