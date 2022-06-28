import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  chip: {
    color: "white",
    backgroundColor: "#ea698b",
    width: 150,
  },
}));

const NotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state;
  const classes = useStyles();
  const noteRef = doc(db, "notes", note.id);
  const deleteNote = async (id) => {
    await deleteDoc(noteRef);
    navigate("/");
  };

  return (
    <div className="w-[90%] m-auto flex flex-col gap-y-5">
      <p className="text-white text-4xl font-extrabold">{note.title}</p>
      <Chip
        label={`${note.tagline}`}
        variant="outlined"
        className={classes.chip}
      />
      <div className="text-white text-xl pb-7">{note.content}</div>
      <div className="flex justify-center items-center gap-x-5 pb-10">
        <Link to={"/edit"} state={{ note: note }}>
          <button className="text-white text-lg bg-[#47126B] px-5 py-2 shadow-xl hover:bg-[#EA698B]">
            Edit
          </button>
        </Link>
        <button
          className="text-white text-lg bg-[#47126B] px-5 py-2 shadow-xl hover:bg-[#EA698B]"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotePage;
