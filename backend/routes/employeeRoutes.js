const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Route to add an employee
router.post("/add", async (req, res) => {
  const { name, age, post } = req.body;

  // Check if all required data is provided
  if (!name || !age || !post) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    // Create a new employee
    const newEmployee = new Employee({
      name,
      age,
      post,
    });

    // Save the employee to the database
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all employees
router.get("/all", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
