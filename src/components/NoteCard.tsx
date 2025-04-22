import React from "react";
import { useState } from "react";
import "../../styles/card.css";
import "../../styles/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import Toast from "./Toast";
import { CardProps } from "../types/index";
import useNotes from "../hooks/useNotes";
import CircularProgress from "./CircularProgress";

const Card: React.FC<CardProps> = ({ title, description, id, checked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleVal, setTitleVal] = useState<string>(title);
  const [DescriptionVal, setDescriptionVal] = useState<string>(description);
  const [checkedVal, setCheckedVal] = useState(checked);
  const [isDeleteModalOpen, setOpenDeleteModel] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const closeModal = () => setIsModalOpen(false);
  const closeDeleteModal = () => setOpenDeleteModel(false);
  const [noteModal, setNoteModal] = useState(false);
  const { updateUserNote, updateUserNoteStatus, deleteUserNote } = useNotes();
  const closeNoteModal = ()=>{setNoteModal(false)}

  const showToast = () => {
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 4000);
  };

  const data = { title: title, description: description, checked: checkedVal };

  return (
    <>
      <div className="card">
        <div>
          <p
            className="card-title title-font"
            style={{
              fontSize: "27px",
              fontWeight: "800",
              textDecoration: checked ? "line-through" : "none",
              transition: "1s",
            }}
          >
            {title}
          </p>
          <br />
          <p
            className="card-desc sub-title-font"
            style={{
              fontSize: "18px",
              textDecoration: checked ? "line-through" : "none",
              transition: "1s",
            }}
          >
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
          {checked ? (
            <span>
              Status : Completed <DoneIcon sx={{ fontSize: "15px" }} />
            </span>
          ) : (
            <span>
              Status : Pending <PendingActionsIcon sx={{ fontSize: "20px" }} />
            </span>
          )}
        </div>

        <div className="setting">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="checkbox-mark-text">
              Mark&nbsp;as&nbsp;
              {checked ? <span>Incompleted</span> : <span>Complete</span>}
            </div>
            <input
              className="checkbox"
              type="checkbox"
              checked={checkedVal}
              onChange={(e) => {
                const newValue = e.target.checked;
                setCheckedVal(newValue);
                updateUserNoteStatus(id, setToastMsg, setToastType, showToast);
                setNoteModal(false)
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1vw",
              width: "100%",
            }}
          >
            <button
              title="Delete Note"
              style={{ color: "red" }}
              onClick={() => {
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
                <DescriptionIcon className="icon-btn" />
              </Link>
            </button>
          </div>

          <Modal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            title="Delete Note"
            modalType="note"
          >
            <div className="sub-title-font delete-modal-desc">
              Want to Delete Note? This change is irreversible.
            </div>
            <div className="delete-modal">
              <button
                className="delete-note-btn-modal"
                onClick={async () =>{
                  await deleteUserNote(
                    id,
                    setToastMsg,
                    setToastType,
                    showToast,
                    setOpenDeleteModel
                  )
                  setNoteModal(false)
                }
                }
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
            modalType="note"
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  transition: "1s",
                }}
              >
                <div className="description-text">
                  Mark as {checkedVal ? "Incomplete" : "Complete"}
                </div>
                &ensp;
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
              <button
                className="update-btn"
                onClick={async () =>
                  {await updateUserNote(id,titleVal,DescriptionVal,checkedVal,setToastMsg,setToastType,setIsModalOpen,showToast)
                    setNoteModal(false)
                  }
                }
              >
                Update Note
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <Toast
        message={toastMsg}
        toastType={toastType}
        showToast={openToast}
        closeToast={setOpenToast}
      />
      <Modal isModalOpen={noteModal} closeModal={closeNoteModal} title="" modalType="loading">
              <CircularProgress/>
      </Modal>
    </>
  );
};

export default Card;
