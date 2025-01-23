const mongoose = require("mongoose");

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
});

// Create the model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
