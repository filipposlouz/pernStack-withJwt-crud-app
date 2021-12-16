import React, { useEffect } from "react";

const EmployeeModal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div className="afmcheck" style={{ bottom: "4rem" }}>
      <p>{modalContent}</p>
    </div>
  );
};

export default EmployeeModal;
