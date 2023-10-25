const Product = require("../models/productModel");
const Company = require("../models/companyModel");

const createProduct = async (req, res) => {
  const {
    productItems,
    title,
    description,
    image1,
    image2,
    creator,
    companyName,
    logo,
    social,
    email,
    phone,
  } = req.body;

  try {
    const product = await Product.create({
      productItems,
      title,
      description,
      image1,
      image2,
      creator,
      companyName,
      logo,
      social,
      email,
      phone,
    });
    if (product) {
      res.status(201).send(product);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find().sort({ $natural: -1 });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchMyProducts = async (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("no username");
  }

  const company = await Company.findOne({ username });

  if (company) {
    try {
      const product = await Product.find({ creator: username }).sort({
        $natural: -1,
      });
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(400).send("username not found");
  }
};

const fetchSpecificProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const deleteAllProducts = async (req, res, next) => {
  try {
    // Delete all products
    await Product.deleteMany({});
    res.json({ message: "All products have been deleted." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting products." });
  }
};

const deleteSpecificProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "product not found" });
    return;
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete product" });
  }
};

const updateMyProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchMyProducts,
  fetchSpecificProduct,
  deleteSpecificProduct,
  deleteAllProducts,
  updateMyProduct,
};
