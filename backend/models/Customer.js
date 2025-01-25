const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // For auto-increment
const bcrypt = require("bcrypt"); // For password hashing

// Customer Schema
const customerSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Apply auto-increment plugin for customer_id
customerSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

// Pre-save hook to hash the password
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords during login
customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
