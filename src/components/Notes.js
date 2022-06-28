import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Note from "./Note";
import PageSlider from "./PageSlider";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6);
  const notesRef = collection(db, "notes");
  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, []);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalNotes = notes.length;
  const count = Math.ceil(totalNotes / notesPerPage);
  return (
    <>
      <div className="flex flex-wrap justify-center w-[80%] m-auto gap-x-14 gap-y-7 -mt-2">
        {currentNotes.map((note, id) => {
          return <Note note={note} id={id} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-5 pb-2">
        <PageSlider
          count={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Notes;
