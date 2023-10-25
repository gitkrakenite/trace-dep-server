const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    social: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isPaid: { type: String, default: "nope", required: true },
    isAdmin: { type: String, default: "nope", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
