import { useState } from "react";
import { loginAPI, refreshTokenAPI } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import useNotes from "./useNotes";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { getUserNotes } = useNotes();

  const refreshToken = async () => {
    try {
      const res = await refreshTokenAPI();
      const newRefreshToken = res.data.accessToken;
      console.log(newRefreshToken);
      localStorage.setItem("accessToken", newRefreshToken);
    } catch (err: any) {
      // console.log("---",err.message)
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  const checkLogin = () => {
    if (localStorage.getItem("loggedIn") === "true") {
      refreshToken();
      getUserNotes();
    } else navigate("/login");
  };

  const loginUser = async (setToastMessage: any, displayToast: () => void) => {
    try {
      if (email === "" || password === "") {
        displayToast();
        return;
      }
      if (email.length < 5 || password.length < 5) {
        setToastMessage(
          "Please select a password and email of length more than 5 characters"
        );
        displayToast();
        return;
      }
      const res = await loginAPI(email, password);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate(`/`);
    } catch (err: any) {
      console.log(err);
      if (err.status === 404) setToastMessage("User not found");
      else if (err.status === 400) setToastMessage("Invalid Credentials");
      else if (err.status === 401) setToastMessage("Invalid Credentials");
      else setToastMessage(`${err.message}`);
      displayToast();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
    refreshToken,
    checkLogin,
  };
};

export default useLogin;
