import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import "../../styles/home.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedIn");
    setShowLinks("");
    navigate("/");
  };



  useEffect(() => {
    setShowLinks(() => localStorage.getItem("loggedIn") || "");
  });

  return (
    <div style={{ display: "flex" }}>
      <div className="navbar-box">
        <p className="navbar-title-text title-font">Todo App</p>
        {!showLinks ? (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "2vw",
              fontSize:"15px",
            }}
          >
            <Link className="navlink" style={{ marginRight: "1vw" }} to="/">
              Login
            </Link>
            <Link className="navlink" to="/signup">Signup</Link>
          </div>
        ) : (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "2vw",
              fontSize: "15px",
              color: "white",
              textDecoration: "bold",
            }}
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
