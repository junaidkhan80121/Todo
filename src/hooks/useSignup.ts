import { useState } from "react";
import { signupAPI } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const signupUser = async (setToastMessage: React.Dispatch<React.SetStateAction<string>>, displayToast: () => void) => {
    try {
      if (email === "" || password === "" || verifyPassword === "") {
        alert("Please Fill out all the fields");
        return;
      }
      if (password !== verifyPassword) {
        setToastMessage("Passwords do not match");
        displayToast();
        return;
      }
      if (email.length < 5 || password.length < 5) {
        setToastMessage(
          "Please select a password of length more than 5 characters"
        );
        displayToast();
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>\-_+=`~;'])[A-Za-z0-9!@#$%^&*(),.?":{}|<>\-_+=`~;']+$/;
      if (!emailRegex.test(email)) {
        setToastMessage("Invalid email. Please Enter a valid email.");
        displayToast();
        return;
      }
      if (!passwordRegex.test(password)) {
        setToastMessage(
          "Choose password with at least 1 Uppercase and 1 Special character"
        );
        displayToast();
        return;
      }
      const res = await signupAPI(email, password);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
      // return res
    } catch (err:any) {
      if (err.status === 401) setToastMessage("User Already Exists");
      else if (err.status === 440) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedIn");
        navigate("/login");
      } else if (err.status === 400)
        setToastMessage("Invalid Request, Pass all required parameters");
      else {
        console.log(err.message);
        setToastMessage("Internal Server Error");
      }
      displayToast();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    signupUser,
  };
};

export default useSignup;
