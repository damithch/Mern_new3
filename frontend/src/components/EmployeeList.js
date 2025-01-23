import React, { useEffect } from "react";
import axios from "axios";

const EmployeeList = ({ employees, setEmployees }) => {

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/all");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]); // Adding setEmployees to the dependency array

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.age} - {employee.post}{" "}
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
