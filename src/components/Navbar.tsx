import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import "../../styles/home.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAPI } from "../apis/auth";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeMode } from "../redux/themeSlice";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: any) => state.themeSlice.currentTheme);

  const handleLogout = async () => {
    logoutAPI();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedIn");
    setShowLinks("");
    navigate("/login");
  };

  const handleThemeToggle = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", newTheme);
    dispatch(changeThemeMode(newTheme));
  };

  useEffect(() => {
    setShowLinks(() => localStorage.getItem("loggedIn") || "");
  });

  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-box">
        <p className="navbar-title-text title-font">Todo App</p>
        {!showLinks ? (
          <>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "2vw",
                fontSize: "15px",
              }}
            >
              <button onClick={handleThemeToggle}>
                {themeMode === "light" ? (
                  <NightlightRoundIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeIcon />
                )}
              </button>
              &emsp;
              <Link className="navlink" style={{ marginRight: "0.7vw" }} to="/">
                Login
              </Link>
              <Link className="navlink" to="/signup">
                Signup
              </Link>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "2vw",
                fontSize: "15px",
                color: "white",
                textDecoration: "bold",
              }}
            >
              <button onClick={handleThemeToggle}>
                {themeMode === "light" ? (
                  <NightlightRoundIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeIcon />
                )}
              </button>
              &emsp;
              <button onClick={handleLogout}>
                Logout&ensp;
                <LogoutIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
