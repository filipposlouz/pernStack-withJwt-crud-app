import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <h1
        className="text-center"
        style={{ marginTop: "1rem", marginBottom: "2rem", fontWeight: "bold" }}
      >
        Show/Edit Employees
      </h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Last Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                AFM
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Date of Birth
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Edit
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => {
              let { id, first_name, last_name, afm, date_of_birth } = employee;
              date_of_birth = date_of_birth.split("T");
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{first_name}</TableCell>
                  <TableCell>{last_name}</TableCell>
                  <TableCell>{afm}</TableCell>
                  <TableCell>{date_of_birth[0]}</TableCell>
                  <TableCell>
                    <EditEmployee
                      currentEmployee={{
                        ...employee,
                        date_of_birth: date_of_birth[0],
                      }}
                      getEmployees={getEmployees}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "#B80F0A", text: "white" }}
                      onClick={() => DeleteEmployee(id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ListEmployees;
