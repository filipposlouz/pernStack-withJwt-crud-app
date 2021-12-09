import React, { Fragment, useEffect, useState } from "react";

// component
import EditEmployee from "./editEmployee";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const DeleteEmployee = async (id) => {
    try {
      const deleteEmployee = await fetch(
        `http://localhost:5000/employee/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(deleteEmployee);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employee");
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center" style={{ marginTop: "1rem" }}>
        Show/Edit Employees
      </h1>
      <table className="table" style={{ marginTop: "5rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>AFM</th>
            <th>Date of Birth</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            let { id, first_name, last_name, afm, date_of_birth } = employee;
            date_of_birth = date_of_birth.split("T");
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{afm}</td>
                <td>{date_of_birth[0]}</td>
                <td>
                  <EditEmployee
                    currentEmployee={{
                      ...employee,
                      date_of_birth: date_of_birth[0],
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteEmployee(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListEmployees;
