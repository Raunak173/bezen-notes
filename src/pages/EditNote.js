import React, { useState } from "react";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

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
    navigate("/");
  };
  return (
    <div className="h-[500px] w-[350px] m-auto mt-7 md:h-[500px] md:w-[1000px] md:mt-5 bg-[#822FAF]">
      <div className="w-auto bg-[#47126b] h-[80px] flex justify-center items-center">
        <p className="text-white text-3xl">Edit Note</p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-3 items-center mt-2"
        onSubmit={editNote}
      >
        <div className="w-[800px] flex flex-col items-center text-white text-md gap-y-1">
          <label htmlFor="title">Title</label>
          <input
            className="shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#571089]"
            type="text"
            value={n.title}
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
            value={n.tagline}
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
            value={n.content}
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
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditNote;
