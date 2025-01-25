import React, { useState } from "react";
import axios from "axios";

const AdminAddsCustomerForm = ({ setCustomers }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = {
      name,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/customers/add", newCustomer);
      setCustomers((prev) => [...prev, response.data.customer]);
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Error adding customer", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AdminAddsCustomerForm;
