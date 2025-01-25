const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

// Route to add a customer (Admin functionality)
router.post("/add", async (req, res) => {
  const { name, password } = req.body;

  // Check if all required data is provided
  if (!name || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    // Check if the customer name already exists
    const existingCustomer = await Customer.findOne({ name });
    if (existingCustomer) {
      return res.status(409).json({ message: "Customer name already exists" });
    }

    // Create a new customer
    const newCustomer = new Customer({ name, password });

    // Save the customer to the database
    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all customers (Admin functionality)
router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find().select("-password"); // Exclude passwords for security
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get a single customer by ID (Admin functionality)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id).select("-password"); // Exclude password for security
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to update a customer's details (Admin functionality)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = password;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a customer by ID (Admin functionality)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully", customer: deletedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
