import React, { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management</h1>
        <EmployeeForm setEmployees={setEmployees} />
        <EmployeeList employees={employees} setEmployees={setEmployees} />
      </header>
    </div>
  );
}

export default App;
