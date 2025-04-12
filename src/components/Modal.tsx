import React from "react";
import "../../styles/modal.css";
import '../../styles/home.css';

type ModalProps = {
  isModalOpen: boolean,
  closeModal:  React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>,
  children: any,
  title: string,
};  

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  children,
  title,
}) => {
  if (!isModalOpen) return null;

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
