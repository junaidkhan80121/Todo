import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/NoteDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

function App() {
  const themeMode = useSelector((state: any) => state.themeSlice.currentTheme);

  return (
    <div className={themeMode === "light" ? "light" : "dark"}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <h1>
                <PageNotFound />
              </h1>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
