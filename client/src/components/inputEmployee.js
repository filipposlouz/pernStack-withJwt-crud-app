import React, { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "./modal";

const InputEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    afm: "",
    date_of_birth: "",
  });
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState({
    isModalOpen: false,
    modalContent: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !employee.first_name &&
        !employee.last_name &&
        !employee.afm &&
        !employee.date_of_birth
      ) {
        setShowModal({
          isModalOpen: true,
          modalContent: "Please enter values",
        });
      } else {
        if (employee.afm.length === 9) {
          const newEmployee = { ...employee };
          setShowModal({ isModalOpen: true, modalContent: "Employee added" });
          await fetch("http://localhost:5000/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployee),
          });
          setEmployees([...employees, newEmployee]);
          setEmployee({
            first_name: "",
            last_name: "",
            afm: "",
            date_of_birth: "",
          });
        } else {
          setShowModal({
            isModalOpen: true,
            modalContent: "Please enter AFM with 9 digits",
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const closeModal = () => {
    return setShowModal({ ...showModal, isModalOpen: false });
  };

  return (
    <Fragment>
      <h1
        className="text-center"
        style={{
          marginTop: "1rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          fontSize: 55,
        }}
      >
        Add Employee
      </h1>
      {showModal.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={showModal.modalContent} />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                First Name:
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Last Name:
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                AFM:
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                Date of Birth:
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  type="text"
                  variant="standard"
                  id="first_name"
                  name="first_name"
                  value={employee.first_name}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  variant="standard"
                  id="last_name"
                  name="last_name"
                  value={employee.last_name}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  variant="standard"
                  id="afm"
                  name="afm"
                  value={employee.afm}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  variant="standard"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={employee.date_of_birth}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
            {employees.map((employee, index) => {
              let { first_name, last_name, afm, date_of_birth } = employee;
              return (
                <TableRow key={index}>
                  <TableCell>{first_name}</TableCell>
                  <TableCell>{last_name}</TableCell>
                  <TableCell>{afm}</TableCell>
                  <TableCell>{date_of_birth}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default InputEmployee;
