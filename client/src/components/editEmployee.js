import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EmployeeModal from "./editEmployeeModal";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

const EditEmployee = ({ currentEmployee, getEmployees }) => {
  const [employee, setEmployee] = useState({ ...currentEmployee });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState({
    isModalOpen: false,
    modalContent: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const closeModal = () => {
    return setShowModal({ ...showModal, isModalOpen: false });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      if (employee.afm.length !== 9) {
        setShowModal({
          isModalOpen: true,
          modalContent: "Please enter AFM with 9 digits",
        });
      } else {
        const body = { ...employee };
        await fetch(`http://localhost:5000/employee/${body.id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        });
        handleClose();
        getEmployees();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={handleShow} color="primary">
        Edit
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Employee</Modal.Title>
          <button
            className="close"
            onClick={() => {
              handleClose();
            }}
          >
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      type="text"
                      variant="standard"
                      label="First Name"
                      id="first_name"
                      name="first_name"
                      value={employee.first_name}
                      onChange={handleChange}
                      autoFocus="true"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      variant="standard"
                      label="Last Name"
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
                      label="AFM"
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
                      label="Date of Birth"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={employee.date_of_birth}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {showModal.isModalOpen && (
              <EmployeeModal
                closeModal={closeModal}
                modalContent={showModal.modalContent}
              />
            )}
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={(e) => updateEmployee(e)}
            style={{ backgroundColor: "green", text: "white" }}
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditEmployee;
