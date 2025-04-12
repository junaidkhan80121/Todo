import React, { SetStateAction } from "react";
import { useState } from "react";
import "../../styles/card.css";
import "../../styles/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from '@mui/icons-material/Description';
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import Toast from "./Toast";

type CardProps = {
  title: string;
  description: string;
  id: string;
  // note: any;
  setNotes: any;
  uid: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setPendingNotes: any;
  setCompletedNotes: any;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  id,
  uid,
  setNotes,
  checked,
  setCompletedNotes,
  setPendingNotes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleVal, setTitleVal] = useState<string>(title);
  const [DescriptionVal, setDescriptionVal] = useState<string>(description);
  const [checkedVal, setCheckedVal] = useState(checked);
  const [isDeleteModalOpen, setOpenDeleteModel] = useState(false);
  const [toastMsg, setToastMsg] = useState("")
  const [openToast, setOpenToast] = useState(false)
  const [toastType, setToastType] = useState("success")

  const closeModal = () => setIsModalOpen(false);
  // const openModal = () => setIsModalOpen(true);
  const closeDeleteModal = () => setOpenDeleteModel(false);
  // const openDeleteModal = () => setOpenDeleteModel(true);


  const showToast = ()=>{
    console.log("toastttt")
    setOpenToast(true)
    setTimeout(()=>{
      setOpenDeleteModel(false);
      setOpenToast(false)
      console.log("toastttt end");
    },4000);
    
  }
 
  


  const updateNote = async () => {
    try {
      const res = await axios.post("http://localhost:8000/updatenote", {
        uid: uid,
        id: id,
        title: titleVal,
        description: DescriptionVal,
        checked: checkedVal,
      });
      console.log(res.data.notes);
      setNotes(res.data.notes);
      const pendingNotes = res.data.notes.filter(
        (note: any) => note.checked === false
      );
      const completedNotes = res.data.notes.filter(
        (note: any) => note.checked === true
      );
      setPendingNotes(pendingNotes);
      setCompletedNotes(completedNotes);
      setToastMsg("Note Updated Successfully")
      setToastType("success")
      setIsModalOpen(false)
      showToast();
    } catch (err) {
      setToastMsg(String(err))
      setToastType("error")
      showToast()
      // alert(err);
    }
  };

  const updateNoteStatus = async () => {
    try {
      const res = await axios.post("http://localhost:8000/updatenotestatus", {
        uid: uid,
        id: id,
      });
      console.log(res.data.notes);
      setNotes(res.data.notes);
      const pendingNotes = res.data.notes.filter(
        (note: any) => note.checked === false
      );
      const completedNotes = res.data.notes.filter(
        (note: any) => note.checked === true
      );
      setPendingNotes(pendingNotes);
      setCompletedNotes(completedNotes);
      setIsModalOpen(false);
    } catch (err) {
      setToastMsg(String(err))
      setToastType("error")
      showToast()
      // alert(err);
    }
  };

  const deleteNote = async (id: any) => {
    try {
      const res = await axios.post("http://localhost:8000/deletenote", {
        uid: uid,
        noteId: id,
      });
      console.log(res.data.notes);
      setNotes(res.data.notes);
      const pendingNotes = res.data.notes.filter(
        (note: any) => note.checked === false
      );
      const completedNotes = res.data.notes.filter(
        (note: any) => note.checked === true
      );
      
      setPendingNotes(pendingNotes);
      setCompletedNotes(completedNotes);
      setToastMsg("Note Deleted Successfully")
      setToastType("error")
      setIsModalOpen(false)
      showToast();
    } catch (err) {
      setToastMsg(String(err))
      setToastType("error")
      showToast()
    }
  };

  const data = { title: title, description: description, checked: checked };
  // console.log(checked)

  return (
    <>
      <div className="card">
        <div>
          <p
            className="card-title title-font"
            style={{
              fontSize: "27px",
              fontWeight:"800",
              textDecoration: checked ? "line-through" : "none",
            }}
          >
            {title}
          </p>
          <br />
          <p className="card-desc sub-title-font" style={{ fontSize: "18px", textDecoration: checked ? "line-through" : "none", }}>
            {description}
          </p>
        </div>
        <div
          className={
            checked
              ? "complete description-font"
              : "incomplete description-font"
          }
        >
          Status :&ensp;{checked ? "Completed" : "Incomplete"}
        </div>

        <div className="setting">
          <div style={{display:"flex",alignItems:"center"}}>
          <div className="checkbox-mark-text">
            Mark&nbsp;as&nbsp;{checked ? <span>Incompleted</span> : <span>Complete</span>}
          </div>
          <input
            className="checkbox"
            type="checkbox"
            checked={checkedVal}
            onChange={(e) => {
              const newValue = e.target.checked;
              setCheckedVal(newValue);
              updateNoteStatus();
            }}
          />
          </div>
          <div style={{display:"flex", justifyContent:'flex-end',width:"100%"}}>
          <button
            title="Delete Note"
            style={{ color: "red" }}
            onClick={() => {
              // openDeleteModal();
              setOpenDeleteModel(true);
            }}
          >
            <DeleteIcon className="icon-btn" />
          </button>
          <button
            title="Edit Note"
            onClick={() => {

              setIsModalOpen(true);
            }}
          >
            <EditIcon className="icon-btn" />
          </button>
          
          <button title="View Details">
            <Link to="/details" state={data}>
            <DescriptionIcon className="icon-btn"/>
            </Link>
          </button>
          </div>

          <Modal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            title="Delete Note"
          >
            <div className="sub-title-font delete-modal-desc">Want to Delete Note? This change is irreversible.</div>
            <div className="delete-modal">
              <button
                className="delete-note-btn-modal"
                onClick={() => deleteNote(id)}
              >
                Yes
              </button>
              <button
                className="cancel-note-btn-modal"
                onClick={() => setOpenDeleteModel(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>

          <Modal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            title="Update Note"
          >
            <div>
              <label>Title</label>
              <br />
              <input
                type="text"
                onChange={(e) => setTitleVal(e.target.value)}
                value={titleVal}
              />
              <br />
              <br />
              <label>Description</label>
              <br />
              <input
                type="text"
                onChange={(e) => setDescriptionVal(e.target.value)}
                value={DescriptionVal}
              />
              <br />
              <br />
              <div style={{ display: "flex", alignItems:"center"}}>
                <div className="description-text">Mark as {checkedVal ? "Incomplete" : "Complete"}</div>&ensp;
                <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={checkedVal}
                  onChange={(e) => {
                    setCheckedVal(e.target.checked);
                  }}
                />
                </div>
                {/* <br /> */}
              </div>
              {/* <br /> */}
              <button className="update-btn" onClick={updateNote}>
                Update Note
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <Toast message={toastMsg} toastType={toastType} showToast={openToast} closeToast={setOpenToast} />
    </>
  );
};

export default Card;
