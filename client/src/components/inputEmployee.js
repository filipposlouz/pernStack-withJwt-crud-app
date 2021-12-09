import React, { Fragment, useState } from "react";
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
      if (employee.afm.length !== 9) {
        setShowModal({
          isModalOpen: true,
          modalContent: "Please enter AFM with 9 digits",
        });
      } else {
        if (
          employee.first_name &&
          employee.last_name &&
          employee.afm &&
          employee.date_of_birth
        ) {
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
            modalContent: "Please enter values",
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
      <h1 className="text-center" style={{ marginTop: "1rem" }}>
        Add Employee
      </h1>
      {showModal.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={showModal.modalContent} />
      )}
      <table className="table" style={{ marginTop: "5rem" }}>
        <thead>
          <tr>
            <th>First Name:</th>
            <th>Last Name:</th>
            <th>AFM:</th>
            <th>Date of Birth:</th>
            <th></th>
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
            <td>
              <button
                type="submit"
                className="btn"
                style={{ marginTop: "0.55rem" }}
                onClick={handleSubmit}
              >
                Add
              </button>
            </td>
          </tr>
          {employees.map((employee, index) => {
            let { first_name, last_name, afm, date_of_birth } = employee;
            return (
              <tr key={index}>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{afm}</td>
                <td>{date_of_birth}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default InputEmployee;
