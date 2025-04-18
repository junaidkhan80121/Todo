import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../../styles/login.css";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FormSubmitEvent } from "../types";

const Login = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { setEmail, setPassword, loginUser } = useLogin();
  const navigate = useNavigate();

  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4100);
  };

  const handleLogin = async (e: FormSubmitEvent) => {
    e.preventDefault();
    await loginUser(setToastMessage, displayToast);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      navigate(`/`);
    }
  }, []);

  return (
    <>
      <div className="container-login-box">
        <div className="img-box">
          <img
            src="/login2.svg"
            style={{ width: "35vw", height: "auto" }}
            alt="login-image"
          />
        </div>
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <h3
              className="title-font"
              style={{ fontSize: "40px", fontWeight: "700" }}
            >
              LOGIN
            </h3>
            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button className="login-btn" type="submit">
                Login
              </button>
              <button className="signup-link">
                <Link to="/signup">Signup Instead</Link>
              </button>
            </div>
          </form>
          <Toast
            message={toastMessage}
            showToast={showToast}
            closeToast={setShowToast}
            toastType="error"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
