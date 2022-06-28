import React, { useState } from "react";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const notesRef = collection(db, "notes");
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const createNote = async (e) => {
    e.preventDefault();
    const { title, tagline, content } = note;
    await addDoc(notesRef, { title, tagline, content });
    navigate("/");
  };
  return (
    <div className="h-[500px] w-[350px] m-auto mt-7 md:h-[500px] md:w-[1000px] md:mt-5 bg-[#822FAF]">
      <div className="w-auto bg-[#47126b] h-[80px] flex justify-center items-center">
        <p className="text-white text-3xl">Add Note</p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-3 items-center mt-2"
        onSubmit={createNote}
      >
        <div className="w-[800px] flex flex-col items-center text-white text-md gap-y-1">
          <label htmlFor="title">Title</label>
          <input
            className="shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#571089]"
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>
        <div className="w-[800px] flex flex-col items-center text-white text-md gap-y-1">
          <label htmlFor="tagline">Tagline</label>
          <input
            className="shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#571089]"
            type="text"
            value={note.tagline}
            id="tagline"
            name="tagline"
            required
            onChange={onChangeInput}
          />
        </div>
        <div className="w-[800px] flex flex-col items-center text-white text-md gap-y-1">
          <label htmlFor="content">Content</label>
          <textarea
            className="shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#571089]"
            type="text"
            value={note.content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>
        <button
          className="text-white w-[1000px] bg-[#47126b] h-[60px] mt-2 text-xl hover:bg-[#EA698B]"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddNote;