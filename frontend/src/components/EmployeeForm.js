import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = ({ setEmployees }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [post, setPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      age,
      post,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/employees/add", newEmployee);
      setEmployees((prev) => [...prev, response.data.employee]);
      setName("");
      setAge("");
      setPost("");
    } catch (error) {
      console.error("Error adding employee", error);
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
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Post:</label>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
