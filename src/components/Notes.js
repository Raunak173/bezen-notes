import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const notesRef = collection(db, "notes");
  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, []);
  return (
    <div className="flex flex-wrap w-[80%] m-auto gap-x-14 gap-y-7 pb-10">
      {notes.map((note, id) => {
        return <Note note={note} id={id} />;
      })}
    </div>
  );
};

export default Notes;
