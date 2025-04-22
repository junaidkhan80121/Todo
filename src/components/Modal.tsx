import React from "react";
import "../../styles/modal.css";
import "../../styles/home.css";
import { ModalProps } from "../types";

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  modalType,
  children,
}) => {

  if (!isModalOpen) return null;

  if(modalType==='loading')
  return (
    <div className="modal-layout" onClick={closeModal}>
      <div  onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
)
 if(modalType==="note")
  return (
    <div className="modal-layout" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="alignment">
          <p className="title title-font">{title}</p>
          <button className="btn" onClick={closeModal}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
