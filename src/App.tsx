import "./App.css";
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/NoteDetailView";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import CompletedTasksView from "../src/Pages/completedTasksView"
import PageNotFound from "./pages/404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/notes/:uid' element={<Home/>}/>
      <Route path='/details' element={<DetailsPage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<h1><PageNotFound/></h1>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
