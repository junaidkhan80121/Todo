import React from "react";
import "../../styles/toast.css";
import "../../styles/home.css";

type ToastProps = {
  message: String;
  showToast: boolean;
  closeToast: React.Dispatch<React.SetStateAction<boolean>>,
  toastType: ToastType;
};

type ToastType = 'success' | 'warning' | 'error'


const Toast: React.FC<ToastProps> = ({
  message,
  showToast,
  closeToast,
  toastType,
}) => {
  if (!showToast) return null;

  const toast_styles: Record<ToastType,React.CSSProperties> = {
    success: {
      backgroundColor: "green",
    },
    error: {
      backgroundColor: "red",
    },
    warning: {
      backgroundColor: "#ffde21",
      color: "black",
    },
  };

  return (
    <>
      <div className="toast-body title-font" style={toast_styles[toastType]}>
        <div>{message}</div>&emsp;
        <p className="toast-close-btn" onClick={() => closeToast(false)}>
          &times;
        </p>
      </div>
    </>
  );
};

export default Toast;