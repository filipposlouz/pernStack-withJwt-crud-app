import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";

const EditEmployee = ({ currentEmployee }) => {
  const [employee, setEmployee] = useState({ ...currentEmployee });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const body = { ...employee };
      await fetch(`http://localhost:5000/employee/${body.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        className="btn btn-secondary"
        variant="primary"
        onClick={handleShow}
      >
        Edit
      </button>

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
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>AFM</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={employee.first_name}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={employee.last_name}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="afm"
                    name="afm"
                    value={employee.afm}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={employee.date_of_birth}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            variant="primary"
            onClick={(e) => updateEmployee(e)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditEmployee;
