import React, { useEffect } from "react";
import axios from "axios";

const CustomerList = ({ customers, setCustomers }) => {
  // Fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers/all");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };

    fetchCustomers();
  }, [setCustomers]);

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name}{" "}
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
