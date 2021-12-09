import React, { useEffect } from "react";

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div className="modal">
      <p style={{ alignItems: "center", textAlign: "center" }}>
        {modalContent}
      </p>
    </div>
  );
};

export default Modal;
