const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const companyRouter = require("./routes/companyRoutes");
const productRouter = require("./routes/productRoute");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// routes
app.get("/", (req, res) => res.status(200).send("API WORKING WELL"));

app.use("/api/v1/company", companyRouter);
app.use("/api/v1/product", productRouter);

// listener
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
