import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import useSignup from "../hooks/useSignup";
import { FormSubmitEvent } from "../types";
import Modal from "../components/Modal";
import CircularProgress from "../components/CircularProgress";

const Signup = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [signupModal, setSignupModal] = useState(false)
  const { setEmail, setPassword, setVerifyPassword, signupUser } = useSignup();
  const navigate = useNavigate();

  const displayToast = () => {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 4000);
  };

  const closeSignupModal = ()=>{setSignupModal(false)}

  const handleSignup = async (e: FormSubmitEvent) => {
    e.preventDefault();
    setSignupModal(true)
    await signupUser(setToastMessage, displayToast);
    setSignupModal(false)
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") navigate("/");
  }, []);

  return (
    <>
      <div className="container-signup-box">
        <div className="img-box">
          <img src="/signup.svg" alt="signup" />
        </div>
        <div className="form-box">
          <form onSubmit={handleSignup}>
            <h3
              className="title-font"
              style={{ fontSize: "40px", fontWeight: "700" }}
            >
              SIGNUP
            </h3>
            <input
              placeholder="Username"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Retype Password"
              type="password"
              required
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button className="signup-btn" type="submit">
                Sign Up
              </button>
              <button className="login-link">
                <Link to="/">Login Instead</Link>
              </button>
            </div>
          </form>
        </div>
        <Toast
          showToast={toastOpen}
          message={toastMessage}
          closeToast={setToastOpen}
          toastType="error"
        />
      </div>
      <Modal isModalOpen={signupModal} closeModal={closeSignupModal} title="" modalType="loading">
              <CircularProgress/>
         </Modal>
    </>
  );
};

export default Signup;
