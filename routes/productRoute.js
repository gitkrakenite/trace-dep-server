const express = require("express");
const router = express.Router();
const {
  createProduct,
  fetchAllProducts,
  fetchMyProducts,
  fetchSpecificProduct,
  deleteSpecificProduct,
  deleteAllProducts,
  updateMyProduct,
} = require("../controllers/productController");

// base url /product

router.post("/create", createProduct);
router.get("/all", fetchAllProducts);
router.post("/mine", fetchMyProducts);
router.get("/:id", fetchSpecificProduct);
router.delete("/:id", deleteSpecificProduct);
router.put("/:id", updateMyProduct);
router.delete("/", deleteAllProducts);

module.exports = router;
