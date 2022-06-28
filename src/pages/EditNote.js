import React, { useState } from "react";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import SnackBar from "../components/SnackBar";

const EditNote = () => {
  const location = useLocation();
  const { note } = location.state;
  const navigate = useNavigate();
  const noteRef = doc(db, "notes", note.id);
  const [n, setN] = useState({
    title: note.title,
    tagline: note.tagline,
    content: note.content,
  });
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setN({ ...n, [name]: value });
  };
  const editNote = async (e) => {
    e.preventDefault();
    const { title, tagline, content } = n;
    const newN = {
      title,
      tagline,
      content,
    };
    await updateDoc(noteRef, newN);
    setOpen(true);
    setTimeout(() => navigate("/"), 2000);
  };
  return (
    <>
      <SnackBar
        open={open}
        handleClose={handleClose}
        message={"Note updated successfully!"}
      />

      <div className="h-[500px] w-[350px] m-auto mt-7 md:h-[500px] md:w-[1000px] md:mt-5 bg-[#3A5BA0] shadow-xl">
        <div className="w-auto bg-[#FFA500] h-[80px] flex justify-center items-center">
          <p className="text-white text-3xl">Edit Note</p>
        </div>
        <form
          autoComplete="off"
          className="flex flex-col gap-y-3 items-center mt-2"
          onSubmit={editNote}
        >
          <div className="w-[350px] md:w-[800px] flex flex-col items-center text-white text-md gap-y-1">
            <label htmlFor="title">Title</label>
            <input
              className="shadow appearance-none w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#FFE5B4]"
              type="text"
              value={n.title}
              id="title"
              name="title"
              required
              onChange={onChangeInput}
            />
          </div>
          <div className="w-[350px] md:w-[800px] flex flex-col items-center text-white text-md gap-y-1">
            <label htmlFor="tagline">Tagline</label>
            <input
              className="shadow appearance-none w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#FFE5B4]"
              type="text"
              value={n.tagline}
              id="tagline"
              name="tagline"
              required
              onChange={onChangeInput}
            />
          </div>
          <div className="w-[350px] md:w-[800px] flex flex-col items-center text-white text-md gap-y-1">
            <label htmlFor="content">Content</label>
            <textarea
              className="shadow appearance-none w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#FFE5B4]"
              type="text"
              value={n.content}
              id="content"
              name="content"
              required
              rows="10"
              onChange={onChangeInput}
            />
          </div>
          <button
            className="text-white w-[350px] md:w-[1000px] bg-[#FFA500] h-[60px] -mt-3 md:mt-2 text-xl"
            type="submit"
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditNote;
