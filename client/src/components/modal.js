import React, { useEffect } from "react";

const EmployeeModal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div
      className="employeemodal"
      style={{ textAlign: "center", left: "55rem" }}
    >
      <p>{modalContent}</p>
    </div>
  );
};

export default EmployeeModal;
