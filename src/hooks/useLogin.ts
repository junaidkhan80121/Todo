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
      console.log("1")
      const res = await refreshTokenAPI();
      console.log("2")
      const newRefreshToken = await res.data.accessToken;
      localStorage.setItem("accessToken", newRefreshToken);
    } catch (err) {
      console.log("Error: ",((err as Error).message))
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  const checkLogin = async () => {
    if (localStorage.getItem("loggedIn") === "true") {
      await refreshToken();
      await getUserNotes();
    } 
    else navigate("/login");
  };

  const loginUser = async (setToastMessage: React.Dispatch<React.SetStateAction<string>>, displayToast: () => void) => {
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
      const accessToken = res.data.accessToken
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("accessToken", accessToken);
      navigate('/');
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
