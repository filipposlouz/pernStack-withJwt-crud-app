import React, { useEffect } from "react";

const EmployeeModal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div className="employeeModal" style={{ margin: "auto" }}>
      <p>{modalContent}</p>
    </div>
  );
};

export default EmployeeModal;
