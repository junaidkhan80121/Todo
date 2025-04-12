import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../../styles/login.css";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // setToastMessage("");
    }, 4100);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (username === "" || password === "") {
        alert("Please Enter username and password");
        displayToast();
        return;
      }
      if (username.length < 5 || password.length < 5) {
        setToastMessage(
          "Please select a password of length more than 5 characters"
        );
        displayToast();
        return;
      }
      const res = await axios.post("http://localhost:8000/login", {
        username: username.toLowerCase(),
        password: password,
      });
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("uid", res.data.uid);
      navigate(`/notes/${res.data.uid}`, { state: { uid: res.data.uid } });
    } catch (err) {
      console.log(err)
      setToastMessage(String(err.message));
      displayToast();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      const uid = localStorage.getItem("uid");
      navigate(`/notes/${uid}`);
    }
  }, []);

  return (
    <>
      <div className="container-login-box">
        <div className="img-box">
          <img src="/login.svg" alt="" />
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
              onChange={(e) => setUsername(e.target.value)}
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
          <Toast message={toastMessage} showToast={showToast} closeToast={setShowToast} toastType="error"/>
        </div>
      </div>
    </>
  );
};

export default Login;
