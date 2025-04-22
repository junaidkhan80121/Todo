import { useEffect, useState } from "react";
import Card from "../components/NoteCard";
import "../../styles/home.css";
import Modal from "../components/Modal";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneIcon from "@mui/icons-material/Done";
import Toast from "../components/Toast";
import { useSelector } from "react-redux";
import useNotes from "../hooks/useNotes";
import useLogin from "../hooks/useLogin";

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("tab-1");
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<string>("success");
  const { addUserNote } = useNotes();
  const notes = useSelector((state: any) => state.noteSlice.notes);
  const pendingNotes = useSelector((state: any) => state.noteSlice.pendingNotes);
  const completedNotes = useSelector((state: any) => state.noteSlice.completedNotes);
  const { checkLogin } = useLogin();

  useEffect(() => {
    checkLogin();
  }, []);

  // useEffect(()=>{
    // console.log("re-rendered")
  // },[notes])

  const showToast = () => {
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 4000);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <div style={{ display: "flex" }}>
            Add Note&ensp;
            <AddIcon />
          </div>
        </button>
        <br />
        <br />
      </div>

      <div className="tabs-container">
        <button className="tabs-button-all" onClick={() => setTab("tab-1")}>
          All Notes&ensp;
          <ChecklistIcon className="btn-icon" />
        </button>
        <button
          className="tabs-button-completed"
          onClick={() => setTab("tab-2")}
        >
          Completed Notes&ensp;
          <DoneIcon sx={{ fontSize: "15px" }} className="btn-icon" />
        </button>
        <button className="tabs-button-pending" onClick={() => setTab("tab-3")}>
          Pending Notes&ensp;
          <PendingActionsIcon className="btn-icon" />
        </button>
      </div>

      {tab === "tab-1" && (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              textDecoration: "bold !important",
            }}
          >
            All Notes
          </div>
          <div className="main-block">
            {notes.length != 0 ? (
              notes.map((note: any) => (
                <Card
                  key={note._id}
                  // setIsModalOpen={setIsModalOpen}
                  // isModalOpen={isModalOpen}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                  checked={note.checked}
                />
              ))
            ) : (
              <div className="empty-notes">
                No Notes Added. Add Notes To Get Started...
              </div>
            )}

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
                <div className="add-btn-container">
                  <button
                    className="add-btn"
                    onClick={async () => {
                      await addUserNote(
                        title,
                        description,
                        checked,
                        setToastMsg,
                        setToastType,
                        showToast,
                        setIsModalOpen,
                        setTitle,
                        setDescription
                      );
                    }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}

      {tab === "tab-2" && (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              textDecoration: "bold !important",
            }}
          >
            Completed Notes
          </div>
          <div className="main-block">
            {completedNotes.length != 0 ? (
              completedNotes.map((note: any) => (
                <Card
                  key={note._id}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                  checked={note.checked}
                />
              ))
            ) : (
              <div className="empty-notes">No Completed Notes...</div>
            )}
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
                <button
                  className="add-btn"
                  onClick={async () =>
                    await addUserNote(
                      title,
                      description,
                      checked,
                      setToastMsg,
                      setToastType,
                      showToast,
                      setIsModalOpen,
                      setTitle,
                      setDescription
                    )
                  }
                >
                  Add Note
                </button>
              </div>
            </Modal>
          </div>
        </>
      )}

      {tab === "tab-3" && (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              textDecoration: "bold !important",
            }}
          >
            Pending Notes
          </div>
          <div className="main-block">
            {pendingNotes.length != 0 ? (
              pendingNotes.map((note: any) => (
                <Card
                  key={note._id}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                  checked={note.checked}
                />
              ))
            ) : (
              <div className="empty-notes">No Pending Notes...</div>
            )}
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
                <button
                  className="add-btn"
                  onClick={async () => {
                    await addUserNote(
                      title,
                      description,
                      checked,
                      setToastMsg,
                      setToastType,
                      showToast,
                      setIsModalOpen,
                      setTitle,
                      setDescription
                    );
                  }}
                >
                  Add Note
                </button>
              </div>
            </Modal>
          </div>
        </>
      )}
      <Toast
        message={toastMsg}
        showToast={openToast}
        closeToast={setOpenToast}
        toastType={toastType}
      />
    </>
  );
};

export default Home;
