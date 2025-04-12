import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const displayToast = () => {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 4000);
    // setToastMessage("");
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (username === "" || password === "" || passwordCheck === "") {
        alert("Please Fill out all the fields");
        return;
      }
      if (password !== passwordCheck) {
        setToastMessage("Passwords do not match");
        displayToast();
        return;
      }
      if (username.length < 5 || password.length < 5) {
        setToastMessage("Please select a password of length more than 5 characters");
        displayToast();
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>\-_+=`~;'])[A-Za-z0-9!@#$%^&*(),.?":{}|<>\-_+=`~;']+$/;
      if (!emailRegex.test(username)) {
        // alert("Invalid email. Please Enter a valid email.");
        setToastMessage("Invalid email. Please Enter a valid email.");
        displayToast();
        return;
      }
      if (!passwordRegex.test(password)) {
        // alert("Select a password with at Leat 1 Uppercase and special character");
        setToastMessage("Choose password with at least 1 Uppercase and 1 Special character");
        displayToast();
        return;
      }

      const res = await axios.post("http://localhost:8000/signup", {
        username: username.toLowerCase(),
        password: password,
      });
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("uid", res.data.uid);
      navigate(`/notes/${res.data.uid}`, { state: { uid: res.data.uid } });
      // console.log(res.data)
      // navigate('/notes')
    } catch (err) {
      console.log(err);
      alert(err);
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPasswordCheck(e.target.value)}
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
        <Toast showToast={toastOpen} message={toastMessage} closeToast={setToastOpen} toastType="error"/>
      </div>
    </>
  );
};

export default Signup;
