import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase-config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import SnackBar from "../components/SnackBar";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import pinD from "../images/pinD.png";
import pinL from "../images/pinL.png";

const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: "#ffd500",
    width: 150,
  },
}));

const NotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state;
  const classes = useStyles();
  const noteRef = doc(db, "notes", note.id);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const deleteNote = async (id) => {
    await deleteDoc(noteRef);
    setOpen(true);
    setTimeout(() => navigate("/"), 2000);
  };
  const pinNote = async (n) => {
    if (n.pin === true) {
      n.pin = false;
    } else {
      n.pin = true;
    }

    const newN = {
      title: n.title,
      tagline: n.tagline,
      content: n.content,
      pin: n.pin,
    };
    await updateDoc(noteRef, newN);
    navigate("/");
  };

  return (
    <>
      <SnackBar
        open={open}
        handleClose={handleClose}
        message={"Note deleted successfully!"}
      />
      <div className="w-[90%] m-auto flex flex-col gap-y-5">
        <p className=" text-4xl font-extrabold">{note.title}</p>
        <Chip
          label={`${note.tagline}`}
          variant="outlined"
          className={classes.chip}
        />
        <div className=" text-xl pb-7">{note.content}</div>
        <div className="flex justify-center items-center gap-x-5 pb-10">
          <Link to={"/edit"} state={{ note: note }}>
            <button className=" text-lg bg-[#FFD500] px-5 py-2 shadow-xl hover:bg-[#FFA500] flex items-center gap-x-2">
              Edit
              <CreateIcon />
            </button>
          </Link>
          <button
            className=" text-lg bg-[#FFD500] px-5 py-2 shadow-xl hover:bg-[#FFA500] flex items-center gap-x-2"
            onClick={() => deleteNote(note.id)}
          >
            Delete
            <DeleteIcon />
          </button>
          <button
            className=" text-lg bg-[#FFD500] px-5 py-2 shadow-xl hover:bg-[#FFA500] flex items-center gap-x-2"
            onClick={() => pinNote(note)}
          >
            Pin
            {note.pin === false ? (
              <img src={pinD} width={20} alt="pin" />
            ) : (
              <img src={pinL} width={20} alt="pin" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default NotePage;
