require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const adminCustomerRoutes = require("./routes/adminCustomerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB connection (Updated to remove deprecated options)
mongoose
  .connect(process.env.MONGODB_URL)  // Removed the deprecated options
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

// Use the employee routes
app.use("/api/employees", employeeRoutes);
app.use("/api/adminCustomer", adminCustomerRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
