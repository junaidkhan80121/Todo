import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/TodoNoteCard";
import '../../styles/home.css'
import Modal from "../components/Modal";
import AddIcon from '@mui/icons-material/Add';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import { Note } from "../types";
import Toast from "../components/Toast";

const Home = () => { 
  const navigate = useNavigate()
  const [uid, setUID] = useState(localStorage.getItem("uid"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState('tab-1');
  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success")
  const [completedNotes, setCompletedNotes] = useState<Note[]>([]);
  const [pendingNotes, setPendingNotes] = useState<Note[]>([]);


  useEffect(()=>{
    console.log("useEffect")
    if(localStorage.getItem('loggedIn')==='true'){
      console.log("logged in")
      const uid = localStorage.getItem('uid')
      console.log(uid)
      setUID(uid)
      getNotes();
  }
  else
    navigate('/')
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('uid')
    navigate('/')
  }

  const showToast = ()=>{
    setOpenToast(true)
    setTimeout(()=>{
      setOpenToast(false)
    },4000)
  }

  const addNote = async () => {
    try {
      if(title.length>20 || description.length>50){
        // alert("Please Enter title under 20 and description under 50 words")
        setToastMsg("Please Enter title under 20 and description under 50 words")
        setToastType("error")
        showToast()
        return
      }
      if(title==="" || description===""){
        // alert("Please Fill all the fields");
        setToastMsg("Please Fill all the fields")
        setToastType("error")
        showToast()
        return;
      }
      const res = await axios.post("http://localhost:8000/addnote", {
        uid: uid,
        title: title,
        description: description,
        checked: checked
      });
      console.log(res.data.notes);
      setNotes(res.data.notes);
      setIsModalOpen(false)
      const completedNotes = res.data.notes.filter((note:any)=>note.checked===true)
      const pendingNotes = res.data.notes.filter((note:any)=>note.checked===false)
      setCompletedNotes(completedNotes)
      setPendingNotes(pendingNotes)
      setToastType("success")
      setToastMsg("Note added successfuly")
      showToast()
      setTitle("");
      setDescription("");
    } catch (err) {
      setToastMsg(String(err))
      setToastType("error")
      showToast()
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getNotes = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getnote/${uid}`);
      setNotes(res.data.notes);
      const completedNotes = res.data.notes.filter((note:any)=>note.checked===true)
      const pendingNotes = res.data.notes.filter((note:any)=>note.checked===false)
      setCompletedNotes(completedNotes)
      setPendingNotes(pendingNotes)
      console.log(res.data.notes);
      
    } catch (err) {
      setToastMsg(String(err))
      setToastType("error")
      showToast()
    }
  };

  return (
    <>
    <div className="control-box">
      
      <button
        className="main-btn"
        onClick={() => {
          openModal();
          setIsModalOpen(true);
        }}
      >
        <div style={{display:"flex"}}>
        Add Note&ensp;
        <AddIcon/> 
        </div>
      </button>
      <br/>
      <br />
      {/* <button className="logout-btn" onClick={handleLogout}>Logout&ensp;<LogoutIcon/></button> */}
      
      </div>


      <div className="tabs-container">
        <button className="tabs-button-all" onClick={()=>setTab('tab-1')}>All Notes&ensp;<ChecklistIcon/></button>
        <button className="tabs-button-completed" onClick={()=>setTab('tab-2')}>Completed Notes&ensp;<DoneIcon/></button>
        <button className="tabs-button-pending" onClick={()=>setTab('tab-3')}>Pending Notes&ensp;<PendingActionsIcon/></button>
      </div>


      




      {tab==='tab-1' && <div className="main-block">
        {notes.length != 0 ?
          notes.map((note, index) => (
            <Card
              key={index}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              title={note.title}
              description={note.description}
              uid={uid}
              id={note._id}
              // notes={notes}
              setNotes={setNotes}
              setCompletedNotes={setCompletedNotes}
              setPendingNotes={setPendingNotes}
              checked={note.checked}
            />
          )):<div className="empty-notes">No Notes Added. Add Notes To Get Started...</div>}


        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          title="Add Note"
        >
          <div>
            <label>Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <label>Description</label>
            <br />
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />
            <button className="add-btn" onClick={addNote}>
              Add Note
            </button>
          </div>
        </Modal>
      </div>}

        {
          tab==='tab-2' &&<div className="main-block">
          {completedNotes.length != 0 ?
            completedNotes.map((note, index) => (
              <Card
                key={index}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                title={note.title}
                description={note.description}
                uid={uid}
                id={note._id}
                // notes={notes}
                setNotes={setNotes}
                checked={note.checked}
                setCompletedNotes={setCompletedNotes}
                setPendingNotes={setPendingNotes}
              />
            )):<div className="empty-notes">No Completed Notes...</div>}
          <Modal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            title="Add Note"
          >
            <div>
              <label>Title</label>
              <br />
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <label>Description</label>
              <br />
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />
              <button className="add-btn" onClick={addNote}>
                Add Note
              </button>
            </div>
          </Modal>
        </div>

        }


{
          tab==='tab-3' &&<div className="main-block">
          {pendingNotes.length != 0 ?
            pendingNotes.map((note, index) => (
              <Card
                key={index}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                title={note.title}
                description={note.description}
                uid={uid}
                id={note._id}
                // notes={notes}
                setNotes={setNotes}
                checked={note.checked}
                setCompletedNotes={setCompletedNotes}
                setPendingNotes={setPendingNotes}
              />
            )):<div className="empty-notes">No Pending Notes...</div>}
          <Modal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            title="Add Note"
          >
            <div>
              <label>Title</label>
              <br />
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <label>Description</label>
              <br />
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />
              <button className="add-btn" onClick={addNote}>
                Add Note
              </button>
            </div>
          </Modal>
        </div>

        }
      <Toast message={toastMsg} showToast={openToast} closeToast={setOpenToast} toastType={toastType}/>
    </>
  );
};

export default Home;