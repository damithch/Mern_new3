import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AdminAddsCustomerForm from "./components/adminCustomerForm"; // Correct file name
import CustomerList from "./components/CustomerList";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Management System</h1>

          {/* Navigation Links */}
          <nav>
            <Link to="/">Employee Management</Link> |{" "}
            <Link to="/customers">Customer Management</Link>
          </nav>
        </header>

        {/* Routes for Components */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <EmployeeForm setEmployees={setEmployees} />
                  <EmployeeList employees={employees} setEmployees={setEmployees} />
                </div>
              }
            />
            <Route
              path="/customers"
              element={
                <div>
                  <AdminAddsCustomerForm setCustomers={setCustomers} />
                  <CustomerList customers={customers} setCustomers={setCustomers} />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
